import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { SignUpPageForm } from '@/components/auth/SignFN';
import Link from 'next/link';

export default async function SingupPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/');
  }

  return (
    <>
      <SignUpPageForm />
      <Link
        href='/signin'
        className='flex justify-center pt-6 hover:text-blue-500'
      >
        قبلا ثبت نام کرده‌اید، از اینجا وارد شوید
      </Link>
    </>
  );
}
