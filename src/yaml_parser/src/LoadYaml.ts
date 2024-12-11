// Import required modules
import * as yaml from 'js-yaml';
import * as process from 'process';
// import { z } from "zod";
// import { jsonSchemaToZod } from "json-schema-to-zod";
import {
    Anthropic,
    BaseLoader,
    CohereEmbeddings,
    ConfluenceLoader,
    DocxLoader,
    GeckoEmbedding,
    OpenAi,
    PdfLoader,
    SitemapLoader,
    VertexAI,
    WebLoader,
    YoutubeSearchLoader,
    YoutubeLoader,
    YoutubeChannelLoader,
    PptLoader,
    TextLoader,
    LlamaIndexLoader,
    BaseModel,
    LlamaNomicEmbeddingsv1,
    LlamaNomicEmbeddingsv1_5,
    LlamaTitanEmbeddings,
    LlamaTogetherAIEmbeddings,
    LlamaAzureEmbeddings,
    LlamaGeckoEmbeddings,
} from '../../index.js';
import { MongoDBAtlas } from '../../vectorDb/mongo-db-atlas.js';
import { strict as assert } from 'assert';
import { AnyscaleModel } from '../../models/langChain/anyscale-model.js';
import { Fireworks } from '../../models/langChain/fireworks-model.js';
import { Bedrock } from '../../models/langChain/bedrock-model.js';
import { TitanEmbeddings } from '../../embeddings/langChain/titan-embeddings.js';
import { NomicEmbeddingsv1 } from '../../embeddings/langChain/nomic-v1-embeddings.js';
import { NomicEmbeddingsv1_5 } from '../../embeddings/langChain/nomic-v1-5-embeddings.js';
import { AzureOpenAiEmbeddings } from '../../embeddings/langChain/azure-embeddings.js';
import { BedrockEmbedding } from '../../embeddings/langChain/bedrock-embeddings.js';
import { FireworksEmbedding } from '../../embeddings/langChain/fireworks-embeddings.js';
import { AzureChatAI } from '../../models/langChain/azureopenai-model.js';
import { readFileSync, readdirSync } from 'fs';
import { RealTimeDataLoader } from '../../loaders/real-time-data-loader.js';
import { TogetherAIEmbeddings } from '../../embeddings/langChain/togetherai-embeddings.js';
import { Cohere } from '../../models/langChain/cohere-model.js';
import { TogetherAI } from '../../models/langChain/togetherai-model.js';
import { LlamaFireworksModel } from '../../models/llamaIndex/llama-fireworks-model.js';
import { LlamaFireworksEmbeddings } from '../../embeddings/llamaIndex/llama-fireworks-embeddings.js';
import { LlamaCohereEmbeddings } from '../../embeddings/llamaIndex/llama-cohere-embeddings.js';
import { LlamaBedrockEmbeddings } from '../../index.js';

// src/loaders/confluence-loader.ts src/loaders/docx-loader.ts src/loaders/excel-loader.ts src/loaders/json-loader.ts src/loaders/pdf-loader.ts src/loaders/ppt-loader.ts src/loaders/sitemap-loader.ts src/loaders/text-loader.ts src/loaders/web-loader.ts src/loaders/youtube-channel-loader.ts src/loaders/youtube-loader.ts src/loaders/youtube-search-loader.ts
function getDataFromYamlFile() {
    const args = process.argv.slice(2);

    // Check if a file path is provided
    if (!args[0]) {
        throw new Error('Please provide the YAML file path as an argument.');
    }
    const data = readFileSync(args[0], 'utf8');
    const parsedData = yaml.load(data);
    return parsedData;
}

export function getSystemPrompt() {
    const parsedData = getDataFromYamlFile();
    const systemPrompt = readFileSync(parsedData.systemPromptPath, 'utf8');
    return systemPrompt;
}

