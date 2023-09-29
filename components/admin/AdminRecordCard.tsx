'use client';

import { ApproveRecord, RejectRecord } from '@/actions/RecordAction';

type Props = {
  id: string | null;
  title: string | null;
  report?: string | null;
  approved: boolean;
  userId: string | null;
  userName: string | null;
};

export default function AdminRecordCard({
  id,
  title,
  report,
  approved,
  userId,
  userName,
}: Props) {
  const onAdminApproval = () => {
    ApproveRecord(id as string);
  };

  const onAdminRefusal = () => {
    RejectRecord(id as string);
  };

  return (
    <div className='flex gap-3 group'>
      <div className='rounded flex w-full gap-3 h-12 bg-white px-3 py-2 shadow-md hover:bg-blue-200 hover:shadow-none overflow-hidden cursor-default'>
        <h4 className='w-1/6 overflow-hidden'>{title}</h4>
        <h4 className='w-5/6 overflow-hidden'>{report}</h4>
        {approved ? (
          <p className='w-1/6 overflow-hidden text-green-600'>
            مورد تایید می‌باشد
          </p>
        ) : (
          <p className='w-1/6 overflow-hidden text-rose-600'>
            مورد تایید نمی‌باشد
          </p>
        )}
      </div>
      {!approved ? (
        <button
          onClick={onAdminApproval}
          className='text-lg font-semibold bg-green-600 text-white rounded-lg px-3 w-1/6 hidden group-hover:block'
        >
          تایید
        </button>
      ) : (
        <button
          onClick={onAdminRefusal}
          className='text-lg font-semibold bg-rose-500 text-white rounded-lg px-3 w-1/6 hidden group-hover:block'
        >
          رد
        </button>
      )}
    </div>
  );
}
