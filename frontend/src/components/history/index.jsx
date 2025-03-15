import React from "react";
import HistoryContainer from "./HistoryContainer";
import HistoryHeader from "./HistoryHeader";
import MessageList from "./MessageList";
import HistoryFooter from "./HistoryFooter";
import AskQuestionButton from "./AskQuestionButton";
import { useMessageHistory } from "../../hooks/useMessageHistory";

function History({ onAskQuestion }) {
  const messageHistory = useMessageHistory();

  return (
    <HistoryContainer>
      <HistoryHeader title="Messages" />
      <MessageList messages={messageHistory} onMessageClick={onAskQuestion} />
      <HistoryFooter>
        <AskQuestionButton onAskQuestion={onAskQuestion} />
      </HistoryFooter>
    </HistoryContainer>
  );
}

export default History;
