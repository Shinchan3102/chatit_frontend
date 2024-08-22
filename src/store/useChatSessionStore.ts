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
  totalChatSessions: ChatSession[];
  fetchChatSessions: () => void;
  fetchChatSessionById: (id: string) => void;
  filterChatSessions: (query: string) => void;
  createNewSession: (sessionName: string) => void;
  deleteChatSession: (id: string, router: any, isRedirect: boolean) => void;
  updateChatSession: (id: string, updatedAt: string) => void; 
};

export const useChatSessionStore = create<ChatSessionStore>((set, get) => ({
  chats: [],
  totalChatSessions: [],

  fetchChatSessions: async () => {
    const { userInfos } = useUserStore.getState();
    if (!userInfos?.id || !userInfos?.jwtToken) return;

    try {
      const chats = await fetchChatSessionsAPI(userInfos.id, userInfos.jwtToken);
      set({ chats, totalChatSessions: chats });
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

  filterChatSessions: (query: string) => {
    const { totalChatSessions } = get();
    if (query.trim() === '') {
      set({ chats: totalChatSessions });
    } else {
      const filteredChats = totalChatSessions.filter((chat) =>
        chat.sessionName.toLowerCase().includes(query.toLowerCase())
      );
      set({ chats: filteredChats });
    }
  },

  createNewSession: async (sessionName: string) => {
    const { userInfos } = useUserStore.getState();
    if (!userInfos?.id || !userInfos?.jwtToken) return;

    try {
      const chat = await createNewChatSessionAPI(sessionName, userInfos.id, userInfos.jwtToken);
      set({ chats: [chat, ...get().chats], totalChatSessions: [chat, ...get().totalChatSessions] });
      toast.success('Chat created successfully!');
    } catch (error) {
      console.error('Error creating chat:', error);
      toast.error('Error creating chat');
    }
  },

  updateChatSession: (id: string, updatedAt: string) => {
    const { chats } = get();
    const updatedChats = chats.map((chat) => 
      chat.id === id ? { ...chat, updatedAt } : chat
    );

    const chatToMove = updatedChats.find((chat) => chat.id === id);
    const remainingChats = updatedChats.filter((chat) => chat.id !== id);

    if (chatToMove) {
      set({
        chats: [chatToMove, ...remainingChats],
        totalChatSessions: [chatToMove, ...remainingChats],
      });
    } else {
      console.error('Chat session not found');
    }
  },

  deleteChatSession: async (chatId: string, router: any, isRedirect: boolean) => {
    const { userInfos } = useUserStore.getState();
    if (!userInfos?.id || !userInfos?.jwtToken) return;
    console.log(isRedirect);
    try {
      const success = await deleteChatSessionAPI(chatId, userInfos.jwtToken);
      if (success) {
        set({
          chats: get().chats.filter((chat) => chat.id !== chatId),
          totalChatSessions: get().totalChatSessions.filter((chat) => chat.id !== chatId),
        });
        toast.success('Chat deleted successfully!');
        if (isRedirect) router.push('/home');
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
      toast.error('Error deleting chat');
    }
  },
}));
