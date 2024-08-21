import ChatList from "@/components/ChatList/ChatList";

interface AuthLayoutProps {
  children: React.ReactNode;
};

const ChatLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex h-screen">
      <div className="hidden sm:block">
        <ChatList />
      </div>
      {children}
    </div>
  );
};

export default ChatLayout;
