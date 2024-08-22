import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut } from 'lucide-react'
import CreateNewSession from '../forms/CreateNewSession'
import SearchInput from '../forms/components/SearchInput'
import { useRouter } from 'next/navigation'
import { clearAuthCookies } from '@/utils/cookie'
import { useChatSessionStore } from '@/store/useChatSessionStore'

export default function Header() {
  const router = useRouter();

  const { filterChatSessions } = useChatSessionStore();

  const handleSearch = (query: string) => {
    filterChatSessions(query);
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
        <CreateNewSession />
      </div>
    </div>
  )
}
