import { useRef, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import MessageInput from "./MessageInput";
import useChatLogic from "../../hooks/useChatLogic";
import ChatContainer from "./ChatContainer";

function ChatComponent({ onClose }) {
  const {
    message,
    setMessage,
    chatHistory,
    isTyping,
    handleSendMessage,
    formatTime,
  } = useChatLogic();

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <ChatContainer>
      <ChatHeader onClose={onClose} />
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-white"
      >
        {chatHistory.map((chat, index) => (
          <ChatMessage key={index} chat={chat} formatTime={formatTime} />
        ))}

        {isTyping && <TypingIndicator />}
      </div>

      <MessageInput
        message={message}
        setMessage={setMessage}
        handleSendMessage={handleSendMessage}
      />
    </ChatContainer>
  );
}

export default ChatComponent;
