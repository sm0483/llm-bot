import { useChat } from "../../hooks/useChat";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import ChatContainer from "./ChatContainer";
import ChatMessageHistory from "./ChatMessageHistory";
import { formatTime } from "../../utils/dateUtils";

function ChatComponent({ onClose }) {
  const { message, setMessage, chatHistory, isTyping, handleSendMessage } =
    useChat();

  return (
    <ChatContainer>
      <ChatHeader onClose={onClose} />
      <ChatMessageHistory
        chatHistory={chatHistory}
        formatTime={formatTime}
        isTyping={isTyping}
      />
      <MessageInput
        message={message}
        setMessage={setMessage}
        handleSendMessage={handleSendMessage}
      />
    </ChatContainer>
  );
}

export default ChatComponent;
