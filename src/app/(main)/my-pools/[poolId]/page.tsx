'use client';

export default function PoolDetail({ params }: { params: { poolId: string } }) {
  return (
    <main className="flex flex-col space-y-2 items-center w-[600px] h-full p-2 border rounded-lg mx-auto max-lg:ml-auto border-green-600 mt-[72px]">
      <h1>{params.poolId}</h1>
    </main>
  );
}
