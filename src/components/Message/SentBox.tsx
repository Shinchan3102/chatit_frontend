'use client';
import { FaPaperPlane } from 'react-icons/fa';

export default function SentBox({ newMessage, setNewMessage, handleSendMessage }: { newMessage: string, setNewMessage: Function, handleSendMessage: (e: any) => void }) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(e);
  };

  return (
    <div className="p-4 bg-white border-t border-gray-200">
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="ml-2 p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
        >
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
}
