'use client';
import PoolCard from '@/components/owner/pool-card';
import { Pool } from '@/entities/pool';
import axios, { AxiosError } from 'axios';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AuthContextGlobal } from '@/providers/auth';

export default function Page() {
  const { token } = AuthContextGlobal();
  const router = useRouter();

  const [pools, setPools] = useState<Pool[]>([]);

  useEffect(() => {
    try {
      const getMyPools = async () => {
        const result = await axios({
          method: 'GET',
          url: `${process.env.NEXT_PUBLIC_API_URL}/pools/my`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPools(result.data.pools);
      };
      getMyPools();
    } catch (error) {
      if (error instanceof AxiosError) {
        deleteCookie('token');
        router.replace('/');
      }
    }
  }, []);

  return (
    <main className="flex flex-col space-y-2 items-center w-[600px] h-full p-2 border rounded-lg mx-auto max-lg:ml-auto border-green-600 mt-[72px]">
      <h1 className="font-bold">Meus bolões</h1>
      {pools.map((e) => {
        return (
          <PoolCard
            key={e.id}
            name={e.name}
            startTime={e.startTime}
            mode={e.mode}
            owner={e.owner}
          />
        );
      })}
    </main>
  );
}
