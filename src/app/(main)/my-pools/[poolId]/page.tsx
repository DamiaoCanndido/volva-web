'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { api } from '@/lib/axios';
import { useEffect, useState } from 'react';
import { AuthContextGlobal } from '@/providers/auth';
import { Pool } from '@/entities/pool';
import { GameCard } from '@/components/owner/game-card';

const match = {
  id: 8,
  fullTime: false,
  startDate: '2024-05-28T15:00:00.000Z',
  round: '1',
  leagueId: 6,
  homeId: 6,
  awayId: 7,
  homeScore: 2,
  awayScore: 1,
  homePenalty: null,
  awayPenalty: null,
  home: {
    id: 6,
    name: 'Atlético-MG',
    code: 'CAM',
    country: 'Brasil',
    type: 'club',
    logo: 'https://seeklogo.com/images/A/atletico-mg-logo-62B8B96E45-seeklogo.com.png',
  },
  away: {
    id: 7,
    name: 'Bahia',
    code: 'BAH',
    country: 'Brasil',
    type: 'club',
    logo: 'https://seeklogo.com/images/B/Bahia-logo-0BF5C9A502-seeklogo.com.png',
  },
  league: {
    name: 'Brasileirão Série A',
  },
};

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
        <TabsContent value="games">
          <GameCard {...match} />
        </TabsContent>
        <TabsContent value="rank">Tabela</TabsContent>
      </Tabs>
    </main>
  );
}
