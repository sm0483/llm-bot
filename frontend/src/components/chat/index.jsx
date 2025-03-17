import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import ChatContainer from "./ChatContainer";
import ChatMessageHistory from "./ChatMessageHistory";
import { formatTime } from "../../utils/dateUtils";
import ChatServiceConnector from "./ChatServiceConnector";

function ChatComponent({
  onClose,
  chatHistory,
  isTyping,
  handleSendMessage,
  addBotMessage,
}) {
  return (
    <ChatContainer>
      <ChatServiceConnector addBotMessage={addBotMessage} />
      <ChatHeader onClose={onClose} />
      <ChatMessageHistory
        chatHistory={chatHistory}
        formatTime={formatTime}
        isTyping={isTyping}
      />
      <MessageInput
        handleSendMessage={handleSendMessage}
        placeholder={"Ask question..."}
      />
    </ChatContainer>
  );
}

export default ChatComponent;
