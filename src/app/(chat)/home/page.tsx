import ChatList from '@/components/ChatList/ChatList'
import Hero from '@/components/Hero'
import Message from '@/components/Message/Message'
import React from 'react'

export default function page() {
  return (
    <div className='w-full'>
      <div className='hidden sm:block'>
        <Hero />
      </div>
      <div className='sm:hidden'>
        <ChatList />
      </div>
    </div>
  )
}
