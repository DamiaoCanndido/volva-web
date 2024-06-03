'use client';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { League } from '@/entities/league';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { AuthContextGlobal } from '@/providers/auth';
import { api } from '@/lib/axios';

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(6, { message: 'Nome deve conter no mínimo 6 caracteres.' })
    .max(50, { message: 'O Nome não pode exceder 50 caracteres.' }),
  mode: z.enum(['normal', 'custom'], { message: 'Modo não compatível.' }),
  nGames: z.coerce
    .number()
    .min(1, { message: 'Número muito pequeno.' })
    .max(16, { message: 'Número muito grande.' }),
  leagueId: z.optional(z.coerce.number()),
});

export default function Page() {
  const { token } = AuthContextGlobal();
  const [league, setLeague] = useState<League[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const leagues = async () => {
      const result = await axios({
        method: 'GET',
        url: `${String(process.env.NEXT_PUBLIC_FOOT_API_URL)}/league`,
      });
      setLeague(result.data);
    };
    leagues();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      mode: 'normal',
      nGames: 1,
      leagueId: undefined,
    },
  });

  async function onSubmit({
    name,
    mode,
    nGames,
    leagueId,
  }: z.infer<typeof formSchema>) {
    try {
      const result = await api.post(
        '/pools',
        {
          name,
          mode,
          nGames: Math.floor(nGames),
          leagueId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast({
        title:
          mode === 'custom'
            ? `${result.data.code}`
            : 'Bolão criado com sucesso.',
        style: {
          backgroundColor: 'green',
          borderColor: 'white',
        },
        variant: 'default',
        action: (
          <ToastAction
            color="white"
            onClick={() => {
              navigator.clipboard.writeText(result.data.code);
            }}
            altText="fechar"
          >
            {mode === 'custom' ? <p>Copiar</p> : <p>Fechar</p>}
          </ToastAction>
        ),
      });
      form.resetField('name');
    } catch (error) {
      toast({
        title: 'Erro na criação do bolão.',
        variant: 'destructive',
        action: <ToastAction altText="fechar">fechar</ToastAction>,
      });
    }
  }

  return (
    <main className="flex flex-col w-[600px] h-[600px] p-2 border rounded-lg mx-auto max-lg:ml-auto border-green-600 mt-[72px]">
      <h1 className="font-bold">Crie seu bolão.</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel id="name">Nome do bolão</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do bolão" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mode"
            render={({ field }) => (
              <FormItem>
                <FormLabel id="mode">Modo do bolão</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={'normal'}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o modo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="normal">PÚBLICO</SelectItem>
                    <SelectItem value="custom">PRIVADO</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nGames"
            render={({ field }) => (
              <FormItem>
                <FormLabel id="nGames">Número de jogos do bolão</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Número de jogos do bolão"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="leagueId"
            render={({ field }) => (
              <FormItem>
                <FormLabel id="leagueId">Liga do bolão</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={'0'}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o modo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="0">SEM LIGA</SelectItem>
                    {league.map((e) => {
                      return (
                        <SelectItem key={e.id} value={String(e.id)}>
                          {e.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <div className="flex w-full h-auto justify-end items-end">
            <Button
              className="flex w-48 justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              type="submit"
            >
              CRIAR
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
}
