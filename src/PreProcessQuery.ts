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
            global.slug = query.split("set slug:")[1].trim().toUpperCase();
        } else if(query.includes("set name:")){
            let listQuery = query.split("set name:")[1].trim();
            global.firstName = listQuery.split(",")[1];
            global.lastName = listQuery.split(",")[0];    
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
                        },
                        {
                            "metadata.faq_slug": global.slug
                        }                        
                    ]
                }
            },
        });
        const { queryEmbedding, content } = await findContent({ query: query });

        if (global.slug == null || global.slug == ""){
            if (content != null){
                content.forEach(document => {
                    if('o_campaign_slug' in document['metadata']){
                        global.slug = document.metadata.o_campaign_slug;
                    }
                })
            }
        }

        return { queryEmbedding, content };
    };
}
