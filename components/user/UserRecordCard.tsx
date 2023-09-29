type Props = {
  id: string | null;
  title: string | null;
  report?: string | null;
  approved: boolean;
  userId: string | null;
  userName: string | null;
};

export default function UserRecordCard({
  id,
  title,
  report,
  approved,
  userId,
  userName,
}: Props) {
  return (
    <div className='rounded flex gap-3 h-12 bg-white px-3 py-2 shadow-md hover:bg-blue-200 hover:shadow-none overflow-hidden cursor-default'>
      <h4 className='w-1/3 overflow-hidden'>{title}</h4>
      <p className='w-1/3 overflow-hidden'>{report}</p>

      {approved ? (
        <p className='w-1/3 overflow-hidden text-green-600'>
          مورد تایید می‌باشد
        </p>
      ) : (
        <p className='w-1/3 overflow-hidden text-rose-600'>
          مورد تایید نمی‌باشد
        </p>
      )}
    </div>
  );
}
