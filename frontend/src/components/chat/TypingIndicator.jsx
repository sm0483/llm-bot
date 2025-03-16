import { IMAGES } from "../../images";

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="h-8 w-8 rounded-md flex items-center justify-center mr-2">
        <img
          src={IMAGES.logo}
          alt="Bot Avatar"
          className="w-12 h-12 object-contain"
        />
      </div>
      <div className="bg-gray-100 text-black rounded-lg p-3">
        <div className="flex space-x-1">
          <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
          <div
            className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default TypingIndicator;
