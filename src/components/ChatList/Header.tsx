import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { LogOut, MessageSquarePlus } from 'lucide-react'
import { BiSolidMessageSquareAdd } from 'react-icons/bi'
import CreateNewSession from '../forms/CreateNewSession'
import SearchInput from '../forms/components/SearchInput'
import { useRouter } from 'next/navigation'
import { clearAuthCookies } from '@/utils/cookie'

interface HeaderProps {
  onCreateNewChat: (data: string) => void;
}

export default function Header({ onCreateNewChat }: HeaderProps) {
  const router = useRouter();

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
  };

  const handleCreateNewSession = () => {
    const newChatData = {
      avatarUrl: 'https://via.placeholder.com/50',
      sessionName: `New Chat ${Date.now()}`,
      lastMessage: 'This is a new session',
      time: new Date().toLocaleTimeString(),
    };
    onCreateNewChat("new session");
  };

  const handleLogout = () => {
    clearAuthCookies();
    router.push('/sign-in');
  };
  return (
    <div>
      <div className='flex justify-between gap-6 items-center mb-4'>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className="flex justify-end text-gray-600 text-sm cursor-pointer" onClick={handleLogout}>
          <LogOut size={22} />
        </div>
      </div>
      <div className='flex gap-4 items-center mb-4'>
        <SearchInput onSearch={handleSearch} />
        <CreateNewSession onSubmit={handleCreateNewSession} />
      </div>
    </div>
  )
}
