import React from "react";
import MessageItem from "./MessageItem";

function MessageList({ messages, onMessageClick }) {
  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((msg, index) => (
        <MessageItem key={index} message={msg} onClick={onMessageClick} />
      ))}
    </div>
  );
}

export default MessageList;
