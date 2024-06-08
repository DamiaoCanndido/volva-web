'use client';
import { GuessCard } from '@/components/owner/guess-card';
import { Game } from '@/entities/game';
import { Guess } from '@/entities/guess';
import { api } from '@/lib/axios';
import { AuthContextGlobal } from '@/providers/auth';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Props {
  params: { poolId: string; gameId: string };
}

export default function Page({ params }: Props) {
  const { token } = AuthContextGlobal();
  const [game, setGame] = useState<Game>();
  const [guess, setGuess] = useState<Guess | null>(null);

  useEffect(() => {
    const getGame = async () => {
      const gamesResult = await axios({
        method: 'GET',
        url: `${String(process.env.NEXT_PUBLIC_FOOT_API_URL)}/match/${
          params.gameId
        }`,
      });
      setGame(gamesResult.data);
    };

    const getMyGuess = async () => {
      const guessResult = await api.get(
        `/pool/${params.poolId}/game/${params.gameId}/myguess`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGuess(guessResult.data.guess);
      console.log(`${JSON.stringify(guessResult.data.guess)}`);
    };

    getGame();
    getMyGuess();
  }, []);
  return (
    <main className="flex flex-col space-y-2 items-center w-[600px] h-full p-2 border rounded-lg mx-auto max-lg:ml-auto border-green-600 mt-[72px]">
      <GuessCard game={game!} guess={guess} poolId={params.poolId} />
    </main>
  );
}
