import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import UserPage from '@/components/user/UserPage';
import AdminPage from '@/components/admin/AdminPgae';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  let pageContent = (
    <div className='flex justify-center pt-48'>
      <div className='w-1/3 justify-center flex flex-col gap-y-5 justify-items-center'>
        <p className='text-3xl font-semibold text-center'>
          اول باید وارد حساب کاربریت بشی 🤌
        </p>
      </div>
    </div>
  );

  switch (session?.user?.userRole) {
    case 'USER':
      pageContent = <UserPage />;
      break;
    case 'ADMIN':
      pageContent = <AdminPage />;
      break;

    default:
      pageContent;
      break;
  }

  return <main>{pageContent}</main>;
}
