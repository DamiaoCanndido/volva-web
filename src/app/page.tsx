'use client';
import { FcGoogle } from 'react-icons/fc';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '../lib/axios';
import { useGoogleLogin } from '@react-oauth/google';
import { createCookies } from '@/helpers/cookies';
import { AuthContextGlobal } from '@/providers/auth';
import { User } from '@/entities/user';

export default function Page() {
  const router = useRouter();
  const { token, setToken, setUser } = AuthContextGlobal();

  const getMe = async () => {
    if (token) {
      try {
        const response = await api.get('/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.user.sub) {
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
        const getUser = await api.get('/me', {
          headers: { Authorization: `Bearer ${response.data.token}` },
        });

        const { name, avatarUrl }: User = getUser.data.user;
        localStorage.setItem('user-data', JSON.stringify({ name, avatarUrl }));
        setToken(response.data.token);
        setUser({ name, avatarUrl });
        router.replace('/my-pools');
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
