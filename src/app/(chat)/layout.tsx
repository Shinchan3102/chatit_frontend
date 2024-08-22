import ChatList from "@/components/ChatList/ChatList";

interface AuthLayoutProps {
  children: React.ReactNode;
};

const ChatLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex h-screen">
      <div className="hidden sm:contents w-fit">
        <ChatList />
      </div>
      {children}
    </div>
  );
};

export default ChatLayout;
