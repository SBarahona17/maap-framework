import { ChatMessage, Portkey } from 'llamaindex';
import createDebugMessages from 'debug';
import { BaseModel } from '../../interfaces/base-model.js';
import { Chunk, ConversationHistory } from '../../global/types.js';

export class LlamaCohere extends BaseModel {
    private readonly debug = createDebugMessages('maap:model:Cohere');
    private readonly modelName: string;
    private model: Portkey;

    constructor(params?: { temperature?: number; modelName?: string; maxTokens?: number }) {
        super(params?.temperature ?? 0.1);
        this.modelName = params?.modelName ?? 'command-r-plus';
    }

    override async init(): Promise<void> {
        this.model = new Portkey({
            //mode: 'single',
            llms: [
                {
                    provider: "cohere",
                    virtual_key: process.env.PORTKEY_VIRTUAL_KEY,
                    //api_key: process.env.COHERE_API_KEY,
                    model: this.modelName,
                },
            ],
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
        this.debug('Cohere response -', result);
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