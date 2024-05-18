'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { AuthContextGlobal } from '@/app/providers/auth';
import { useEffect, useState } from 'react';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { api } from './lib/axios';

export default function Page() {
  const router = useRouter();
  const { data: session } = useSession();
  const [login, setLogin] = useState(false);
  const { token, setToken } = AuthContextGlobal();

  useEffect(() => {
    const check = async () => {
      if (token) {
        try {
          const response = await api.get('/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.data.user.sub) {
            router.replace('/pool');
          }
        } catch (error) {
          console.log(error);
        }
      } else if (session) {
        try {
          const response = await api.post('/users', {
            access_token: session?.accessToken,
          });
          setCookie('token', response.data.token);
          setToken(response.data.token);
          router.replace('/pool');
        } catch (error) {
          console.log(error);
        }
      }
    };
    check();
  }, [login]);

  return (
    <main className="flex">
      <aside className="flex flex-1 items-center">
        <h1 className="mx-2 text-white-normal text-4xl font-bold leading-tight text-center">
          Jogue bolões competitivamente, ou com seus amigos!
        </h1>
      </aside>
      <section className="flex h-screen w-screen flex-1 items-center justify-center bg-slate-100">
        <button
          className="flex h-10 w-48 items-center rounded shadow-md"
          onClick={async () => {
            if (!session) {
              signIn('google');
            }
            setLogin(!login);
          }}
        >
          <div className="mx-1">
            <FcGoogle size={30} />
          </div>
          <p className="text-sm">Login com o google</p>
        </button>
      </section>
    </main>
  );
}
