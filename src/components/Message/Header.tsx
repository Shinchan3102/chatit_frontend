import { FaUserCircle, FaEllipsisV, FaPaperPlane } from 'react-icons/fa';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

export default function Header({ sessionName, creationDate, avatarUrl }: { sessionName: string, creationDate: string, avatarUrl?: string }) {
  return (
    <div className="flex items-center p-4 border-b border-gray-50 bg-white">
      <div className="flex items-center flex-1">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className="ml-4">
          <div className="font-medium text-gray-900">{sessionName}</div>
          <div className="text-sm text-gray-500">Created on {creationDate}</div>
        </div>
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className='border-0 bg-transparent p-0 hover:bg-transparent'><FaEllipsisV className="text-gray-500 hover:text-gray-700" /></Button>

        </PopoverTrigger>
        <PopoverContent className="w-fit p-0">
          <Button variant="outline" className="text-red-500 border-0">
            Delete
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  )
}
