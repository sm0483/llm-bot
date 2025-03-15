import { create } from 'zustand';

export const CHAT_STATES = {
  CLOSED: 'CLOSED',
  HISTORY: 'HISTORY',
  CONVERSATION: 'CONVERSATION'
};

export const useChatStore = create((set) => ({
  status: CHAT_STATES.CLOSED,
  isChatOpen: false,

  openHistory: () => set({
    status: CHAT_STATES.HISTORY,
    isChatOpen: true,
  }),

  openChat: () => set({
    status: CHAT_STATES.CONVERSATION,
    isChatOpen: true,
  }),

  closeChat: () => set({
    status: CHAT_STATES.CLOSED,
    isChatOpen: false,
  }),

  toggleChat: () => set((state) => {
    if (state.status === CHAT_STATES.CLOSED) {
      return {
        status: CHAT_STATES.HISTORY,
        isChatOpen: true,
      };
    } else {
      return {
        status: CHAT_STATES.CLOSED,
        isChatOpen: false,
      };
    }
  }),
}));