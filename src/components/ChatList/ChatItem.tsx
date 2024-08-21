import React from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ChatListProps {
  avatarUrl?: string;
  sessionName: string;
  lastMessage: string;
  time: string;
  onDelete?: () => void;
}

const ChatItem: React.FC<ChatListProps> = ({
  avatarUrl,
  sessionName,
  lastMessage,
  time,
  onDelete,
}) => {
  return (
    <div className="flex items-center p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer">
      {/* Avatar */}
      <Avatar>
        <AvatarImage src={avatarUrl || "https://github.com/shadcn.png"} />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>

      <div className="ml-4 flex-1 min-w-0">
        <div className="flex justify-between items-center gap-3">
          {/* Session Name */}
          <span className="font-medium text-gray-900 truncate">
            {sessionName}
          </span>
          {/* Time */}
          <span className="text-sm text-gray-500 flex-shrink-0 whitespace-nowrap">
            {time}
          </span>
        </div>
        {/* Last Message */}
        <p className="text-gray-700 text-sm truncate">{lastMessage}</p>
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
          <Button variant="outline" className="text-red-500 border-0" onClick={onDelete}>
            Delete
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ChatItem;
