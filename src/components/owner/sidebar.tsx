'use client';
import { SideBarContextGlobal } from '@/providers/siderbar';
import { SideBarContent } from './sidebar-content';

export const SideBar = () => {
  const { showSideBar } = SideBarContextGlobal();

  return (
    <>
      {showSideBar ? <SideBarContent visible /> : <></>}
      <SideBarContent />
    </>
  );
};
