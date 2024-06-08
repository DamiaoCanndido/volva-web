'use client';
import { Game } from '@/entities/game';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Guess } from '@/entities/guess';
import { api } from '@/lib/axios';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { AuthContextGlobal } from '@/providers/auth';

interface Props {
  poolId: string;
  game: Game;
  guess: Guess | null;
}

const formSchema = z.object({
  homeScore: z.coerce
    .number({ message: 'Sem placar' })
    .min(0, { message: 'Muito pequeno.' })
    .max(30, { message: 'Muito grande.' }),
  awayScore: z.coerce
    .number({ message: 'Sem placar' })
    .min(0, { message: 'Muito pequeno.' })
    .max(30, { message: 'Muito grande.' }),
});

export const GuessCard = ({ game, guess, poolId }: Props) => {
  const { token } = AuthContextGlobal();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      homeScore: 0,
      awayScore: 0,
    },
  });

  async function onSubmit({
    homeScore,
    awayScore,
  }: z.infer<typeof formSchema>) {
    console.log(token);
    try {
      await api.post(
        `/pool/${poolId}/game/${game.id}/guess`,
        { homeScore, awayScore },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: 'Palpite criado.',
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
    } catch (error) {
      toast({
        title: 'Erro na criação do palpite.',
        variant: 'destructive',
        action: <ToastAction altText="fechar">fechar</ToastAction>,
      });
    }
  }

  return (
    <main className="flex items-center h-36 w-full rounded-lg shadow-md justify-between">
      <Form {...form}>
        <form className="flex" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex">
            <FormField
              control={form.control}
              name="homeScore"
              render={({ field }) => (
                <FormItem>
                  <FormLabel id="homeScore">{game?.home.name}</FormLabel>
                  <FormControl>
                    <Input
                      className="w-16 mx-1"
                      placeholder="Gols"
                      type="number"
                      {...field}
                      required
                      disabled={guess === null ? false : true}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="awayScore"
              render={({ field }) => (
                <FormItem>
                  <FormLabel id="awayScore">{game?.away.name}</FormLabel>
                  <FormControl>
                    <Input
                      className="w-16 mx-1"
                      placeholder="Gols"
                      type="number"
                      {...field}
                      required
                      disabled={guess === null ? false : true}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {guess === null ? (
            ''
          ) : (
            <p>
              {guess?.homeScore}:{guess?.awayScore}
            </p>
          )}
          <div className="flex justify-end items-center w-[400px]">
            <Button
              className="mt-2 w-48 rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              type="submit"
              disabled={guess === null ? false : true}
            >
              PALPITAR
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
};
