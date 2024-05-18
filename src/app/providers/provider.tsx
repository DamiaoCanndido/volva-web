import { NextAuthProvider } from '@/app/providers/next-auth';
import { AuthContextProvider } from '@/app/providers/auth';

export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NextAuthProvider>
      <AuthContextProvider>{children}</AuthContextProvider>
    </NextAuthProvider>
  );
}
