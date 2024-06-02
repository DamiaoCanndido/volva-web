import { Pool } from '@/entities/pool';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/navigation';

dayjs.extend(relativeTime);
dayjs.locale('pt-br');
dayjs.extend(utc);

export default function PoolCard(pool: Pool) {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.replace(`/my-pools/${pool.id}`);
      }}
      className="flex flex-col w-96 h-28 bg-green-200 rounded-lg cursor-pointer hover:bg-green-300"
    >
      <div className="flex flex-1 justify-between mx-1">
        <p>{pool.name}</p>
        <p>{pool.mode === 'normal' ? 'Público' : 'Privado'}</p>
      </div>
      <div className="flex flex-1 justify-between mx-1">
        <p className="text-xs">{pool.owner.name}</p>
        <p className="text-xs">
          {dayjs(pool.startTime).format('DD/MM/YY hh:mm A')}
        </p>
      </div>
    </div>
  );
}