export function getDatabaseConfig() {
    const parsedData = getDataFromYamlFile();
    return new MongoDBAtlas({
        connectionString: parsedData.vector_store.connectionString,
        dbName: parsedData.vector_store.dbName,
        collectionName: parsedData.vector_store.collectionName,
        embeddingKey: parsedData.vector_store.embeddingKey,
        textKey: parsedData.vector_store.textKey,
        indexName: parsedData.vector_store.vectorSearchIndexName,
        numCandidates: parsedData.vector_store.numDimensions,
        similarityFunction: parsedData.vector_store.similarityFunction,
        minScore: parsedData.vector_store.minScore,
    });
}

export function getAggregateOperatorConfigs() {
    try {
        const parsedData = getDataFromYamlFile();
        const aggregateOperatorConfigs = [];
        if (!parsedData.aggregate_operators) {
            return aggregateOperatorConfigs;
        }
        // console.log("aggregate_operators", parsedData.aggregate_operators)
        for (const aggregateConfig of parsedData.aggregate_operators) {
            try {
                const query = readFileSync(aggregateConfig.queryFilePath, 'utf8');
                var jsonSchema = null;
                if (aggregateConfig.variables) jsonSchema = aggregateConfig.variables;
                aggregateOperatorConfigs.push({
                    connectionString: aggregateConfig.connectionString,
                    dbName: aggregateConfig.dbName,
                    collectionName: aggregateConfig.collectionName,
                    aggregatePipelineName: aggregateConfig.aggregatePipelineName,
                    query: query,
                    jsonSchema: jsonSchema,
                });
            } catch (error) {
                console.log('Error reading aggregate operator query file:', error);
            }
        }
        return aggregateOperatorConfigs;
    } catch (error) {
        console.log('INFO reading aggregate operator query file or aggregate operator not configured:', error);
        return null;
    }
}

export function getConditionOpConfigs() {
    const parsedData = getDataFromYamlFile();
    const conditionOpConfigs = [];
    for (const conditionConfig of parsedData.conditional_operators) {
        let prompt = '[]';
        if (conditionConfig.promptFilePath) {
            prompt = readFileSync(conditionConfig.promptFilePath, 'utf8');
        }
        conditionOpConfigs.push({
            name: conditionConfig.name,
            description: conditionConfig.description,
            prompt: prompt,
            aggregatePipelineName: conditionConfig.aggregatePipelineName,
        });
    }
    return conditionOpConfigs;
}

/**
 Gets the DB info to use in the chatbot application
 */
export function getVBDConfigInfo() {
    const parsedData = getDataFromYamlFile();
    const {
        vector_store: { connectionString, dbName, collectionName, vectorSearchIndexName, minScore, numCandidates },
    } = parsedData;

    assert(typeof connectionString === 'string', 'connectionString is required');
    assert(typeof dbName === 'string', 'dbName is required');
    assert(typeof collectionName === 'string', 'collectionName is required');
    assert(typeof vectorSearchIndexName === 'string', 'vectorSearchIndexName is required');

    return {
        connectionString,
        dbName,
        collectionName,
        vectorSearchIndexName,
        minScore,
        numCandidates,
    };
}

/**
 * Returns an instance of the model class based on the parsed data from a YAML file.
 * @returns An instance of the model class.
 */
