import { IMAGES } from "../../images";

const ChatMessage = ({ chat, formatTime }) => {
  const isBot = chat.sender === "bot";
  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"}`}>
      {isBot && (
        <div className="h-8 w-8 rounded-md flex items-center justify-center mr-2 mt-1">
          <img
            src={IMAGES.logo}
            alt="Bot Avatar"
            className="w-12 h-12 object-contain"
          />
        </div>
      )}
      <div
        className={`max-w-[75%] rounded-lg p-3 ${
          isBot ? "bg-gray-100 text-black" : "bg-blue-600 text-white"
        }`}
      >
        {isBot && chat.avatar && (
          <p className="text-xs font-semibold mb-1">{chat.avatar}</p>
        )}
        <p className="text-sm">{chat.message}</p>
        <span
          className={`block text-xs mt-1 ${
            isBot ? "text-gray-500" : "text-blue-200"
          } text-right`}
        >
          {formatTime(chat.timestamp)}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;