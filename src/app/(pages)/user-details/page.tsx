import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import UserDetailsForm from './UserDetailsForm';
import { createClient } from '@/lib/supabase/server';

export default async function UserDetails() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  return (
    <div className='px-16'>
      <h1 className='text-2xl font-bold py-4'>Enter User Details</h1>
      <Card className='w-1/2'>
        <CardHeader>
          <h2 className='text-lg font-bold'>User Details</h2>
        </CardHeader>
        <CardContent>
          <UserDetailsForm email={data.user ? data.user.email! : ''} />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
