'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { api } from '@/lib/axios';
import { useEffect, useState } from 'react';
import { AuthContextGlobal } from '@/providers/auth';
import { Pool } from '@/entities/pool';
import { GameCard } from '@/components/owner/game-card';
import { Game } from '@/entities/game';
import axios from 'axios';

export default function Page({ params }: { params: { poolId: string } }) {
  const { token } = AuthContextGlobal();
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const getPool = async () => {
      const result = await api.get(`/pools/${params.poolId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return result.data.pool as Pool;
    };
    const getGames = async () => {
      const poolRes = await getPool();
      let ids = '';
      poolRes?.games.map((e) => {
        return (ids += String(`-${e}`));
      });

      const result = await axios({
        method: 'GET',
        url: `${String(
          process.env.NEXT_PUBLIC_FOOT_API_URL
        )}/match/multi/${ids.substring(1)}`,
      });
      setGames(result.data);
    };
    getGames();
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
        <TabsContent value="games">
          {games.map((e) => {
            return <GameCard key={e.id} {...e} />;
          })}
        </TabsContent>
        <TabsContent value="rank">Tabela</TabsContent>
      </Tabs>
    </main>
  );
}
