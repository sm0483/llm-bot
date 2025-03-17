import HistoryContainer from "./HistoryContainer";
import HistoryHeader from "./HistoryHeader";
import MessageList from "./MessageList";
import HistoryFooter from "./HistoryFooter";
import AskQuestionButton from "./AskQuestionButton";

function History({
  onAskQuestion,
  updateChatHistory,
  cleanupChat,
  messageHistory,
}) {

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
          title={"Ask a question"}
        />
      </HistoryFooter>
    </HistoryContainer>
  );
}

export default History;
