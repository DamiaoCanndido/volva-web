'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

export default function Component() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        {session.user?.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button
        className="flex h-10 w-48 items-center rounded shadow-md"
        onClick={() => signIn('google')}
      >
        <div className="mx-1">
          <FcGoogle size={30} />
        </div>
        <p className="text-sm">Login com o google</p>
      </button>
    </>
  );
}
