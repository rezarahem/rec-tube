import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Prisma from '@/libs/prisma';
import { getServerSession } from 'next-auth';
import UserRecordCard from './UserRecordCard';

export default async function GetUserRecords() {
  const seesion = await getServerSession(authOptions);

  const records = await Prisma.record.findMany({
    where: {
      userId: seesion?.user.usreId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (records.length < 1) return;

  return (
    <div className='w-full bg-zinc-200 p-3 rounded-xl h-96 overflow-y-auto'>
      <div className='flex flex-col gap-y-5'>
        {records.map((record) => (
          <UserRecordCard key={record.id} {...record} />
        ))}
      </div>
    </div>
  );
}
