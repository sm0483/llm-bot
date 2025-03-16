import HistoryContainer from "./HistoryContainer";
import HistoryHeader from "./HistoryHeader";
import MessageList from "./MessageList";
import HistoryFooter from "./HistoryFooter";
import AskQuestionButton from "./AskQuestionButton";
import { useMessageHistory } from "../../hooks/useMessageHistory";
import { useChat } from "../../hooks/useChat";
function History({ onAskQuestion }) {
  const messageHistory = useMessageHistory();
  const { updateChatHistory, cleanupChat } = useChat();

  return (
    <HistoryContainer>
      <HistoryHeader title="Messages" />
      <MessageList
        messages={messageHistory}
        onMessageClick={onAskQuestion}
        updateChatHistory={updateChatHistory}
      />
      <HistoryFooter>
        <AskQuestionButton
          onAskQuestion={onAskQuestion}
          cleanupChat={cleanupChat}
        />
      </HistoryFooter>
    </HistoryContainer>
  );
}

export default History;
