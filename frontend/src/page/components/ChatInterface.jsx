import HistoryComponent from "../../components/history";
import ChatComponent from "../../components/chat";
import {
  useChatStatusStore,
  CHAT_STATES,
} from "../../hooks/useChatStatusStore";

function ChatInterface() {
  const status = useChatStatusStore((state) => state.status);
  const openChat = useChatStatusStore((state) => state.openChat);
  const openHistory = useChatStatusStore((state) => state.openHistory);

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
