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

        if(query.includes("set slug:")){
            global.slug = query.split("set slug:")[1].replace(" ", "").toUpperCase();
        } else if(query.includes("set name:")){
            let listQuery = query.split("set name:");
            global.firstName = listQuery[1].split(",")[1];
            global.lastName = listQuery[1].split(",")[0];
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
                            "metadata.slug": global.slug
                        },
                        {
                            "metadata.firstName": global.firstName,
                            "metadata.lastName": global.lastName
                        },
                        {
                            "metadata.sa_campaign_slug": global.slug
                        }
                    ]
                }
            },
        });

        //const { preprocessedQuery } = await queryPreprocessor({ C });
        // TODO: support adding conversation context as an optional parameter to the findContentFunc
        const { queryEmbedding, content } = await findContent({ query: query });

        return { queryEmbedding, content };
    };
}
