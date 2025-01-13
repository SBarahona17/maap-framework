import { Conversation, FindContentFunc, makeDefaultFindContent } from 'mongodb-chatbot-server';

export interface PreProcessQueryParams {
    query: string;
    conversation?: Conversation;
}

export interface PreProcessQueryResults {
    preprocessedQuery: string;
}

/**
    Preprocess a query to mutate it before using it to search for content.
 */
export type PreProcessQuery = ({ query, conversation }: PreProcessQueryParams) => Promise<PreProcessQueryResults>;

interface WithQueryPreprocessorParams {
    queryPreprocessor: PreProcessQuery;
    findContentFunc: FindContentFunc;
}

/**
  Wrap a {@link FindContentFunc} with a query preprocessor
  to mutate the query before searching for content.
 */
export function withQueryPreprocessor(
    embedder,
    embeddedContentStore,
    vectorSearchIndexName,
    numCandidates,
    minScore
): FindContentFunc {
    return async ({ query }) => {

        let slug = 'SRR';
        if(query.includes("set campaign:")){
            slug = query.split("set campaign:")[1].replace(" ", "").toUpperCase();
        }

        const findContent = makeDefaultFindContent({
            embedder,
            store: embeddedContentStore,
            findNearestNeighborsOptions: {
                k: 100,
                path: 'embedding',
                indexName: vectorSearchIndexName,
                numCandidates: numCandidates,
                minScore: minScore,
                filter: {
                    "$or": [
                        {
                            "metadata.slug": slug
                        },
                        {
                            "metadata.firstName": "Xaviera",
                            "metadata.lastName": "McKenna"
                        },
                        {
                            "metadata.sa_campaign_slug": "BOM"
                        }
                    ]
                }
            },
        });

        //const { preprocessedQuery } = await queryPreprocessor({ C });
        // TODO: support adding conversation context as an optional parameter to the findContentFunc
        const { queryEmbedding, content } = await findContent({ query: query });

        console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n testing");

        return { queryEmbedding, content };
    };
}
