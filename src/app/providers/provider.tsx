import { GoogleProvider } from '@/app/providers/google-provider';
import { AuthContextProvider } from '@/app/providers/auth';
import { SideBarContextProvider } from './siderbar';

export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GoogleProvider>
      <SideBarContextProvider>
        <AuthContextProvider>{children}</AuthContextProvider>
      </SideBarContextProvider>
    </GoogleProvider>
  );
}
