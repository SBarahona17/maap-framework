"use strict";(self.webpackChunkmaap_docs=self.webpackChunkmaap_docs||[]).push([[976],{619:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>d,contentTitle:()=>o,default:()=>h,frontMatter:()=>s,metadata:()=>a,toc:()=>c});var i=r(4848),t=r(8453);const s={sidebar_position:1},o="MAAP Framework",a={id:"intro",title:"MAAP Framework",description:"Introduction",source:"@site/docs/intro.md",sourceDirName:".",slug:"/intro",permalink:"/maap-framework/docs/intro",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",next:{title:"Partners",permalink:"/maap-framework/docs/category/partners"}},d={},c=[{value:"Introduction",id:"introduction",level:3},{value:"Reference Architecture Diagram",id:"reference-architecture-diagram",level:3},{value:"Overview of Advanced RAG Approaches",id:"overview-of-advanced-rag-approaches",level:4},{value:"Environment",id:"environment",level:2},{value:"Document Preface",id:"document-preface",level:2},{value:"Steps to run the application",id:"steps-to-run-the-application",level:2},{value:"Installation",id:"installation",level:3},{value:"Configuration",id:"configuration",level:3},{value:"MAAP Partner Integrations",id:"maap-partner-integrations",level:3},{value:"Ingest Data",id:"ingest-data",level:3},{value:"Run the server",id:"run-the-server",level:3},{value:"Start your application UI",id:"start-your-application-ui",level:3},{value:"Identified Limitations",id:"identified-limitations",level:2}];function l(e){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,t.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"maap-framework",children:"MAAP Framework"}),"\n",(0,i.jsx)(n.h3,{id:"introduction",children:"Introduction"}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.a,{href:"https://www.mongodb.com/services/consulting/ai-applications-program",children:"MongoDB AI Applications Program (MAAP)"})," framework is a set of libraries that you can use to build your RAG Application\nusing MongoDB and ",(0,i.jsx)(n.a,{href:"https://www.mongodb.com/docs/atlas/atlas-vector-search/vector-search-overview/",children:"Atlas Vector Search"})," and associated MAAP partners"]}),"\n",(0,i.jsx)(n.p,{children:"The repo offers flexibility to its users to set up the RAG application by simply configuring a YAML file(details see below). The repo allows users to choose from various options through the partners' program. The following modules of RAG are made configurable"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"Data loaders"}),"\n",(0,i.jsx)(n.li,{children:"Embedding Models"}),"\n",(0,i.jsx)(n.li,{children:"Chat LLM Models"}),"\n",(0,i.jsx)(n.li,{children:"Post query Re-ranker"}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"reference-architecture-diagram",children:"Reference Architecture Diagram"}),"\n",(0,i.jsx)(n.p,{children:"Below given is the reference architecture of the framework with various components."}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"alt text",src:r(2905).A+"",width:"2502",height:"1418"})}),"\n",(0,i.jsx)(n.h4,{id:"overview-of-advanced-rag-approaches",children:"Overview of Advanced RAG Approaches"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Data Loading"})}),"\n",(0,i.jsx)(n.p,{children:"Applications based on Large Language Models (LLMs) often involve extracting data from databases or files, such as PDFs, and converting it into a format usable by LLMs. The pivotal component here is the data source, containing private knowledge or content obtained."}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Data Indexing and Embedding Models: Chunking & Vectorization"})}),"\n",(0,i.jsx)(n.p,{children:"Initially, we construct a vector index to represent the contents of our text documents. This involves breaking down the documents into smaller chunks and converting them into numerical vectors. The vectorized content forms the basis for subsequent retrieval and generation steps."}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Post Retrieval: Retrieval, Re-ranking & Filtering"})}),"\n",(0,i.jsx)(n.p,{children:"After retrieving relevant documents, we refine the context further through re-ranking and filtering:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Re-ranking"}),": Prioritizing documents based on relevance."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Filtering"}),": Removing less relevant or noisy documents."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Pre Query Retrieval: Query Transformations"})}),"\n",(0,i.jsx)(n.p,{children:"Advanced RAG models explore various transformations of user queries to enhance retrieval accuracy. Techniques include query expansion and other modifications."}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Chat Engine: LLM"})}),"\n",(0,i.jsx)(n.p,{children:"The chat engine combines retrieved context with the user\u2019s query to create a prompt for the language model. This prompt guides the language model in generating contextually relevant responses."}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Chat Engine: RAG Agents"})}),"\n",(0,i.jsx)(n.p,{children:"RAG agents manage the entire RAG process, coordinating retrieval, generation, and other components. They ensure seamless interaction between the search index, language model, and other modules."}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Prompting: Response Synthesizer"})}),"\n",(0,i.jsx)(n.p,{children:"The response synthesizer generates the actual answer based on the combined context and user query. Attention and prompt engineering mechanisms may be employed to focus on relevant parts of retrieved documents during generation."}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"environment",children:"Environment"}),"\n",(0,i.jsx)(n.p,{children:"The application is tested with below configurations."}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Node Version :        ",(0,i.jsx)(n.strong,{children:"v20.0+"})]}),"\n",(0,i.jsxs)(n.li,{children:["MongoDB Version (Atlas) :     ",(0,i.jsx)(n.strong,{children:"v7.0 (M10 Cluster Tier)"})]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"document-preface",children:"Document Preface"}),"\n",(0,i.jsx)(n.p,{children:"The MongoDB MAAP Framework documentation provides a comprehensive guide for setting up a Retrieval-Augmented Generation (RAG) application using MongoDB and Atlas Vector Search, along with integration options for various MAAP partners. This framework is designed to be highly configurable, allowing users to tailor their applications by simply modifying a YAML configuration file. The framework supports customization in four key areas: data loaders, embedding models, chat LLM (Large Language Models) models, and post-query re-rankers."}),"\n",(0,i.jsxs)(n.p,{children:["The setup process begins with cloning the project and installing dependencies. This involves navigating to the ",(0,i.jsx)(n.a,{href:"https://github.com/mongodb-partners/maap-framework/tree/main/builder/partnerproduct",children:"builder/partnerproduct"})," directory, building the project locally, and then installing npm packages in the builder/partner product directory."]}),"\n",(0,i.jsx)(n.p,{children:"Configuration of the RAG application is crucial and involves specifying details for data ingestion, embedding models, vector storage, and LLM models in a YAML file. This includes settings for data source types (e.g., PDF files), paths, chunk sizes, embedding class names, MongoDB connection strings, database and collection names, and specifics about the vector search index and LLM models."}),"\n",(0,i.jsx)(n.p,{children:"The documentation also highlights the process of instantiating embedding and LLM models based on the configuration. Different classes are instantiated based on the specified class_name in the configuration, catering to various services like VertexAI, Azure-OpenAI, Cohere, and others for embeddings, and a similar approach is taken for LLM models with classes like Fireworks, Anthropic, and Bedrock."}),"\n",(0,i.jsx)(n.p,{children:"Data loaders play a significant role in how data is ingested into the system. The framework supports multiple types of data loaders (e.g., WebLoader, PdfLoader, SitemapLoader, DocxLoader, ConfluenceLoader), each tailored to handle specific data sources like web pages, PDF files, sitemaps, DOCX documents, and Confluence spaces. These loaders are configured with parameters such as source paths and chunking details, and then added to a data loaders array for processing."}),"\n",(0,i.jsx)(n.p,{children:"After configuring the application, the user is guided through the process of ingesting data, running the server, and starting the UI client application. The UI client application runs locally, allowing users to interact with the application through a web interface."}),"\n",(0,i.jsx)(n.p,{children:"This documentation provides a clear and detailed roadmap for developers to set up and customize their RAG applications using the MongoDB MAAP Framework, emphasizing flexibility and ease of use through configuration."}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Setup and Running Demo Video: ",(0,i.jsx)(n.a,{href:"https://www.youtube.com/watch?v=-r824BdVZt0",children:"https://www.youtube.com/watch?v=-r824BdVZt0"})]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"steps-to-run-the-application",children:"Steps to run the application"}),"\n",(0,i.jsx)(n.h3,{id:"installation",children:"Installation"}),"\n",(0,i.jsx)(n.p,{children:"Clone the project to your machine, and install dependencies."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"cd maap-framework\nnpm install\ncd builder/partnerproduct\nnpm install\n"})}),"\n",(0,i.jsx)(n.h3,{id:"configuration",children:"Configuration"}),"\n",(0,i.jsxs)(n.p,{children:["Edit the ",(0,i.jsx)(n.code,{children:"config.yaml"})," file to include the necessary details for data ingestion, embedding models, vector storage, and LLM models. The configuration file should include settings for data source types (e.g., PDF files), paths, chunk sizes, embedding class names, MongoDB connection strings, database and collection names, and specifics about the vector search index and LLM models."]}),"\n",(0,i.jsx)(n.p,{children:"For example, the following configuration settings might be included:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"ingest:\n  - source: 'pdf'\n    source_path: '<file_path>'\n    chunk_size: 2000\n    chunk_overlap: 200\nembedding:\n    class_name: Nomic-v1.5\nvector_store:\n    connectionString: '<you_mdb_connection_string>'\n    dbName: '<db_name>'\n    collectionName: 'embedded_content'\n    embeddingKey: 'embedding'\n    textKey: 'text'\n    numCandidates: 150\n    minScore: 0.1 \n    vectorSearchIndexName: 'vector_index'\nllms:\n    class_name: Fireworks\n    model_name: 'accounts/fireworks/models/mixtral-8x22b-instruct'\n    temperature: ''\n    top_p: ''\n    top_k: ''\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Also, please make a copy of the ",(0,i.jsx)(n.code,{children:"builder/partnerproduct/example.env"})," file and rename it as ",(0,i.jsx)(n.code,{children:".env"}),". Place this file in the same folder where you are running your application. In the ",(0,i.jsx)(n.code,{children:".env"})," file, add the necessary API keys, URLs, connection strings, and any other secrets required for your application."]}),"\n",(0,i.jsxs)(n.p,{children:["The following contents are added in the ",(0,i.jsx)(n.code,{children:".env"})," (Environment File):"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"COHERE_API_KEY=\nFIREWORKS_API_KEY=\nOPENAI_API_KEY=sk-\nANYSCALE_API_KEY=esecret_\nANYSCALE_BASE_URL=https://api.endpoints.anyscale.com/v1\nBEDROCK_AWS_REGION=us-east-1\nBEDROCK_AWS_ACCESS_KEY_ID=\nBEDROCK_AWS_SECRET_ACCESS_KEY=\nAZURE_OPENAI_API_KEY=\nAZURE_OPENAI_API_INSTANCE_NAME=\nAZURE_OPENAI_API_EMBEDDINGS_DEPLOYMENT_NAME=\nAZURE_OPENAI_API_VERSION=\nAZURE_OPENAI_API_DEPLOYMENT_NAME=\n"})}),"\n",(0,i.jsx)(n.p,{children:"Ensure you source the environment (.env file) by running"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:". ./.env\n"})}),"\n",(0,i.jsxs)(n.p,{children:["After you source the environment, echo any of the environment variables to ensure they are properly sourced. For example run ",(0,i.jsx)(n.code,{children:"echo $OPENAI_API_KEY"}),"."]}),"\n",(0,i.jsx)(n.h3,{id:"maap-partner-integrations",children:"MAAP Partner Integrations"}),"\n",(0,i.jsxs)(n.p,{children:["Partner specific information can be found as below;\nGo to ",(0,i.jsx)(n.a,{href:"https://mongodb-partners.github.io/maap-framework/docs/category/partners",children:"this"})," page for partner specific documentations."]}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{children:"Sr #"}),(0,i.jsx)(n.th,{children:"MAAP Partner"}),(0,i.jsx)(n.th,{children:"Partner Type"}),(0,i.jsx)(n.th,{children:"Documentation"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"1"}),(0,i.jsx)(n.td,{children:"AWS"}),(0,i.jsx)(n.td,{children:"Cloud provider"}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.a,{href:"https://mongodb-partners.github.io/maap-framework/docs/partners/amazon",children:"Link"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"2"}),(0,i.jsx)(n.td,{children:"Azure"}),(0,i.jsx)(n.td,{children:"Cloud provider"}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.a,{href:"https://mongodb-partners.github.io/maap-framework/docs/partners/azure",children:"Link"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"3"}),(0,i.jsx)(n.td,{children:"GCP"}),(0,i.jsx)(n.td,{children:"Cloud provider"}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.a,{href:"https://mongodb-partners.github.io/maap-framework/docs/partners/gcp",children:"Link"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"4"}),(0,i.jsx)(n.td,{children:"Anthropic"}),(0,i.jsx)(n.td,{children:"AI tech"}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.a,{href:"https://mongodb-partners.github.io/maap-framework/docs/partners/anthropic",children:"Link"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"5"}),(0,i.jsx)(n.td,{children:"Anyscale"}),(0,i.jsx)(n.td,{children:"AI tech"}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.a,{href:"https://mongodb-partners.github.io/maap-framework/docs/partners/anyscale",children:"Link"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"6"}),(0,i.jsx)(n.td,{children:"Cohere"}),(0,i.jsx)(n.td,{children:"AI tech"}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.a,{href:"https://mongodb-partners.github.io/maap-framework/docs/partners/cohere",children:"Link"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"7"}),(0,i.jsx)(n.td,{children:"Fireworks.AI"}),(0,i.jsx)(n.td,{children:"AI tech"}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.a,{href:"https://mongodb-partners.github.io/maap-framework/docs/partners/fireworksai",children:"Link"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"8"}),(0,i.jsx)(n.td,{children:"Langchain"}),(0,i.jsx)(n.td,{children:"AI tech"}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.a,{href:"https://mongodb-partners.github.io/maap-framework/docs/partners/langchain",children:"Link"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"9"}),(0,i.jsx)(n.td,{children:"Nomic"}),(0,i.jsx)(n.td,{children:"AI tech"}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.a,{href:"https://mongodb-partners.github.io/maap-framework/docs/partners/nomic",children:"Link"})})]})]})]}),"\n",(0,i.jsx)(n.h3,{id:"ingest-data",children:"Ingest Data"}),"\n",(0,i.jsxs)(n.p,{children:["Once configured you can use the yaml file you just created say as in example ",(0,i.jsx)(n.code,{children:"builder/partnerproduct/src/config.yaml"}),". Run the following from the same terminal as where you sourced ",(0,i.jsx)(n.code,{children:".env"}),". Normally this would be under\n",(0,i.jsx)(n.code,{children:"builder/partnerproduct/src"})]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"npm install\nnpm run ingest <path to your config.yaml>\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Go to ",(0,i.jsx)(n.a,{href:"https://mongodb-partners.github.io/maap-framework/docs/category/app-modules",children:"this"})," page for loader specific documentations."]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsxs)(n.em,{children:["NOTE: After ingesting your first content, ensure the vector index has been created properly and with the correct vector dimension. You can verify the size of the  ",(0,i.jsx)(n.code,{children:"embedding"})," array on the ",(0,i.jsx)(n.code,{children:"embedded_content"})," collection, and then set the same size on the ",(0,i.jsx)(n.code,{children:"numDimensions"})," field of the ",(0,i.jsx)(n.code,{children:"vector_index"}),"."]})}),"\n",(0,i.jsx)(n.h3,{id:"run-the-server",children:"Run the server"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"npm run start <full path to your config.yaml>\n"})}),"\n",(0,i.jsx)(n.h3,{id:"start-your-application-ui",children:"Start your application UI"}),"\n",(0,i.jsx)(n.p,{children:"You can start your UI client application by running the following command in a separate terminal."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"cd builder/partnerproduct/ui\nnpm install\nnpm run start\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Your application will be running at ",(0,i.jsx)(n.a,{href:"http://localhost:3000",children:"http://localhost:3000"}),"."]}),"\n",(0,i.jsx)(n.h2,{id:"identified-limitations",children:"Identified Limitations"}),"\n",(0,i.jsx)(n.p,{children:"The following limitations have been recognized within the current framework. These will be addressed in upcoming updates and releases:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Support for only ",(0,i.jsx)(n.code,{children:".pptx"})," format in ",(0,i.jsx)(n.code,{children:"ppt"})," dataloader."]}),"\n",(0,i.jsx)(n.li,{children:"Local PDF, PPT, and DOCX files mentioned in the data sources response cannot be opened directly."}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"collectionName"}),", ",(0,i.jsx)(n.code,{children:"embeddingKey"}),", ",(0,i.jsx)(n.code,{children:"textKey"})," values in the ",(0,i.jsx)(n.code,{children:".config"})," file are fixed and cannot be changed."]}),"\n",(0,i.jsx)(n.li,{children:"There might be frequent timeouts in AnyScale LLM."}),"\n",(0,i.jsx)(n.li,{children:"Confluence loader fails at authentication."}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}},2905:(e,n,r)=>{r.d(n,{A:()=>i});const i=r.p+"assets/images/MAAP_Arch-c623c684d8bcdee8f6fcaa112399aa16.png"},8453:(e,n,r)=>{r.d(n,{R:()=>o,x:()=>a});var i=r(6540);const t={},s=i.createContext(t);function o(e){const n=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),i.createElement(s.Provider,{value:n},e.children)}}}]);