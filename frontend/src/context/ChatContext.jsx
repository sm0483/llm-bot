import { createContext, useState, useEffect } from "react";
import chatService from "../services/chatService";

export const ChatContext = createContext();

const initialMessage = {
  message: "Hi there! I am fin.",
  sender: "bot",
  timestamp: new Date(Date.now()).toISOString(),
  avatar: "Fin",
};

export const ChatProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([initialMessage]);
  const [isTyping, setIsTyping] = useState(false);

  const updateChatHistory = (id) => {
    setChatHistory([
      {
        message: `history //TODO chat id : ${id}`,
        sender: "bot",
        timestamp: new Date(Date.now()).toISOString(),
        avatar: "Fin",
      },
    ]);
  };

  const cleanupChat = () => {
    setChatHistory([initialMessage]);
  };

  useEffect(() => {
    chatService.connect();

    chatService.on("receive_message", (data) => {
      const botMessage = {
        ...data,
        sender: "bot",
        avatar: "Fin",
      };

      setChatHistory((prev) => [...prev, botMessage]);
      setIsTyping(false);
    });

    return () => {
      chatService.off("receive_message");
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const messageData = {
      message: message,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    chatService.sendMessage(messageData);

    setChatHistory((prev) => [...prev, messageData]);
    setMessage("");
    setIsTyping(true);

    setTimeout(() => {
      if (isTyping) {
        const botResponse = {
          message: "Thanks for your message! How can I help you further?",
          sender: "bot",
          timestamp: new Date().toISOString(),
          avatar: "Fin",
        };
        setChatHistory((prev) => [...prev, botResponse]);
        setIsTyping(false);
      }
    }, 1500);
  };

  const value = {
    message,
    setMessage,
    chatHistory,
    isTyping,
    handleSendMessage,
    updateChatHistory,
    cleanupChat,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
