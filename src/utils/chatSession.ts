
import axios from 'axios';

const apiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;

export const fetchChatSessionsAPI = async (userId: string, jwtToken: string) => {
  const response = await axios.get(`${apiBaseUrl}/api/chat-sessions?filters[user]=${userId}`, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });

  return response.data.data.map((chat: any) => ({
    id: chat.id,
    sessionName: chat.attributes.sessionName,
    createdAt: chat.attributes.createdAt,
    updatedAt: chat.attributes.updatedAt,
  }));
};

export const fetchChatSessionByIdAPI = async (chatId: string, jwtToken: string) => {
  const response = await axios.get(`${apiBaseUrl}/api/chat-sessions/${chatId}`, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });

  return {
    id: response.data.data.id,
    sessionName: response.data.data.attributes.sessionName,
    createdAt: response.data.data.attributes.createdAt,
    updatedAt: response.data.data.attributes.updatedAt,
  };
};


export const createNewChatSessionAPI = async (sessionName: string, userId: string, jwtToken: string) => {
  const response = await axios.post(
    `${apiBaseUrl}/api/chat-sessions`,
    {
      data: {
        sessionName,
        user: userId,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
  );

  const { data } = response.data;
  return {
    id: data.id,
    sessionName: data.attributes.sessionName,
    createdAt: data.attributes.createdAt,
    updatedAt: data.attributes.updatedAt,
  };
};

export const deleteChatSessionAPI = async (chatId: string, jwtToken: string) => {
  const response = await axios.delete(`${apiBaseUrl}/api/chat-sessions/${chatId}`, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });

  return response.status === 200;
};
