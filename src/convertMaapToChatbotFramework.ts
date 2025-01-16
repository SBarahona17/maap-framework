/**
  @fileoverview Convert various constructs created by the MAAP dev team
  to work with the MongoDB Chatbot Framework.
 */
import { ExtractChunkData } from './global/types.js';
import { BaseEmbeddings } from './interfaces/base-embeddings.js';
import { BaseLoader } from './interfaces/base-loader.js';
import { BaseModel } from './interfaces/base-model.js';
import { ChatLlm, EmbeddedContent, Page, UserMessage, WithScore } from 'mongodb-chatbot-server';
import { Embedder } from 'mongodb-chatbot-server';
import { DataSource } from 'mongodb-rag-ingest/sources';
import { BaseReranker } from './interfaces/base-reranker.js';
import { Rerank } from './Rerank.js';


// Hardwired values
var questions_instructions = [
    "This response type is 'Select One'",
    "This response type is 'Text Field'",
    "This response type is 'Number'",
]

var questions = [
    "Have you been diagnosed with Non-Hodgkin's Lymphoma AFTER being exposed to Roundup?",
    "Do you know the name of the facility where you were diagnosed with NHL? Please list name, address and phone of diagnosing facility",
    "What would be your best estimate of total amount of years you used Round Up?"
]

async function formCompletion (userMessage: string, baseModel: BaseModel): Promise<string> {
    if(global.firstQuestion){
        global.firstQuestion = false;
        return "Great! Let's start with the first question.\nQuestion: " + questions[0];
    }

    var instructions = questions_instructions[global.answeredQuestions];
    var question = questions[global.answeredQuestions];

    const modelResponse = await baseModel.query(
        `
You are a chatbot that takes the response from a question and extracts the important data.
The user will answer with natural language such as 'I have' instead of 'yes', your job is to extract the specific information needed.
The output should follow the next example:
'''
Extracted Data:
{
    "is_diagnosed": "yes",
    "phone_number": "+43 345 345"
}

Source of Extracted Data:
The user answered the question of "Is diagnosed?" with a yes and offer the phone number afterwards.
'''

The data extracted from the user response must follow the instructions:
"${instructions}"
And here is the question that the user is answering:
"${question}"
        `,
        userMessage
        ,[]
    );

    global.answeredQuestions = global.answeredQuestions + 1;
    if(global.answeredQuestions >= questions.length){
        global.inFormChat = false;
        return modelResponse + "\n\nThere are no more questions, switching to normal chat.";
    } else {
        return modelResponse + "\n\nNext question: " + questions[global.answeredQuestions];
    }
}


function chatSelection(userMessage: string): string {
    if(global.firstMessage){
        global.firstMessage = false
        return 'There seems to be some missing information about your campaign form. Would you like to complete it?';
    }

    if(userMessage == 'yes'){
        global.inFormChat = true;
    }

    global.inChatSelection = false;
    return null;
}


