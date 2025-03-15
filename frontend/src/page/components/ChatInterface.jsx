import HistoryComponent from "../../components/history";
import ChatComponent from "../../components/chat";
import { useChatStore, CHAT_STATES } from "../../hooks/useChatStore";

function ChatInterface() {
  const status = useChatStore((state) => state.status);
  const openChat = useChatStore((state) => state.openChat);
  const openHistory = useChatStore((state) => state.openHistory);

  if (status === CHAT_STATES.CLOSED) {
    return null;
  }

  return (
    <>
      {status === CHAT_STATES.HISTORY && (
        <HistoryComponent onAskQuestion={openChat} />
      )}

      {status === CHAT_STATES.CONVERSATION && (
        <ChatComponent onClose={openHistory} />
      )}
    </>
  );
}

export default ChatInterface;
