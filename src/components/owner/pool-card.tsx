import { Pool } from '@/entities/pool';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.locale('pt-br');
dayjs.extend(utc);

export default function PoolCard({ name, mode, owner, startTime }: Pool) {
  return (
    <div className="flex flex-col w-96 h-28 bg-green-200 rounded-lg cursor-pointer hover:bg-green-300">
      <div className="flex flex-1 justify-between mx-1">
        <p>{name}</p>
        <p>{mode}</p>
      </div>
      <div className="flex flex-1 justify-between mx-1">
        <p className="text-xs">{owner.name}</p>
        <p className="text-xs">{dayjs(startTime).format('DD/MM/YY hh:mm A')}</p>
      </div>
    </div>
  );
}
