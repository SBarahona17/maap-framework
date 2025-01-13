import 'dotenv/config';
import {
    getModelClass,
    getEmbeddingModel,
    getVBDConfigInfo,
    getAggregateOperatorConfigs,
    getSystemPrompt,
} from '../../../src/yaml_parser/src/LoadYaml.js';
import {
    BaseModel,
    PreProcessQuery,
    RAGApplicationBuilder,
    Rerank,
    convertBaseEmbeddingsToEmbedder,
    convertBaseModelToChatLlm,
    withQueryPreprocessor,
    withReranker,
} from '../../../src/index.js';

import { MongoClient } from 'mongodb';
import {
    makeDefaultFindContent,
    MakeUserMessageFunc,
    OpenAiChatMessage,
    GenerateUserPromptFunc,
    makeRagGenerateUserPrompt,
    SystemPrompt,
    makeMongoDbConversationsService,
    AppConfig,
    makeApp,
    ObjectId,
    CreateConversationParams,
    ConversationsService,
} from 'mongodb-chatbot-server';
import { makeMongoDbEmbeddedContentStore, logger } from 'mongodb-rag-core';
import { MongoDBCrud } from '../../../src/db/mongodb-crud.js';
import { AggMqlOperator } from '../../../src/db/dynamic-agg-operator.js';
import { readFileSync } from 'fs';
import { defaultUserPrompt } from 'llamaindex';

// Load MAAP base classes
const model = getModelClass();
const embedding_model = getEmbeddingModel();
const { dbName, connectionString, vectorSearchIndexName, minScore, numCandidates } = getVBDConfigInfo();

// Load crud operator with query and name of the operator
const crudOperatorConfigs = getAggregateOperatorConfigs();
var aggregatorPipelines = [];
if (crudOperatorConfigs) {
    for (const crudConfig of crudOperatorConfigs) {
        const crud = new MongoDBCrud({
            connectionString: crudConfig.connectionString,
            dbName: crudConfig.dbName,
            collectionName: crudConfig.collectionName,
        });
        crud.init();
        const aggQueryTemplate = JSON.parse(crudConfig.query);
        aggregatorPipelines.push({
            crudOperator: crud,
            aggregator: new AggMqlOperator({
                model: model,
                queryTemplate: aggQueryTemplate,
                jsonSchema: crudConfig.jsonSchema,
            }),
        });
    }
}

// Asynchronously generates a structured query context based on the original user message.
async function getStructuredQueryContext(originalUserMessage: string, recall?: boolean, p0?: boolean) {
    var structuredQueryContext = '';
    for (const aggregatorPipeline of aggregatorPipelines) {
        recall = recall ?? false;
        const query = await aggregatorPipeline.aggregator.runQuery(originalUserMessage, recall);
        // if query is null do not append to structuredQueryContext
        if (query) {
            aggregatorPipeline.crudOperator.init();
            const result = await aggregatorPipeline.crudOperator.aggregate(query);
            structuredQueryContext = structuredQueryContext + '\n' + JSON.stringify(result);
        }
    }
    return structuredQueryContext;
}

// MongoDB data source for the content used in RAG.
// Generated with the Ingest CLI.
const embeddedContentStore = makeMongoDbEmbeddedContentStore({
    connectionUri: connectionString,
    databaseName: dbName,
});

// Convert MAAP base embeddings to framework's Embedder
// console.log(embedding_model)
const embedder = convertBaseEmbeddingsToEmbedder(embedding_model);

// Convert MAAP base LLM to framework's ChatLlm
const llm = await convertBaseModelToChatLlm(model);



// For MAAP team: this shows how to use the withReranker and withQueryPreprocessor
// functions to wrap the findContent function with reranking and preprocessing functionality.
const dummyRerank: Rerank = async ({ query, results }) => {
    return { results };
};
const dummyPreprocess: PreProcessQuery = async ({ query }) => {
    // Aggreation query result + User quer
    const preprocessedQuery = await getStructuredQueryContext(query, false);
    return { preprocessedQuery: preprocessedQuery };
};
//const findContentWithRerank = withReranker({ findContentFunc: findContent, reranker: dummyRerank });
var findContentWithPreprocess = withQueryPreprocessor(
    embedder,
    embeddedContentStore,
    vectorSearchIndexName,
    numCandidates,
    minScore
);

//if (aggregatorPipelines.length < 1) {
//    findContentWithPreprocess = findContent;
//}

// Constructs the user message sent to the LLM from the initial user message
// and the content found by the findContent function.
const makeUserMessage: MakeUserMessageFunc = async function ({
    content,
    originalUserMessage,
}): Promise<OpenAiChatMessage & { role: 'user' }> {
    const chunkSeparator = '~~~~~~';
    const context = content.map((c) => c.text).join(`\n${chunkSeparator}\n`);
    // Run the structured query to populate the alternate retrieval technique results as context
    var structuredQueryContext = '';
    if (aggregatorPipelines.length > 0) {
        var structuredQueryContext = await getStructuredQueryContext(originalUserMessage, true);
    }

    const contentForLlm = `Using the following Information and Conversation History, answer the user query.
    The context is seperated by Chunk Separator: ${chunkSeparator}

    Information:
    ${context}    
    ${chunkSeparator}
    Operational Information:
    ${structuredQueryContext}

    User query: ${originalUserMessage}`;

    return { role: 'user', content: contentForLlm };
};

// Generates the user prompt for the chatbot using RAG
const generateUserPrompt: GenerateUserPromptFunc = makeRagGenerateUserPrompt({
    // findContent: findContentWithRerankAndPreprocess,
    findContent: findContentWithPreprocess,
    makeUserMessage,
});

// System prompt for chatbot
const systemPrompt: SystemPrompt = {
    role: 'system',
    content: getSystemPrompt(),
};

// Create MongoDB collection and service for storing user conversations
// with the chatbot.

(global as any).currentConversationId = null;

function makeWrappedMongoDbConversationsService(dbName: string) {
    const baseService = makeMongoDbConversationsService(mongodb.db(dbName));
    // Wrap the base service methods with your own custom implementations
    return {
        ...baseService,
        create: async (params?: CreateConversationParams) => {
            const newConversation = await baseService.create(params);
            (global as any).currentConversationId = newConversation._id;
            return newConversation;
        },
    };
}

const mongodb = new MongoClient(connectionString);
const conversations = makeWrappedMongoDbConversationsService(dbName);
(global as any).conversations = conversations;

// Create the MongoDB Chatbot Server Express.js app configuration
const config: AppConfig = {
    conversationsRouterConfig: {
        llm,
        conversations,
        generateUserPrompt,
        systemPrompt,
    },
    maxRequestTimeoutMs: 30000,
    serveStaticSite: true,
};


// Start the server and clean up resources on SIGINT.
const PORT = process.env.PORT || 9000;
const startServer = async () => {
    logger.info('Starting server...');
    const app = await makeApp(config);
    const server = app.listen(PORT, () => {
        logger.info(`Server listening on port: ${PORT}`);
    });
    app.config

    process.on('SIGINT', async () => {
        logger.info('SIGINT signal received');
        await mongodb.close();
        await embeddedContentStore.close();
        await new Promise<void>((resolve, reject) => {
            server.close((error: any) => {
                error ? reject(error) : resolve();
            });
        });
        process.exit(1);
    });
};

try {
    startServer();
} catch (e) {
    logger.error(`Fatal error: ${e}`);
    process.exit(1);
}
