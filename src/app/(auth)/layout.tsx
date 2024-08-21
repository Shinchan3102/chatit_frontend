import Image from "next/image";
import chatit_svg from '@/assets/chatit.svg';

interface AuthLayoutProps {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="grid md:grid-cols-2 justify-center items-center min-h-screen bg-gray-100 px-6">
      <div className="relative hidden md:flex justify-center">
        <Image
          src={chatit_svg}
          alt="ChatIt Logo"
          width={300}
          height={100}
        />
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
