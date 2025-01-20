import Chatbot, {
  FloatingActionButtonTrigger,
  InputBarTrigger,
  ModalView,
} from "mongodb-chatbot-ui";
import { H1, H2 } from '@leafygreen-ui/typography';

import './chatbot.css';

const suggestedPrompts = [
  "set name:Tollmann,Kamillah",
  "set name:Wunder,Avalanche",
  "set name:Whirlig,Yodelga"
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
            initialMessageText="Welcome to MongoDB AI Assistant. Please set a name to start chatting."
            initialMessageSuggestedPrompts={suggestedPrompts}
          />
        </>
      </Chatbot>
      </header>
    </div>
  );
}

export default ChatModule;