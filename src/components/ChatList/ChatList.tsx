"use client"

import React, { useEffect } from 'react'
import Header from './Header'
import ChatItem from './ChatItem'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useChatSessionStore } from '@/store/useChatSessionStore'
import { useUserStore } from '@/store/useUserStore'


export default function ChatList() {
  const { chats, fetchChatSessions } = useChatSessionStore();
  const { fetchUserDetails, userInfos } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    fetchUserDetails(router);
  }, []);

  useEffect(() => {
    if (userInfos?.id && userInfos?.jwtToken)
      fetchChatSessions();
  }, [userInfos?.id, userInfos?.jwtToken]);

  return (
    <div className="w-full sm:w-1/4 sm:min-w-72 lg:min-w-96 bg-gray-100 h-screen p-4 flex flex-col">
      <Header />
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <Link href={`/home/${chat.id}`} key={chat.id}>
            <ChatItem
              sessionName={chat.sessionName}
              createdAt={chat.createdAt}
              updatedAt={chat.updatedAt}
              id={chat.id}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
