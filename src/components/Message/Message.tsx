"use client"

import React, { useState } from 'react';
import SentBox from './SentBox';
import Header from './Header';

interface Message {
  user: string;
  content: string;
  timestamp: string;
}

interface MessageComponentProps {
  avatarUrl?: string;
  sessionName: string;
  creationDate: string;
  messages: Message[];
}

const Message: React.FC<MessageComponentProps> = ({ avatarUrl, sessionName, creationDate, messages }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    // Implement message sending logic here
    console.log('Message sent:', newMessage);
    setNewMessage(''); // Clear the input field
  };

  return (
    <div className="flex flex-col h-screen w-full">
      {/* Header */}
      
      <Header
        avatarUrl={avatarUrl}
        sessionName={sessionName}
        creationDate={creationDate}
      />
      {/* Chat List */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="space-y-4">
          {messages?.map((message, index) => (
            <div key={index} className={`flex ${message.user === 'You' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs shadow-sm p-2 rounded-lg ${message.user === 'You' ? 'bg-blue-500 text-white' : 'bg-white text-gray-900'}`}>
                <div>{message.content}</div>
                <div className={`text-xs ${message.user === 'You' ? 'text-gray-50' : 'text-gray-400'} text-right`}>{message.timestamp}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Input Box */}
      <SentBox
        handleSendMessage={handleSendMessage}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
       />
    </div>
  );
};

export default Message;
