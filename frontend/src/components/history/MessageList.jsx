import MessageItem from "./MessageItem";

function MessageList({ messages, onMessageClick, updateChatHistory }) {
  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((msg, index) => (
        <MessageItem
          key={index}
          message={msg}
          onClick={onMessageClick}
          updateChatHistory={updateChatHistory}
        />
      ))}
    </div>
  );
}

export default MessageList;