export function getModelClass() {
    const parsedData = getDataFromYamlFile();
    const framework = parsedData.llms.framework ? parsedData.llms.framework.toLowerCase() : '';
    const params = {};
    if (parsedData.llms.temperature) params['temperature'] = parsedData.llms.temperature;
    if (parsedData.llms.maxTokens) params['maxTokens'] = parsedData.llms.max_tokens;
    switch (parsedData.llms.class_name) {
        case 'VertexAI':
            assert(typeof parsedData.llms.model_name === 'string', 'model_name of VertexAI is required');
            params['modelName'] = parsedData.llms.model_name;
            return new VertexAI(params);
        case 'OpenAI':
            assert(typeof parsedData.llms.model_name === 'string', 'model_name of OpenAI is required');
            params['modelName'] = parsedData.llms.model_name;
            return new OpenAi(params);
        case 'Anyscale':
            assert(typeof parsedData.llms.model_name === 'string', 'model_name of Anyscale is required');
            params['modelName'] = parsedData.llms.model_name;
            return new AnyscaleModel(params);
        case 'Fireworks':
            switch (framework) {
                case 'llamaindex':
                    assert(typeof parsedData.llms.model_name === 'string', 'model_name of Fireworks is required');
                    params['modelName'] = parsedData.llms.model_name;
                    return new LlamaFireworksModel(params);
                default:
                    assert(typeof parsedData.llms.model_name === 'string', 'model_name of Fireworks is required');
                    params['modelName'] = parsedData.llms.model_name;
                    return new Fireworks(params);
            }
        case 'Anthropic':
            assert(typeof parsedData.llms.model_name === 'string', 'model_name of Anthropic is required');
            params['modelName'] = parsedData.llms.model_name;
            return new Anthropic(params);
        case 'Bedrock':
            assert(typeof parsedData.llms.model_name === 'string', 'model_name of Bedrock is required');
            params['modelName'] = parsedData.llms.model_name;
            return new Bedrock(params);
        case 'AzureOpenAI':
            return new AzureChatAI(params);
        case 'Cohere':
            assert(typeof parsedData.llms.model_name === 'string', 'model_name of Cohere is required');
            params['modelName'] = parsedData.llms.model_name;
            return new Cohere(params);
        case 'TogetherAI':
            assert(typeof parsedData.llms.model_name === 'string', 'model_name of TogetherAI is required');
            params['modelName'] = parsedData.llms.model_name;
            return new TogetherAI(params);
        default:
            throw new Error('Unsupported model class name');
        // // Handle unsupported class name (optional)
        // return new Anthropic({ modelName: parsedData.llms.model_name }); // Or throw an error
    }
}

/**
 * Retrieves the embedding model based on the parsed data from a YAML file.
 * @returns The embedding model based on the parsed data.
 */
export function getEmbeddingModel() {
    const parsedData = getDataFromYamlFile();
    const framework = parsedData.embedding.framework ? parsedData.embedding.framework.toLowerCase() : '';
    switch (parsedData.embedding.class_name) {
        case 'VertexAI':
            switch (framework) {
                case 'llamaindex':
                    return new LlamaGeckoEmbeddings({ modelName: parsedData.embedding.model_name });
                default:
                    return new GeckoEmbedding({ modelName: parsedData.embedding.model_name });
            }
        case 'Azure-OpenAI-Embeddings':
            switch (framework) {
                case 'llamaindex':
                    return new LlamaAzureEmbeddings({
                        modelName: parsedData.embedding.model_name,
                        deploymentName: parsedData.embedding.deployment_name,
                        apiVersion: parsedData.embedding.api_version,
                        azureOpenAIApiInstanceName: parsedData.embedding.azure_openai_api_instance_name,
                    });
                default:
                    return new AzureOpenAiEmbeddings({
                        modelName: parsedData.embedding.model_name,
                        deploymentName: parsedData.embedding.deployment_name,
                        apiVersion: parsedData.embedding.api_version,
                        azureOpenAIApiInstanceName: parsedData.embedding.azure_openai_api_instance_name,
                    });
            }
        case 'Cohere':
            switch (framework) {
                case 'llamaindex':
                    return new LlamaCohereEmbeddings({ modelName: parsedData.embedding.model_name });
                default:
                    return new CohereEmbeddings({ modelName: parsedData.embedding.model_name });
            }
        case 'Titan':
            switch (framework) {
                case 'llamaindex':
                    return new LlamaTitanEmbeddings();
                default:
                    return new TitanEmbeddings();
            }

        case 'Bedrock':
            switch (framework) {
                case 'llamaindex':
                    return new LlamaBedrockEmbeddings({
                        modelName: parsedData.embedding.model_name,
                        dimension: parsedData.embedding.dimension,
                    });
                default:
                    return new BedrockEmbedding({
                        modelName: parsedData.embedding.model_name,
                        dimension: parsedData.embedding.dimension,
                    });
            }
        case 'Fireworks':
            switch (framework) {
                case 'llamaindex':
                    return new LlamaFireworksEmbeddings({
                        modelName: parsedData.embedding.model_name,
                        dimension: parsedData.embedding.dimension,
                    });
                default:
                    return new FireworksEmbedding({
                        modelName: parsedData.embedding.model_name,
                        dimension: parsedData.embedding.dimension,
                    });
            }
        case 'Nomic-v1':
            switch (framework) {
                case 'llamaindex':
                    return new LlamaNomicEmbeddingsv1();
                default:
                    return new NomicEmbeddingsv1();
            }
        case 'Nomic-v1.5':
            switch (framework) {
                case 'llamaindex':
                    return new LlamaNomicEmbeddingsv1_5();
                default:
                    return new NomicEmbeddingsv1_5();
            }
        case 'TogetherAI':
            switch (framework) {
                case 'llamaindex':
                    return new LlamaTogetherAIEmbeddings({ modelName: parsedData.embedding.model_name });
                default:
                    return new TogetherAIEmbeddings({ modelName: parsedData.embedding.model_name });
            }
        default:
            // Handle unsupported class name (optional)
            return new NomicEmbeddingsv1_5(); // Or throw an error
    }
}

