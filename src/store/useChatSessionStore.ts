// src/store/useChatSessionStore.ts

import { create } from 'zustand';
import { toast } from 'sonner';
import { useUserStore } from '@/store/useUserStore';
import {
  fetchChatSessionsAPI,
  fetchChatSessionByIdAPI,
  createNewChatSessionAPI,
  deleteChatSessionAPI,
} from '@/utils/chatSession';

export type ChatSession = {
  id: string;
  sessionName: string;
  createdAt: string;
  updatedAt: string;
};

type ChatSessionStore = {
  chats: ChatSession[];
  fetchChatSessions: () => void;
  fetchChatSessionById: (id: string) => void;
  createNewSession: (sessionName: string) => void;
  deleteChatSession: (id: string, router: any, isRedirect: boolean) => void;
};

export const useChatSessionStore = create<ChatSessionStore>((set, get) => ({
  chats: [],

  fetchChatSessions: async () => {
    const { userInfos } = useUserStore.getState();
    if (!userInfos?.id || !userInfos?.jwtToken) return;

    try {
      const chats = await fetchChatSessionsAPI(userInfos.id, userInfos.jwtToken);
      set({ chats });
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  },

  fetchChatSessionById: async (id: string) => {
    const { userInfos } = useUserStore.getState();
    if (!userInfos?.id || !userInfos?.jwtToken) return;

    try {
      const chat = await fetchChatSessionByIdAPI(id, userInfos.jwtToken);
      set({ chats: [...get().chats, chat] });
    } catch (error) {
      console.error('Error fetching chat by ID:', error);
    }
  },

  createNewSession: async (sessionName: string) => {
    const { userInfos } = useUserStore.getState();
    if (!userInfos?.id || !userInfos?.jwtToken) return;

    try {
      const chat = await createNewChatSessionAPI(sessionName, userInfos.id, userInfos.jwtToken);
      set({ chats: [chat, ...get().chats] });
      toast.success('Chat created successfully!');
    } catch (error) {
      console.error('Error creating chat:', error);
      toast.error('Error creating chat');
    }
  },

  deleteChatSession: async (chatId: string, router: any, isRedirect: boolean) => {
    const { userInfos } = useUserStore.getState();
    if (!userInfos?.id || !userInfos?.jwtToken) return;
    console.log(isRedirect);
    try {
      const success = await deleteChatSessionAPI(chatId, userInfos.jwtToken);
      if (success) {
        set({ chats: get().chats.filter((chat) => chat.id !== chatId) });
        toast.success('Chat deleted successfully!');
        if (isRedirect) router.push('/home');
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
      toast.error('Error deleting chat');
    }
  },
}));
