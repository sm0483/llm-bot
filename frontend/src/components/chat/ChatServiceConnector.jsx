import { useEffect } from "react";
import chatService from "../../services/chatService";

function ChatServiceConnector({ addBotMessage }) {
  useEffect(() => {
    chatService.connect();

    chatService.on("receive_message", (data) => {
      addBotMessage(data);
    });

    return () => {
      chatService.off("receive_message");
    };
  }, []);

  return null;
}

export default ChatServiceConnector;
