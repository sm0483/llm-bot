import { create } from "zustand";
import chatService from "../services/chatService";

const initialMessage = {
  message: "Hi there! I am fin.",
  sender: "bot",
  timestamp: new Date(Date.now()).toISOString(),
  avatar: "Fin",
};

const useChatStore = create((set, get) => ({
  chatHistory: [initialMessage],
  isTyping: false,

  updateChatHistory: (id) =>
    set({
      chatHistory: [
        {
          message: `history //TODO chat id : ${id}`,
          sender: "bot",
          timestamp: new Date(Date.now()).toISOString(),
          avatar: "Fin",
        },
      ],
    }),

  cleanupChat: () => set({ chatHistory: [initialMessage] }),

  handleSendMessage: (message) => {
    const currentMessage = message.trim();
    if (!currentMessage) return;

    const messageData = {
      message: currentMessage,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    chatService.sendMessage(messageData);

    set((state) => ({
      chatHistory: [...state.chatHistory, messageData],
      message: "",
      isTyping: true,
    }));

    setTimeout(() => {
      const currentState = get();
      if (currentState.isTyping) {
        const botResponse = {
          message: "Thanks for your message! How can I help you further?",
          sender: "bot",
          timestamp: new Date().toISOString(),
          avatar: "Fin",
        };
        set((state) => ({
          chatHistory: [...state.chatHistory, botResponse],
          isTyping: false,
        }));
      }
    }, 90000);
  },

  addBotMessage: (data) => {
    const botMessage = {
      ...data,
      sender: "bot",
      avatar: "Fin",
    };

    set((state) => ({
      chatHistory: [...state.chatHistory, botMessage],
      isTyping: false,
    }));
  },
}));

export { useChatStore };
