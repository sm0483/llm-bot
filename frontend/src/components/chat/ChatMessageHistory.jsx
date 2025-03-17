import React, { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";

function ChatMessageHistory({ chatHistory, formatTime, isTyping }) {
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div
      ref={chatContainerRef}
      className="flex-1 overflow-y-auto p-4 space-y-4 bg-white"
    >
      {chatHistory.map((chat, index) => (
        <ChatMessage key={index} chat={chat} formatTime={formatTime} />
      ))}
      
      {isTyping && <TypingIndicator />}
    </div>
  );
}

export default ChatMessageHistory;