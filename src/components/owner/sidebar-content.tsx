'use client';
import { LuLogOut, LuBookMarked, LuUser2 } from 'react-icons/lu';
import Link from 'next/link';
import { ComponentProps, useEffect, useRef, useState } from 'react';
import { SideBarContextGlobal } from '@/providers/siderbar';
import { deleteCookie } from 'cookies-next';

interface IconButtonProps extends ComponentProps<'aside'> {
  visible?: boolean;
}

export const SideBarContent = ({ visible, ...props }: IconButtonProps) => {
  const { showSideBar, setShowSideBar } = SideBarContextGlobal();

  const [sideBarTab, setSideBarTab] = useState('');

  const sideBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showSideBar &&
        sideBarRef.current &&
        !sideBarRef.current.contains(event.target as Node)
      ) {
        setShowSideBar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <aside
        ref={sideBarRef}
        {...props}
        className={
          visible
            ? 'border-r bg-green-50 border-gray-200 bottom-0 fixed z-10 top-16 text-xs text-green-900 h-screen overflow-y-auto text-center w-48'
            : 'border-r bg-green-50 border-gray-200 bottom-0 fixed z-10 top-16 text-xs text-green-900 h-screen overflow-y-auto text-center w-48 max-lg:hidden'
        }
      >
        <div className="h-full overflow-y-auto">
          <Link
            href="/my-pools"
            replace
            className={
              sideBarTab === 'my-pools'
                ? 'flex cursor-pointer border-b border-grey-200 pr-8 py-2 hover:bg-green-100 items-center bg-green-300'
                : 'flex cursor-pointer border-b border-grey-200 pr-8 py-2 hover:bg-green-100 items-center'
            }
            onClick={() => {
              setShowSideBar(false);
              setSideBarTab('my-pools');
            }}
          >
            <LuBookMarked size={30} />
            <span className="px-1 text-sm">Meus bolões</span>
          </Link>
          <Link
            href="/pools"
            replace
            className={
              sideBarTab === 'pools'
                ? 'flex cursor-pointer border-b border-grey-200 pr-8 py-2 hover:bg-green-100 items-center bg-green-300'
                : 'flex cursor-pointer border-b border-grey-200 pr-8 py-2 hover:bg-green-100 items-center'
            }
            onClick={() => {
              setShowSideBar(false);
              setSideBarTab('pools');
            }}
          >
            <LuBookMarked size={30} />
            <span className="px-1 text-sm">Entre nos bolões</span>
          </Link>
          <Link
            href="/create-pool"
            replace
            className={
              sideBarTab === 'create-pool'
                ? 'flex cursor-pointer border-b border-grey-200 pr-8 py-2 hover:bg-green-100 items-center bg-green-300'
                : 'flex cursor-pointer border-b border-grey-200 pr-8 py-2 hover:bg-green-100 items-center'
            }
            onClick={() => {
              setShowSideBar(false);
              setSideBarTab('create-pool');
            }}
          >
            <LuBookMarked size={30} />
            <span className="px-1 text-sm">Criar bolão</span>
          </Link>
          <Link
            href="/"
            replace
            className="flex cursor-pointer border-b border-grey-200 pr-8 py-2 hover:bg-red-200 items-center text-red-600"
            onClick={() => {
              deleteCookie('token');
            }}
          >
            <LuLogOut size={30} />
            <span className="px-1 text-sm">Sair</span>
          </Link>
        </div>
      </aside>
    </>
  );
};
