import { Pool } from '@/entities/pool';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter, usePathname } from 'next/navigation';

dayjs.extend(relativeTime);
dayjs.locale('pt-br');
dayjs.extend(utc);

export default function PoolCard(pool: Pool) {
  const router = useRouter();
  const path = usePathname();

  return (
    <div
      onClick={() => {
        router.push(`${path}/${pool.id}`);
      }}
      className="flex flex-col w-96 h-36 bg-green-200 rounded-lg cursor-pointer hover:bg-green-300"
    >
      <div className="flex flex-1 justify-between mx-1">
        <p>{pool.name}</p>
        <p>{pool.league ? pool.league : 'Sem liga'}</p>
      </div>
      <div className="flex flex-1 justify-between mx-1">
        <p className="text-xs">{pool.owner.name}</p>
        <p className="text-xs">
          {dayjs(pool.startTime).format('DD/MM/YY hh:mm A')}
        </p>
      </div>
      <div className="flex flex-1 justify-between mx-1">
        <p>{pool.mode === 'normal' ? 'Público' : 'Privado'}</p>
        <p>{pool.mode === 'custom' ? pool.code : ''}</p>
      </div>
    </div>
  );
}
