import HistoryComponent from "../../components/history";
import ChatComponent from "../../components/chat";
import { useChatViewStore, CHAT_STATES } from "../../store/useChatViewStore";
import { useChatStore } from "../../store/useChatStore";
import { useMessageHistory } from "../../hooks/useMessageHistory";

function ChatInterface() {
  const status = useChatViewStore((state) => state.status);
  const openChat = useChatViewStore((state) => state.openChat);
  const openHistory = useChatViewStore((state) => state.openHistory);
  const chatHistory = useChatStore((state) => state.chatHistory);
  const isTyping = useChatStore((state) => state.isTyping);
  const handleSendMessage = useChatStore((state) => state.handleSendMessage);
  const addBotMessage = useChatStore((state) => state.addBotMessage);
  const updateChatHistory = useChatStore((state) => state.updateChatHistory);
  const cleanupChat = useChatStore((state) => state.cleanupChat);
  const messageHistory = useMessageHistory();

  if (status === CHAT_STATES.CLOSED) {
    return null;
  }

  return (
    <>
      {status === CHAT_STATES.HISTORY && (
        <HistoryComponent
          onAskQuestion={openChat}
          updateChatHistory={updateChatHistory}
          cleanupChat={cleanupChat}
          messageHistory={messageHistory}
        />
      )}

      {status === CHAT_STATES.CONVERSATION && (
        <ChatComponent
          onClose={openHistory}
          chatHistory={chatHistory}
          isTyping={isTyping}
          handleSendMessage={handleSendMessage}
          addBotMessage={addBotMessage}
        />
      )}
    </>
  );
}

export default ChatInterface;
