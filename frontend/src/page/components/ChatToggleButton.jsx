import { IMAGES } from "../../images";
import { useChatStore, CHAT_STATES } from "../../hooks/useChatStore";

function ChatToggleButton() {
  const status = useChatStore((state) => state.status);
  const toggleChat = useChatStore((state) => state.toggleChat);
  const isOpen = status !== CHAT_STATES.CLOSED;

  return (
    <button
      onClick={toggleChat}
      className="fixed bottom-6 right-6 z-20 h-12 w-12 rounded-full bg-black text-white shadow-lg hover:bg-gray-800 flex items-center justify-center"
      aria-label="Toggle chat"
    >
      {isOpen ? (
        <ButtonIcon src={IMAGES.closeChatButton} alt="Close Chat" />
      ) : (
        <ButtonIcon src={IMAGES.openChatButton} alt="Open Chat" />
      )}
    </button>
  );
}

function ButtonIcon({ src, alt }) {
  return (
    <img src={src} alt={alt} className="w-6 h-6 object-contain filter invert" />
  );
}

export default ChatToggleButton;
