'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { api } from '@/lib/axios';
import { useEffect, useState } from 'react';
import { AuthContextGlobal } from '@/providers/auth';
import { Pool } from '@/entities/pool';

export default function Page({ params }: { params: { poolId: string } }) {
  const { token } = AuthContextGlobal();
  const [pool, setPool] = useState<Pool>();

  useEffect(() => {
    const getPool = async () => {
      const result = await api.get(`/pools/${params.poolId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPool(result.data.pool);
    };
    getPool();
  }, []);

  return (
    <main className="flex flex-col space-y-2 items-center w-[600px] h-full p-2 border rounded-lg mx-auto max-lg:ml-auto border-green-600 mt-[72px]">
      <Tabs defaultValue="games" className="w-full">
        <TabsList className="bg-green-200 w-full">
          <TabsTrigger className="w-full" value="games">
            Jogos
          </TabsTrigger>
          <TabsTrigger className="w-full" value="rank">
            Tabela
          </TabsTrigger>
        </TabsList>
        <TabsContent value="games">Jogos</TabsContent>
        <TabsContent value="rank">Tabela</TabsContent>
      </Tabs>
    </main>
  );
}