export async function convertBaseModelToChatLlm(baseModel: BaseModel): Promise<ChatLlm> {
    await baseModel.init();
    return {
        async answerQuestionAwaited({ messages }) {
            const userMessage = messages[messages.length - 1] as UserMessage;

            // Logic for controlled chat
            var exactUserMessage = userMessage.content.split('User query: ')[1];

            var assistantResponse = null;
            if(global.inChatSelection == true){
                assistantResponse = chatSelection(exactUserMessage);
            }
            
            if(global.inFormChat) {
                assistantResponse = await formCompletion(exactUserMessage, baseModel);                
            }

            if(assistantResponse != null){
                return {
                    role: 'assistant',
                    content: assistantResponse
                }
            }

            if(exactUserMessage.includes("set name:")){
                return {
                    role: 'assistant',
                    content: 'The name has been set.'
                } 
            } else if(exactUserMessage.includes("set slug:")){
                return {
                    role: 'assistant',
                    content: 'The slug has been set.'
                } 
            }
            
            const systemMessage = messages.find((m) => m.role === 'system');
            // this only takes into account the latest user message,
            // which should have previous messages and retrieved context information
            // all in the `userMessage.contentForLlm` field.
            const modelResponse = await baseModel.query(
                systemMessage.content,
                // User content for LLM if it exists (which it should in the implementation),
                // otherwise use the original content
                userMessage.contentForLlm ?? userMessage.content,
                // we shouldn't need to add context b/c this comes from the UserMessage.contentForLlm
                // Putting empty array b/c need placeholder
                [],
            );
            return {
                role: 'assistant',
                content: modelResponse,
            };
        },
        // async answerQuestionStream({ messages }) {
        //     const systemMessage = messages.find((m) => m.role === 'system');
        //     const userMessage = messages[messages.length - 1] as UserMessage;
        //     const modelStream = await baseModel.queryStream( 
        //         systemMessage.content,
        //         userMessage.contentForLlm ?? userMessage.content,
        //         [],
        //     );
        //     let index = 0;
        //     for await (const chunk of modelStream) {
        //         index++;
        //         yield {
        //             id: index.toString(),
        //             created: new Date(),
        //             choices: [
        //                 {
        //                     finalReason: null,
        //                     index: index,
        //                     delta: {
        //                         role: "assistant",
        //                         content:
        //                           typeof chunk.content === "string" ? chunk.content : "",
        //                         toolCalls: [],
        //                     },
        //                 }
        //             ],
        //             promptFilterResults: [],
        //             // role: 'assistant',
        //             // content: chunk,
        //         };
        //     }
        // },
        answerQuestionStream: async ({ messages }) =>
            (async function* () {
                const systemMessage = messages.find((m) => m.role === 'system');
                const userMessage = messages[messages.length - 1] as UserMessage;
                const modelStream = await baseModel.queryStream(
                    systemMessage.content,
                    userMessage.contentForLlm ?? userMessage.content,
                    [],
                );
                let index = 0;
                for await (const chunk of modelStream) {
                    index++;
                    yield {
                        id: index.toString(),
                        created: new Date(),
                        choices: [
                            {
                                finishReason: null,
                                index: index,
                                delta: {
                                    role: "assistant",
                                    content:
                                        typeof chunk === "string" ? chunk : (chunk.delta?.toString() || ""),
                                    toolCalls: [],
                                },
                            },
                        ],
                        promptFilterResults: [],
                    };
                }
            })(),
    } satisfies ChatLlm;
}

export function convertBaseEmbeddingsToEmbedder(baseEmbeddings: BaseEmbeddings): Embedder {
    return {
        async embed({ text }) {
            const embedding = await baseEmbeddings.embedQuery(text);
            return {
                embedding,
            };
        },
    } satisfies Embedder;
}

export function convertBaseLoaderToDataSource(baseLoader: BaseLoader): DataSource {
    // Random name for data source. The BaseLoader should be refactored
    // to include a name.
    const name = `DATA_SOURCE_${Date.now()}`;
    return {
        async fetchPages() {
            await baseLoader.init();
            const pages: Page[] = [];
            for await (const chunk of baseLoader.getChunks()) {
                pages.push({
                    body: chunk.pageContent,
                    url: chunk.metadata.source,
                    // TODO: you should add format to the BaseLoader interface
                    // to support chunking based on format
                    format: 'txt',
                    sourceName: name,
                    metadata: chunk.metadata,
                } satisfies Page);
            }
            return pages;
        },
        name,
    } satisfies DataSource;
}

export function convertBaseRerankerToReranker(baseReranker: BaseReranker): Rerank {
    return async ({ query, results }) => {
        const chunks = results.map((result) => {
            return {
                pageContent: result.text,
                score: result.score,
                metadata: {
                    id: result.chunkAlgoHash ?? '',
                    source: result.url ?? '',
                    uniqueLoaderId: result.sourceName ?? '',
                },
            } satisfies ExtractChunkData;
        }) satisfies ExtractChunkData[];
        const rerankedResults = await baseReranker.reRankDocuments(query, chunks);
        const embeddedContentOut: WithScore<EmbeddedContent>[] = [];
        for (const result of rerankedResults) {
            const foundRes = results.findIndex((r) => {
                r.text === result.pageContent;
            });
            if (foundRes === -1) {
                throw new Error('Could not find the original result in the reranked results');
            }
            embeddedContentOut.push({
                ...results[foundRes],
                score: result.score,
            });
        }
        return {
            results: embeddedContentOut,
        };
    };
}
