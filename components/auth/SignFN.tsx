'use client';

import { CheckUserEmail, CreateUser } from '@/actions/CredentialSingFnAction';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FieldValues, useForm, useWatch } from 'react-hook-form';

// Github
export const SingInButton = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <button className='text-lg font-semibold text-white bg-blue-700 rounded-lg px-3 py-2'>
        ...
      </button>
    );
  }

  if (status === 'authenticated') {
    return (
      <Image
        // E:\myWeb_yearly\1402\07.03_record-tube\public\ava.jpg
        src={(session.user.image as string) || '../public/ava.jpg'}
        width={45}
        height={45}
        alt='user image'
        className='rounded-lg'
      />
    );
  }

  return (
    <div className='flex gap-3'>
      <button
        type='button'
        onClick={() => signIn('github')}
        className='text-white bg-zinc-800 disabled:bg-gray-500 rounded-lg text-lg px-3 py-2'
      >
        ورود با گیت‌هاب
      </button>
      <Link
        href='/signin'
        className='text-lg font-semibold text-white bg-blue-700 rounded-lg px-3 py-2'
      >
        ورود با ایمیل
      </Link>
    </div>
  );
};

// SignUp
export const SignUpPageForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  const emailParam = useSearchParams().get('email');

  const email = useWatch({
    control,
    name: 'email',
    defaultValue: emailParam,
  });

  const onSubmit = async (data: FieldValues) => {
    const { email, password } = data;
    const resutl = await CreateUser(data);

    if (resutl) {
      signIn('credentials', {
        email,
        password,
        callbackUrl: '/',
      });
    } else {
      console.log('خطا ساین آپ');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-y-2 text-2xl items-center pt-36 px-8'
    >
      <input
        {...register('email', {
          required: 'ایمیل ضروری است',
        })}
        type='email'
        value={email}
        placeholder='ایمیل'
        className='px-4 py-2 border-cyan-950 border-2 rounded text-xl w-1/3'
      />
      {errors.email && (
        <p className='text-red-500'>{`${errors.email.message}`}</p>
      )}

      <input
        {...register('name', {
          required: 'اسم ضروری است',
        })}
        type='name'
        placeholder='اسم'
        className='px-4 py-2 border-cyan-950 border-2 rounded text-xl w-1/3'
      />
      {errors.name && (
        <p className='text-red-500'>{`${errors.name.message}`}</p>
      )}

      <input
        {...register('password', {
          required: 'رمز ضروری است',
        })}
        type='password'
        placeholder='رمز عبور'
        className='px-4 py-2 border-cyan-950 border-2 rounded text-xl w-1/3'
      />
      {errors.password && (
        <p className='text-red-500'>{`${errors.password.message}`}</p>
      )}

      <button
        disabled={isSubmitting}
        type='submit'
        className='text-white bg-blue-700 disabled:bg-gray-500 py-2 rounded text-xl w-1/3'
      >
        ثبت نام با ایمیل
      </button>
      <p>...</p>
      <button
        disabled={isSubmitting}
        type='button'
        onClick={() => signIn('github')}
        className='text-white bg-zinc-800 disabled:bg-gray-500 py-2 rounded text-lg w-1/3'
      >
        ورود با گیت‌هاب
      </button>
    </form>
  );
};

// Credential SingIn
let signInFormStatus = false;
export const SignInPageForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    const result = await CheckUserEmail(data);

    if (signInFormStatus && result) {
      signIn('credentials', {
        ...data,
        callbackUrl: '/',
      });
    } else if (!result) {
      router.push(`/signup?email=${data.email}`);
    } else {
      signInFormStatus = result;
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-y-2 text-2xl items-center pt-36 px-8'
    >
      {!signInFormStatus && (
        <input
          {...register('email', {
            required: 'ایمیل ضروری است',
          })}
          type='email'
          placeholder='ایمیل'
          className='px-4 py-2 border-cyan-950 border-2 rounded text-xl w-1/3'
        />
      )}
      {errors.email && (
        <p className='text-red-500'>{`${errors.email.message}`}</p>
      )}

      {signInFormStatus && (
        <input
          {...register('password', {
            required: 'پسورد ضروری است',
          })}
          type='password'
          placeholder='رمز عبور'
          className='px-4 py-2 border-cyan-950 border-2 rounded text-xl w-1/3'
        />
      )}
      {errors.password && (
        <p className='text-red-500'>{`${errors.password.message}`}</p>
      )}

      <button
        disabled={isSubmitting}
        type='submit'
        className='text-white bg-blue-700  disabled:bg-gray-500 py-2 rounded text-lg w-1/3'
      >
        ورود با ایمیل
      </button>
      <p>...</p>
      <button
        disabled={isSubmitting}
        type='button'
        onClick={() => signIn('github')}
        className='text-white bg-zinc-800 disabled:bg-gray-500 py-2 rounded text-lg w-1/3'
      >
        ورود با گیت‌هاب
      </button>
    </form>
  );
};

// Signout
export const SingOutButton = () => {
  function onSignOut() {
    signOut();
  }

  return (
    <button
      onClick={onSignOut}
      className='text-lg font-semibold text-white bg-blue-700 rounded-lg px-3 py-2'
    >
      خروج
    </button>
  );
};
