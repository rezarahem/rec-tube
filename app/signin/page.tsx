import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { SignInPageForm } from '@/components/auth/SignFN';
import Link from 'next/link';

export default async function SinginPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/');
  }

  return (
    <>
      <SignInPageForm />
      <Link
        href='/signup'
        className='flex justify-center pt-6 hover:text-blue-500'
      >
        هنوز ثبت نام نکرده‌اید، از اینجا ثبت نام کنید
      </Link>
    </>
  );
}
