import Link from 'next/link';
import { SingInButton, SingOutButton } from './auth/SignFN';
import AuthCheck from './auth/AuthCheck';

export default function NavMenu() {
  return (
    <nav className='flex justify-between px-12 p-3 items-center border-b-2 border-b-cyan-950'>
      <ul className='flex gap-5 items-center'>
        <li>
          <SingInButton />
        </li>
        <li>
          <AuthCheck>
            <SingOutButton />
          </AuthCheck>
        </li>
      </ul>
      <Link href={'/'}>
        <h1 className='text-4xl font-bold'>رکورد</h1>
      </Link>
    </nav>
  );
}
