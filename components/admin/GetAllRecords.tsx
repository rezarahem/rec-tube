import Prisma from '@/libs/prisma';
import AdminRecordCard from './AdminRecordCard';

export default async function GetAllRecords() {
  const records = await Prisma.record.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (records.length < 1) return;

  return (
    <div className='w-full bg-zinc-200 p-3 rounded-xl h-96 overflow-y-auto'>
      <div className='flex flex-col gap-y-5'>
        {records.map((record) => (
          <AdminRecordCard key={record.id} {...record} />
        ))}
      </div>
    </div>
  );
}
