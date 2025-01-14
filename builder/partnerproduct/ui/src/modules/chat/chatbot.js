import Chatbot, {
  FloatingActionButtonTrigger,
  InputBarTrigger,
  ModalView,
} from "mongodb-chatbot-ui";
import { H1, H2 } from '@leafygreen-ui/typography';

import './chatbot.css';

const suggestedPrompts = [
  "set slug:EAF",
  "set name:Tollmann,Kamillah"
];

function ChatModule() {
  return (
    <div className="chat-app">
      <header className="chat-header">
      <H1>RAG Chatbot</H1>
      <Chatbot darkMode={true} serverBaseUrl="http://localhost:9000/api/v1" shouldStream={false} isExperimental={false}>
        <>
          {/* <InputBarTrigger suggestedPrompts={suggestedPrompts}  /> */}
          <FloatingActionButtonTrigger text="My MongoDB AI" />
          <ModalView
            initialMessageText="Welcome to MongoDB AI Assistant. Please set a name and slug."
            initialMessageSuggestedPrompts={suggestedPrompts}
          />
        </>
      </Chatbot>
      </header>
    </div>
  );
}

export default ChatModule;