/**
 * Returns the appropriate loader based on the parsed data from a YAML file.
 * @returns The loader object or null if no matching loader is found.
 */
export function getIngestLoader() {
    const parsedData = getDataFromYamlFile();
    const dataloaders: BaseLoader[] = [];
    for (const data of parsedData.ingest) {
        switch (data.source) {
            case 'web':
                dataloaders.push(
                    new WebLoader({
                        url: data.source_path,
                        chunkSize: data.chunk_size,
                        chunkOverlap: data.chunk_overlap,
                    }),
                );
                break;
            case 'pdf':
                dataloaders.push(
                    new PdfLoader({
                        filePath: data.source_path,
                        chunkSize: data.chunk_size,
                        chunkOverlap: data.chunk_overlap,
                    }),
                );
                break;
            case 'realtime':
                dataloaders.push(new RealTimeDataLoader({
                  topic: data.topic,
                  brokers: data.brokers,
                  tumblingWindow: data.tumblingWIndow,
                  fields: data.fields,
                  chunkSize: data.chunk_size,
                  chunkOverlap: data.chunk_overlap,
                  isRealTime: true,
                  canIncrementallyLoad: true
                }));
                break;
            case 'sitemap':
                dataloaders.push(
                    new SitemapLoader({
                        url: data.source_path,
                        chunkSize: data.chunk_size,
                        chunkOverlap: data.chunk_overlap,
                    }),
                );
                break;
            case 'docx':
                dataloaders.push(
                    new DocxLoader({
                        filePath: data.source_path,
                        chunkSize: data.chunk_size,
                        chunkOverlap: data.chunk_overlap,
                    }),
                );
                break;
            case 'confluence':
                dataloaders.push(
                    new ConfluenceLoader({
                        spaceNames: data.space_names,
                        confluenceBaseUrl: data.confluence_base_url,
                        confluenceUsername: data.confluence_username,
                        confluenceToken: data.confluence_token,
                        chunkSize: data.chunk_size,
                        chunkOverlap: data.chunk_overlap,
                    }),
                );
                break;
            case 'youtube-search':
                dataloaders.push(
                    new YoutubeSearchLoader({
                        searchString: data.query,
                        chunkSize: data.chunk_size,
                        chunkOverlap: data.chunk_overlap,
                    }),
                );
                break;
            case 'youtube':
                dataloaders.push(
                    new YoutubeLoader({
                        videoIdOrUrl: data.video_id_or_url,
                        chunkSize: data.chunk_size,
                        chunkOverlap: data.chunk_overlap,
                    }),
                );
                break;
            case 'youtube-channel':
                dataloaders.push(
                    new YoutubeChannelLoader({
                        channelId: data.channel_id,
                        chunkSize: data.chunk_size,
                        chunkOverlap: data.chunk_overlap,
                    }),
                );
                break;
            case 'pptx':
                dataloaders.push(
                    new PptLoader({
                        filePath: data.source_path,
                        chunkSize: data.chunk_size,
                        chunkOverlap: data.chunk_overlap,
                    }),
                );
                break;
            case 'ppt':
                dataloaders.push(
                    new PptLoader({
                        filePath: data.source_path,
                        chunkSize: data.chunk_size,
                        chunkOverlap: data.chunk_overlap,
                    }),
                );
                break;
            case 'text':
                console.log('Text case');
                const file = readFileSync(data.source_path, 'utf-8');
                dataloaders.push(
                    new TextLoader({
                        text: file,
                        chunkSize: data.chunk_size,
                        chunkOverlap: data.chunk_overlap,
                    }),
                );
                break;
            case 'llama-index-loader':
                dataloaders.push(
                    new LlamaIndexLoader({
                        filePath: data.source_path,
                        chunkSize: data.chunk_size,
                        chunkOverlap: data.chunk_overlap,
                        parsingInstructions: data.parsingInstructions ?? undefined,
                        folderProcessing: data.folderProcessing,
                    }),
                );
                break;
            case 'folder':
                let files = [];
                if (data.file_type) {
                    console.log(`File type filter: ${data.file_type}`);
                    files = readdirSync(data.source_path).filter((file) => file.endsWith(data.file_type));
                } else {
                    files = readdirSync(data.source_path);
                }
                console.log(`Files found in the folder: ${files}`);
                if (files.length > 0) {
                    getNAddFileLoader(files, data, dataloaders);
                } else {
                    console.log(`No files found in the folder: ${data.source_path}`);
                }
                break;
            default:
                // Handle unsupported source type (optional)
                console.log(`Unsupported source type: ${data.source}`);
        }
    }
    return dataloaders;
}

