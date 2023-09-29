'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Prisma from '@/libs/prisma';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { FieldValues } from 'react-hook-form';

export async function CreateRecordAction(data: FieldValues) {
  const session = await getServerSession(authOptions);

  const { title, report } = data;

  await Prisma.record.create({
    data: {
      title,
      report,
      userName: session?.user.name as string,
      userId: session?.user.usreId as string,
    },
  });

  revalidatePath('/');
}

export async function ApproveRecord(id: string) {
  await Prisma.record.update({
    where: {
      id,
    },
    data: {
      approved: true,
    },
  });

  revalidatePath('/');
}

export async function RejectRecord(id: string) {
  await Prisma.record.update({
    where: {
      id,
    },
    data: {
      approved: false,
    },
  });

  revalidatePath('/');
}
