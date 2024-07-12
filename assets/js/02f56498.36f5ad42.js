"use strict";(self.webpackChunkmaap_docs=self.webpackChunkmaap_docs||[]).push([[995],{6169:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>t,contentTitle:()=>o,default:()=>h,frontMatter:()=>s,metadata:()=>a,toc:()=>d});var l=i(4848),r=i(8453);const s={sidebar_position:5},o="Anyscale",a={id:"partners/anyscale",title:"Anyscale",description:"Introduction",source:"@site/docs/partners/anyscale.md",sourceDirName:"partners",slug:"/partners/anyscale",permalink:"/maap-chatbot-builder/docs/partners/anyscale",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5},sidebar:"tutorialSidebar",previous:{title:"Anthropic",permalink:"/maap-chatbot-builder/docs/partners/anthropic"},next:{title:"Cohere",permalink:"/maap-chatbot-builder/docs/partners/cohere"}},t={},d=[{value:"Introduction",id:"introduction",level:2},{value:"Deploying your model",id:"deploying-your-model",level:2},{value:"LLM Model",id:"llm-model",level:3},{value:"Usage with MAAP",id:"usage-with-maap",level:4},{value:"Config File :",id:"config-file-",level:4},{value:"Environment Variable :",id:"environment-variable-",level:4},{value:"References",id:"references",level:3},{value:"Model Name",id:"model-name",level:5},{value:"API Key &amp; Base URL",id:"api-key--base-url",level:5}];function c(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.R)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.h1,{id:"anyscale",children:"Anyscale"}),"\n",(0,l.jsx)(n.h2,{id:"introduction",children:"Introduction"}),"\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.a,{href:"https://Anyscale.com/",children:"Anyscale"})," is a Canadian multinational technology firm that concentrates on enterprise artificial intelligence, specializing particularly in large-scale language models."]}),"\n",(0,l.jsx)(n.h2,{id:"deploying-your-model",children:"Deploying your model"}),"\n",(0,l.jsx)(n.p,{children:"Anyscale offers the capability to deploy various Chat Models(LLM) under its umbrella."}),"\n",(0,l.jsx)(n.h3,{id:"llm-model",children:"LLM Model"}),"\n",(0,l.jsxs)(n.p,{children:["Refer to their ",(0,l.jsx)(n.a,{href:"https://docs.anthropic.com/en/docs/about-claude/models",children:"documentation"})," to understand the latest offerings, with feature and cost comparisons."]}),"\n",(0,l.jsx)(n.h4,{id:"usage-with-maap",children:"Usage with MAAP"}),"\n",(0,l.jsx)(n.p,{children:"To use Anyscale model with MAAP framework, you would need to feed below values."}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsx)(n.h4,{id:"config-file-",children:"Config File :"}),"\n",(0,l.jsxs)(n.p,{children:["Provided below are the values required to be added in ",(0,l.jsx)(n.code,{children:"config.yaml"})," file in embedding section."]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{children:"embedding:\n    class_name: Anyscale\n    model_name: <check_references_below>\n"})}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsx)(n.h4,{id:"environment-variable-",children:"Environment Variable :"}),"\n",(0,l.jsxs)(n.p,{children:["Below value(s) are to be added in ",(0,l.jsx)(n.code,{children:".env"})," file"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{children:"ANYSCALE_API_KEY = <check_references_below>\nANYSCALE_BASE_URL= <check_references_below>\n"})}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"references",children:"References"}),"\n",(0,l.jsx)(n.p,{children:"Provided below are the instructions on how to procure the right values for building your MAAP framework."}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsx)(n.h5,{id:"model-name",children:"Model Name"}),"\n",(0,l.jsxs)(n.p,{children:["You can pick any model from the ",(0,l.jsx)(n.a,{href:"https://docs.anyscale.com/1.0.0/endpoints/overview/",children:"updated list"})," given in Anyscale documentation."]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsx)(n.h5,{id:"api-key--base-url",children:"API Key & Base URL"}),"\n",(0,l.jsxs)(n.p,{children:["Follow the steps given in this ",(0,l.jsx)(n.a,{href:"https://docs.anyscale.com/1.0.0/endpoints/model-serving/get-started/",children:"guide"}),", to setup your account and get ",(0,l.jsx)(n.code,{children:"API Key"})," and ",(0,l.jsx)(n.code,{children:"Base URL"})]}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(c,{...e})}):c(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>o,x:()=>a});var l=i(6540);const r={},s=l.createContext(r);function o(e){const n=l.useContext(s);return l.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),l.createElement(s.Provider,{value:n},e.children)}}}]);