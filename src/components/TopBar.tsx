// src/components/TopBar.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
// import { Logo } from '@/components/ui/logo'; // Import your logo component if you have one

const TopBar: React.FC = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
      {/* <Logo className="text-xl font-bold" /> */}
      <div className='text-xl font-bold'>Logo</div>
      <Button variant="outline" className="text-blue-500">
        Logout
      </Button>
    </div>
  );
};

export default TopBar;
