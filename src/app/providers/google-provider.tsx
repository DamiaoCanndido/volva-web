'use client';
import { GoogleOAuthProvider } from '@react-oauth/google';

type Props = {
  children?: React.ReactNode;
};

export const GoogleProvider = ({ children }: Props) => {
  return (
    <GoogleOAuthProvider
      clientId={String(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)}
    >
      {children}
    </GoogleOAuthProvider>
  );
};
