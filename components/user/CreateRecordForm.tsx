'use client';

import { CreateRecordAction } from '@/actions/RecordAction';
import { FieldValues, useForm } from 'react-hook-form';

export default function CreateRecordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    await CreateRecordAction(data);

    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-y-2 text-2xl w-full'
    >
      <p className='text-3xl font-semibold pb-4'>
        از اینجا رکوردهاتو ثبت کن 👇
      </p>
      <input
        {...register('title', {
          required: 'ضروری',
        })}
        type='text'
        placeholder='عنوان'
        className='px-4 py-2 border-cyan-950 border-2 rounded text-xl'
      />
      {errors.title && (
        <p className='text-red-500'>{`${errors.title.message}`}</p>
      )}

      <textarea
        {...register('report')}
        placeholder='گزارش'
        rows={5}
        className='px-4 py-2 border-cyan-950 border-2 rounded text-xl'
      ></textarea>
      {errors.report && (
        <p className='text-red-500'>{`${errors.report.message}`}</p>
      )}

      <button
        disabled={isSubmitting}
        type='submit'
        className='text-white bg-blue-700  disabled:bg-gray-500 py-2 rounded text-xl'
      >
        ثبت
      </button>
    </form>
  );
}
