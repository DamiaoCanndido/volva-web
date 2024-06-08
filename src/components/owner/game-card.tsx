import { Game } from '@/entities/game';
import Image from 'next/image';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { useRouter, usePathname } from 'next/navigation';

export const GameCard = (game: Game) => {
  const router = useRouter();
  const path = usePathname();
  return (
    <main
      onClick={() => {
        router.push(`${path}/${game.id}`);
      }}
      className="flex flex-col h-36 w-full rounded-lg shadow-md cursor-pointer"
    >
      <div className="flex flex-1 justify-center items-center border-b-[1px] border-green-200">
        {game.leagueId
          ? `Rodada ${game.round} - ${game.league.name}`
          : 'Amistoso'}
      </div>
      <div className="flex flex-2 flex-row justify-center items-center border-b-[1px] border-green-200">
        <div className="flex flex-1 justify-end items-center">
          <p className="text-sm">{game.home.name}</p>
          <Image
            src={game.home.logo}
            height={40}
            width={40}
            alt={'home'}
            className="mx-1"
          />
          <h1 className="font-bold text-3xl">{game.homeScore}</h1>
        </div>
        <h1 className="font-bold text-3xl mx-1">:</h1>
        <div className="flex flex-1 justify-start items-center">
          <h1 className="font-bold text-3xl">{game.awayScore}</h1>
          <Image
            src={game.away.logo}
            height={40}
            width={40}
            alt={'away'}
            className="mx-1"
          />
          <p className="text-sm">{game.away.name}</p>
        </div>
      </div>
      <div className="flex justify-center items-center flex-1">
        {dayjs(game.startDate).format('DD/MM/YY hh:mm A')}
      </div>
    </main>
  );
};