function getNAddFileLoader(
    files: string[],
    data: any,
    dataloaders: BaseLoader<Record<string, string | number | boolean>, Record<string, null>>[],
) {
    for (const file of files) {
        const filePath = `${data.source_path}/${file}`;
        const fileType = file.split('.').pop();
        switch (fileType) {
            case 'txt':
                dataloaders.push(
                    new TextLoader({
                        text: readFileSync(filePath, 'utf-8'),
                        chunkSize: data.chunk_size,
                        chunkOverlap: data.chunk_overlap,
                    }),
                );
                break;
            case 'pdf':
                dataloaders.push(
                    new PdfLoader({
                        filePath: filePath,
                        chunkSize: data.chunk_size,
                        chunkOverlap: data.chunk_overlap,
                    }),
                );
                break;
            case 'docx':
                dataloaders.push(
                    new DocxLoader({
                        filePath: filePath,
                        chunkSize: data.chunk_size,
                        chunkOverlap: data.chunk_overlap,
                    }),
                );
                break;
            case 'pptx':
                dataloaders.push(
                    new PptLoader({
                        filePath: filePath,
                        chunkSize: data.chunk_size,
                        chunkOverlap: data.chunk_overlap,
                    }),
                );
                break;
            default:
                // Handle unsupported file type (optional)
                console.log(`Failed to load file: ${file}`);
                console.log(`Unsupported file type: ${fileType}`);
        }
    }
}

export function getStreamOptions() {
    const parsedData = getDataFromYamlFile();
    return {
        stream: parsedData.stream_options.stream ?? false,
    };
}
