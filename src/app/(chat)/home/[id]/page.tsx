import Message from '@/components/Message/Message'
import React from 'react'

export default function page() {
  return (
    <div className='w-full'>
      <Message
        creationDate='2021-09-01T12:00:00Z'
        messages={[
          {
            user: 'John Doe',
            content: 'Hello, how are you?',
            timestamp: '2021-09-01T12:00:00Z',
          },
          {
            user: 'You',
            content: 'I am fine, thank you!',
            timestamp: '2021-09-01T12:01:00Z',
          },
          {
            user: 'John Doe',
            content: 'How can I help you today?',
            timestamp: '2021-09-01T12:02:00Z',
          },
        ]
        }
        sessionName='Support Chat'
      />
    </div>
  )
}
