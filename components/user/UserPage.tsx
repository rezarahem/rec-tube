import CreateRecordForm from './CreateRecordForm';
import GetUserRecords from './GetUserRecords';

export default async function UserPage() {
  return (
    <div className='flex px-6 py-6 w-full justify-center'>
      <div className='flex gap-x-12 w-4/5'>
        <GetUserRecords />
        <CreateRecordForm />
      </div>
    </div>
  );
}
