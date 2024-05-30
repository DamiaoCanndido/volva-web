import { Header } from '@/app/components/header';
import { SideBar } from '../components/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      {children}
      <Header />
      <SideBar />
    </div>
  );
}
