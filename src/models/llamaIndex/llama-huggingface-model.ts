import { HuggingFaceLLM, ChatMessage } from 'llamaindex'
import createDebugMessages from 'debug';
import { BaseModel } from '../../interfaces/base-model.js';
import { Chunk, ConversationHistory } from '../../global/types.js';

export class LlamaHuggingFace extends BaseModel {
    protected runStreamQuery(system: string, userQuery: string, supportingContext: Chunk[], pastConversations: ConversationHistory[]): Promise<any> {
        throw new Error('Method not implemented.');
    }
    private readonly debug = createDebugMessages('maap:model:OpenAi');
    private readonly modelName: string;
    private readonly maxNewTokens: number;
    private readonly endpointUrl?: string;
    private model: HuggingFaceLLM;

    constructor(params?: { modelName?: string; temperature?: number; maxNewTokens?: number; endpointUrl?: string }) {
        super(params?.temperature ?? 0.1);

        this.endpointUrl = params?.endpointUrl;
        this.maxNewTokens = params?.maxNewTokens ?? 300;
        this.modelName = params?.modelName ?? 'mistralai/Mixtral-8x7B-Instruct-v0.1';        
    }

    override async init(): Promise<void> {
        this.model = new HuggingFaceLLM({ 
            modelName: this.modelName,
            maxTokens: this.maxNewTokens,
            temperature: this.temperature,
            tokenizerName: this.endpointUrl // This is not implemented
            // verbose: false,
            //maxRetries: 1,
        });
    }

    protected async runQuery(
        system: string,
        userQuery: string,
        supportingContext: Chunk[],
        pastConversations: ConversationHistory[]
    ): Promise<string> {
        const pastMessages: ChatMessage[] = this.generatePastMessagesLlama(
            system,
            supportingContext,
            pastConversations,
            userQuery,
        );
        const response = await this.model.chat({ messages: pastMessages });
        this.debug('Model response:', response);

        if (response.message && typeof response.message.content === 'string') {
            return response.message.content;
        } else {
            throw new Error('Invalid response format from model');
        }
    }
}