import GetAllRecords from './GetAllRecords';

export default function AdminPage() {
  return (
    <div className='flex px-6 py-6 w-full justify-center'>
      <div className='flex gap-x-12 w-4/5'>
        <GetAllRecords />
      </div>
    </div>
  );
}
