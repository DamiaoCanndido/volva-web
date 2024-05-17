'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

export default function Page() {
  const { data: session } = useSession();

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
          onClick={() => signIn('google')}
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
