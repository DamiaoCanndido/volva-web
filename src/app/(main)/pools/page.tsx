'use client';
import PoolCard from '@/components/owner/pool-card';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Pool } from '@/entities/pool';
import axios, { AxiosError } from 'axios';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { AuthContextGlobal } from '@/providers/auth';

const formSchema = z.object({
  code: z.string().min(10, { message: 'Código errado.' }),
});

export default function Page() {
  const { token, setToken } = AuthContextGlobal();
  const router = useRouter();
  const { toast } = useToast();

  const [pools, setPools] = useState<Pool[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: '',
    },
  });

  async function onSubmit({ code }: z.infer<typeof formSchema>) {
    try {
      await axios({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_API_URL}/pools/custom`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          code,
        },
      });
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
      form.resetField('code');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          title: error.response?.data.error,
          variant: 'destructive',
          action: <ToastAction altText="fechar">fechar</ToastAction>,
        });
      }
    }
  }

  useEffect(() => {
    try {
      const getPools = async () => {
        const result = await axios({
          method: 'GET',
          url: `${process.env.NEXT_PUBLIC_API_URL}/pools/normal`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPools(result.data.pools);
      };
      getPools();
    } catch (error) {
      if (error instanceof AxiosError) {
        setToken(undefined);
        deleteCookie('token');
        router.replace('/');
      }
    }
  }, []);

  return (
    <main className="flex flex-col space-y-2 items-center w-[600px] h-full p-2 border rounded-lg mx-auto max-lg:ml-auto border-green-600 mt-[72px]">
      <h1 className="font-bold">Entre nos bolões</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel id="code">Entre em um bolão privado.</FormLabel>
                <FormControl>
                  <Input placeholder="Código do bolão" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="flex w-96 justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="submit"
          >
            ENTRAR
          </Button>
        </form>
      </Form>
      {pools.map((e) => {
        return (
          <PoolCard
            key={e.id}
            name={e.name}
            startTime={e.startTime}
            mode={e.mode}
            owner={e.owner}
          />
        );
      })}
    </main>
  );
}
