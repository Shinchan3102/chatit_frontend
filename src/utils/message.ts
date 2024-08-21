
import axios from 'axios';

const apiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;

export const fetchChatSessionMessagesAPI = async (sessionId: string, jwtToken: string) => {
  const response = await axios.get(`${apiBaseUrl}/api/messages?filters[chat_session]=${sessionId}`, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });

  return response.data.data.map((chat: any) => ({
    id: chat.id,
    content: chat.attributes.content,
    createdAt: chat.attributes.createdAt,
    updatedAt: chat.attributes.updatedAt,
    user: chat.attributes?.user || 'YOU',
  }));
};


export const createNewMessageApi = async (content: string, sessionId: string, jwtToken: string) => {
  const response = await axios.post(
    `${apiBaseUrl}/api/messages`,
    {
      data: {
        content,
        chat_session: sessionId,
        user: 'YOU',
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
    content: data.attributes.content,
    createdAt: data.attributes.createdAt,
    updatedAt: data.attributes.updatedAt,
    user: data.attributes?.user || 'YOU',
  };
};
