import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Rank } from '@/entities/rank';

interface Props {
  rank: Rank;
  position: number;
}

export const RankCard = (props: Props) => {
  return (
    <main className="flex space-x-2 items-center h-16 w-full rounded-lg shadow-md">
      <Avatar className="ml-2 min-w-4">
        <AvatarImage src={props.rank.user.avatarUrl} alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="min-w-36">
        <p>{props.rank.user.name}</p>
        <p className="text-xs">{props.rank.points} pontos</p>
      </div>
      <div className="flex w-full justify-end">
        <div className="bg-green-100 size-12 rounded-full flex justify-center items-center mr-2">
          <p>{`${props.position + 1}°`}</p>
        </div>
      </div>
    </main>
  );
};
