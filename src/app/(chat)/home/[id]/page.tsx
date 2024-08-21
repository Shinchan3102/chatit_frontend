'use client'

import Header from '@/components/Message/Header';
import SentBox from '@/components/Message/SentBox';
import { ChatSession } from '@/store/useChatSessionStore';
import { useUserStore } from '@/store/useUserStore';
import { fetchChatSessionByIdAPI } from '@/utils/chatSession';
import { createNewMessageApi, fetchChatSessionMessagesAPI } from '@/utils/message';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export type Message = {
  id: string;
  user: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
export default function Chat({ params }: { params: { id: string } }) {
  const [sessionInfo, setSessionInfo] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const { userInfos, fetchUserDetails } = useUserStore();

  const router = useRouter();

  const fetchSessionDetails = async () => {
    try {
      if (!userInfos?.jwtToken) return;
      const response = await fetchChatSessionByIdAPI(params.id, userInfos.jwtToken);

      setSessionInfo(response);

    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      if (!userInfos?.jwtToken) return;
      const messages = await fetchChatSessionMessagesAPI(params.id, userInfos.jwtToken);
      setMessages(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = async (e: any) => {
    e.preventDefault();
    try {
      if (!newMessage || !newMessage.trim() || !userInfos?.jwtToken) return;

      const newMessageData: Message = await createNewMessageApi(newMessage, params.id, userInfos.jwtToken);
      setMessages([...messages, newMessageData]);

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    if (!params.id) return router.push('/home');
    fetchUserDetails(router);
  }, []);

  useEffect(() => {
    if (userInfos?.id && userInfos?.jwtToken) {
      fetchSessionDetails();
      fetchMessages();
    }
  }, [userInfos?.id, userInfos?.jwtToken]);

  return (
    <div className='w-full'>
      <div className="flex flex-col h-screen w-full">
        <Header
          sessionName={sessionInfo?.sessionName || ''}
          creationDate={sessionInfo?.createdAt || ''}
          id={sessionInfo?.id || ''}
        />
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message?.user === 'YOU' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs shadow-sm p-2 px-3 rounded-lg ${message?.user === 'YOU' ? 'bg-blue-500 text-white' : 'bg-white text-gray-900'}`}>
                  <div>{message.content}</div>
                  <div className={`text-xs ${message.user === 'YOU' ? 'text-gray-200' : 'text-gray-400'} text-right`}>{new Date(message.createdAt).toDateString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <SentBox
          handleSendMessage={handleSendMessage}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
        />
      </div>
    </div>
  )
}
