"use client"

import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { LogOut, MessageSquarePlus } from 'lucide-react'
import { BiSolidMessageSquareAdd } from 'react-icons/bi'
import Header from './Header'
import ChatItem from './ChatItem'
import axios from 'axios'
import { toast } from 'sonner'

const sessions = [
  {
    avatarUrl: 'https://via.placeholder.com/50',
    sessionName: 'Chat with Alice',
    lastMessage: 'Hey, are you free tomorrow?',
    time: '12:34 PM'
  },
  {
    avatarUrl: 'https://via.placeholder.com/50',
    sessionName: 'Chat with Bob',
    lastMessage: 'Got the report, thanks!',
    time: '10:20 AM'
  },
];

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function ChatList() {
  const [chats, setChats] = useState(sessions);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(apiBaseUrl + '/api/chatsessions');
        setChats(response.data);

      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    // fetchChats();
  }, []);

  const createNewChat = async (chatData: string) => {
    try {
      const response = await axios.post(apiBaseUrl!, { name: chatData });
      setChats([...chats, response.data]);
      toast.success('Chat created successfully!');
    } catch (error) {
      console.error('Error creating chat:', error);
      toast.error('Error creating chat');
    }
  };

  const deleteChat = async (chatId: string) => {
    try {
      await axios.delete(`${apiBaseUrl}/${chatId}`);
      // setChats(chats.filter((chat) => chat?.id && chat.id !== chatId));
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };
  return (
    <div className="w-full sm:w-1/4 sm:min-w-72 lg:min-w-96 bg-gray-100 h-screen p-4 flex flex-col">
      <Header
        onCreateNewChat={createNewChat}
      />
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat, index) => (
          <ChatItem
            key={index}
            avatarUrl={chat.avatarUrl}
            sessionName={chat.sessionName}
            lastMessage={chat.lastMessage}
            time={chat.time}
            onDelete={() => deleteChat(chat.id)}
          />
        ))}
      </div>
    </div>
  )
}
