import { Pool } from '@/entities/pool';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '../ui/button';
import { api } from '@/lib/axios';
import { AuthContextGlobal } from '@/providers/auth';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';

dayjs.extend(relativeTime);
dayjs.locale('pt-br');
dayjs.extend(utc);

export default function PoolDetailed(pool: Pool) {
  const router = useRouter();
  const path = usePathname();
  const { toast } = useToast();

  const { token } = AuthContextGlobal();

  async function joinToNormal() {
    try {
      await api.post(
        `/pools/${pool.id}/normal`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: 'Entrou no bolão com sucesso.',
        style: {
          backgroundColor: 'green',
          borderColor: 'white',
        },
        variant: 'default',
        action: (
          <ToastAction color="white" altText="fechar">
            Fechar
          </ToastAction>
        ),
      });
      router.replace('/my-pools');
    } catch (error) {
      toast({
        title: 'Erro não é possível entrar nesse bolão.',
        variant: 'destructive',
        action: <ToastAction altText="fechar">fechar</ToastAction>,
      });
    }
  }

  return (
    <div className="flex flex-col w-full h-auto bg-green-200 rounded-lg">
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
        <Button
          onClick={joinToNormal}
          className="w-40 bg-green-600 hover:bg-green-400"
        >
          Entrar
        </Button>
      </div>
    </div>
  );
}
