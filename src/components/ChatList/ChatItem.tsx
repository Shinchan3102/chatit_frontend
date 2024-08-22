import React from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useChatSessionStore } from '@/store/useChatSessionStore';
import { useParams, useRouter } from 'next/navigation';
import { formatDateOrTime } from '@/lib/utils';

interface ChatListProps {
  avatarUrl?: string;
  sessionName: string;
  updatedAt: string;
  createdAt: string;
  id: string;
}

const ChatItem: React.FC<ChatListProps> = ({
  sessionName,
  createdAt,
  updatedAt,
  id,
}) => {
  const { deleteChatSession } = useChatSessionStore();
  const router = useRouter();

  const { id: sessionId } = useParams();
  return (
    <div className="flex items-center p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer">
      <Avatar>
        <AvatarImage src={"https://github.com/shadcn.png"} />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>

      <div className="ml-4 flex-1 min-w-0">
        <div className="flex justify-between items-center gap-3">
          <span className="font-medium text-gray-900 truncate">
            {sessionName}
          </span>
          <span className="text-sm text-gray-500 flex-shrink-0 whitespace-nowrap">
            {formatDateOrTime(updatedAt)}
          </span>
        </div>
        <p className="text-gray-700 text-sm truncate">{''}</p>
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="border-0 bg-transparent p-0 hover:bg-transparent min-w-2 ml-2"
          >
            <FaEllipsisV className="text-gray-500 hover:text-gray-700" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-fit p-0">
          <Button variant="outline" className="text-red-500 border-0" onClick={() => deleteChatSession(id, router, sessionId == id)}>
            Delete
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ChatItem;
