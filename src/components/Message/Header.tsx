import { FaEllipsisV } from 'react-icons/fa';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { useChatSessionStore } from '@/store/useChatSessionStore';
import { useParams, useRouter } from 'next/navigation';
import { GoArrowLeft } from "react-icons/go";
import Link from 'next/link';

export default function Header({ sessionName, creationDate, id }: { sessionName: string, creationDate: string, id: string }) {
  const { deleteChatSession } = useChatSessionStore();
  const router = useRouter();

  const { id: sessionId } = useParams();

  return (
    <div className="flex items-center p-4 border-b border-gray-50 shadow-md bg-white">
      <div className="flex items-center flex-1">
        <Link href={'/home'} className='mr-2 sm:hidden'>
          <GoArrowLeft />
        </Link>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className="ml-4">
          <div className="font-medium text-gray-900">{sessionName}</div>
          <div className="text-sm text-gray-500">Created on {new Date(creationDate).toLocaleDateString()}</div>
        </div>
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className='border-0 bg-transparent p-0 hover:bg-transparent'>
            <FaEllipsisV className="text-gray-500 hover:text-gray-700" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-fit p-0">
          <Button onClick={() => deleteChatSession(id, router, sessionId == id)} variant="outline" className="text-red-500 border-0">
            Delete
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  )
}
