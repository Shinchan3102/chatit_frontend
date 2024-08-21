'use client';

import { useEffect, useState, FormEvent, useRef } from 'react';
import Header from '@/components/Message/Header';
import SentBox from '@/components/Message/SentBox';
import { useUserStore } from '@/store/useUserStore';
import { fetchChatSessionByIdAPI } from '@/utils/chatSession';
import { createNewMessageApi, fetchChatSessionMessagesAPI } from '@/utils/message';
import { useRouter } from 'next/navigation';
import { ChatSession } from '@/store/useChatSessionStore';

export type Message = {
  id: string;
  user: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export default function Chat({ params }: { params: { id: string } }) {
  const [sessionInfo, setSessionInfo] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const { userInfos, fetchUserDetails } = useUserStore();
  const router = useRouter();
  const [ws, setWs] = useState<WebSocket | null>(null);
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!params.id) return router.push('/home');
    fetchUserDetails(router);
  }, [params.id, router, fetchUserDetails]);

  useEffect(() => {
    if (userInfos?.id && userInfos?.jwtToken) {
      fetchSessionDetails();
      fetchMessages();
      setupWebSocket();
    }
  }, [userInfos?.id, userInfos?.jwtToken]);

  const fetchSessionDetails = async () => {
    try {
      if (!userInfos?.jwtToken) return;
      const response = await fetchChatSessionByIdAPI(params.id, userInfos.jwtToken);
      setSessionInfo(response);
    } catch (error) {
      console.error('Error fetching session details:', error);
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

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (!newMessage.trim() || !userInfos?.jwtToken) return;

      const newMessageData: Message = await createNewMessageApi(newMessage, params.id, userInfos.jwtToken, 'YOU');
      setMessages([...messages, newMessageData]);

      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(newMessage);
      } else {
        console.error('WebSocket is not open.');
      }
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const setupWebSocket = () => {
    if (ws) {
      ws.close();
    }

    const socket = new WebSocket('ws://localhost:1337');

    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
      const message = event.data;
      if (userInfos)
        createNewMessageApi(message, params.id, userInfos?.jwtToken, 'SERVER');
      setMessages((prevMessages) => [...prevMessages, {
        id: Date.now().toString(),
        user: 'Server',
        content: message,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }]);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setWs(socket);
  };

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
            <div ref={endOfMessagesRef} />
          </div>
        </div>
        <SentBox
          handleSendMessage={handleSendMessage}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
        />
      </div>
    </div>
  );
}
