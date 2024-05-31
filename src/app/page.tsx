'use client';
import { FcGoogle } from 'react-icons/fc';
import { AuthContextGlobal } from '@/providers/auth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '../lib/axios';
import { useGoogleLogin } from '@react-oauth/google';
import { createCookies } from '@/helpers/cookies';

export default function Page() {
  const router = useRouter();
  const { token, setToken } = AuthContextGlobal();

  const getMe = async () => {
    if (token) {
      try {
        const response = await api.get('/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.user.sub) {
          setToken(response.data.user.avatarUrl);
          router.replace('/my-pools');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await api.post('/users', {
          access_token: tokenResponse.access_token,
        });
        createCookies('token', response.data.token);

        router.replace('/create-pool');
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    getMe();
  }, []);

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-center mb-4">PROJECT ᚡ</h1>
      <button
        className="flex h-10 w-48 items-center rounded shadow-md"
        onClick={() => {
          login();
        }}
      >
        <div className="mx-1">
          <FcGoogle size={30} />
        </div>
        <p className="text-sm">Login com o google</p>
      </button>
    </main>
  );
}
