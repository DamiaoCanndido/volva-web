import { Pool } from '@/entities/pool';

export default function PoolCard({ name, mode, owner, startTime }: Pool) {
  return (
    <div className="flex flex-col w-96 h-28 bg-green-200 rounded-lg">
      <div className="flex flex-1 justify-between mx-1">
        <p>{name}</p>
        <p>{mode}</p>
      </div>
      <div className="flex flex-1 justify-between mx-1">
        <p className="text-xs">{owner.name}</p>
        <p className="text-xs">{startTime}</p>
      </div>
    </div>
  );
}
