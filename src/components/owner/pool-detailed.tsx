import { Pool } from '@/entities/pool';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

dayjs.extend(relativeTime);
dayjs.locale('pt-br');
dayjs.extend(utc);

export default function PoolDetailed(pool: Pool) {
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    console.log(pool.code);
  }, [pool]);

  return (
    <div className="flex flex-col w-full h-auto bg-green-200 rounded-lg cursor-pointer hover:bg-green-300">
      <div className="flex h-14 justify-between mx-1">
        <p>{pool.name}</p>
        <p>{pool.league ? pool.league : 'Sem liga'}</p>
      </div>
      <div className="flex h-14 justify-between mx-1">
        <p className="text-xs">{pool.owner?.name}</p>
        <p className="text-xs">
          {dayjs(pool.startTime).format('DD/MM/YY hh:mm A')}
        </p>
      </div>
      <div className="flex h-14 justify-between mx-1">
        <p>{`${pool.gamesClosed}/${pool.nGames}`}</p>
      </div>
    </div>
  );
}
