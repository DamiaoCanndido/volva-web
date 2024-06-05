'use client';
import { AuthContextGlobal } from '@/providers/auth';
import { SideBarContextGlobal } from '@/providers/siderbar';
import Image from 'next/image';
import { useEffect } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const Header = () => {
  const { showSideBar, setShowSideBar } = SideBarContextGlobal();
  const { user } = AuthContextGlobal();

  useEffect(() => {
    setShowSideBar(false);
  }, []);

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };
  return (
    <nav className="bg-green-900 fixed flex mx-auto px-2 top-0 w-full h-16 items-center justify-between">
      <div
        className="lg:hidden px-1 text-white cursor-pointer"
        onClick={toggleSideBar}
      >
        {showSideBar ? (
          <AiOutlineClose size={30} />
        ) : (
          <AiOutlineMenu size={30} />
        )}
      </div>
      <h1 className="max-lg:hidden text-2xl font-bold text-center mb-4 text-white">
        PROJECT ᚡ
      </h1>
      <Avatar>
        <AvatarImage src={user?.avatarUrl} alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </nav>
  );
};
