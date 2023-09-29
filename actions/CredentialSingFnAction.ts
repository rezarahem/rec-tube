'use server';

import Prisma from '@/libs/prisma';
import { hash } from 'bcrypt';

type Props = {
  name?: string;
  email?: string;
  password?: string;
};

export async function CreateUser({ name, email, password }: Props) {
  const hashedPassword = await hash(password as string, 12);

  const user = await Prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });

  if (user) return user;
}

export async function CheckUserEmail({ email }: Props) {
  const user = await Prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    return true;
  } else {
    return false;
  }
}
