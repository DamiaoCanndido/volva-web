'use client';
import PoolCard from '@/components/owner/pool-card';
import { Pool } from '@/entities/pool';
import axios, { AxiosError } from 'axios';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AuthContextGlobal } from '@/providers/auth';
import { api } from '@/lib/axios';

export default function Page() {
  const { token, setToken, setUser } = AuthContextGlobal();
  const router = useRouter();

  const [pools, setPools] = useState<Pool[]>([]);

  useEffect(() => {
    try {
      const getMyPools = async () => {
        const result = await api.get('/pools/my', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPools(result.data.pools);
      };
      getMyPools();
    } catch (error) {
      if (error instanceof AxiosError) {
        setToken(undefined);
        deleteCookie('token');
        setUser(undefined);
        localStorage.removeItem('user-data');
        router.replace('/');
      }
    }
  }, []);

  return (
    <main className="flex flex-col space-y-2 items-center w-[600px] h-full p-2 border rounded-lg mx-auto max-lg:ml-auto border-green-600 mt-[72px]">
      <h1 className="font-bold">Meus bolões</h1>
      {pools.map((pool) => {
        return <PoolCard key={pool.id} {...pool} />;
      })}
    </main>
  );
}
