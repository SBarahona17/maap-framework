import { ChatMessage, Portkey, OpenAI } from 'llamaindex';
import createDebugMessages from 'debug';
import { BaseModel } from '../../interfaces/base-model.js';
import { Chunk, ConversationHistory } from '../../global/types.js';

export class LlamaAnyscale extends BaseModel {
    private readonly debug = createDebugMessages('maap:model:Anyscale');
    private readonly modelName: string;
    private readonly maxTokens: number;
    private model: Portkey;

    constructor(params?: { temperature?: number; modelName?: string; maxTokens?: number }) {
        super(params?.temperature ?? 0.1);
        this.modelName = params?.modelName; //meta-llama/Llama-2-70b-chat-hf
        this.maxTokens = params?.maxTokens ?? 2048;
    }

    override async init(): Promise<void> {
        this.model = new Portkey({
            apiKey: process.env.ANYSCALE_API_KEY,
            baseURL: process.env.ANYSCALE_BASE_URL,
            mode: "single",
            llms: [
                {
                    provider: "anyscale",
                    //virtual_key: "anyscale-3b3c04",
                    model: this.modelName,
                    max_tokens: this.maxTokens,
                }
            ]
        });
    }

    protected async runQuery(system: string, userQuery: string, supportingContext: Chunk[], pastConversations: ConversationHistory[]): Promise<string> {
        const pastMessages: ChatMessage[] = this.generatePastMessagesLlama(
            system,
            supportingContext,
            pastConversations,
            userQuery,
        );
        const result = await this.model.chat({ messages: pastMessages });
        this.debug('Anyscale response -', result);
        return result.message.content.toString();
    }

    protected async runStreamQuery(system: string, userQuery: string, supportingContext: Chunk[], pastConversations: ConversationHistory[]): Promise<any> {
        const pastMessages: ChatMessage[] = this.generatePastMessagesLlama(
            system,
            supportingContext,
            pastConversations,
            userQuery,
        );
        return await this.model.chat({ messages: pastMessages, stream: true });
    }

}