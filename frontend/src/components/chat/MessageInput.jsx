import { IMAGES } from "../../images";

function MessageInput({ handleSendMessage, message, setMessage }) {
  return (
    <form
      onSubmit={handleSendMessage}
      className="p-4 border-t border-gray-200 bg-white md:rounded-2xl"
    >
      <div className="flex items-center space-x-2 relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 p-3 pl-4 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-black"
        />
        <div className="absolute right-3 flex space-x-2">
          <button
            type="submit"
            className="p-2 rounded-lg bg-transparent hover:bg-gray-200 transition flex items-center justify-center"
          >
            <img
              src={IMAGES.sendButton}
              alt="Send Button"
              className="w-6 h-6 object-contain filter invert"
            />
          </button>
        </div>
      </div>
    </form>
  );
}
export default MessageInput;
