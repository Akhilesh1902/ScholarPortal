import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from '@/components/ui/card';
import SigninForm from './SigninForm';

export default async function SignInPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (data?.user) {
    redirect('/');
  }

  return (
    <main className='flex py-12 flex-col items-center justify-center'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <div className='flex flex-col items-center space-y-2'>
            <h1 className='text-3xl font-bold'>Welcome</h1>
            <p className='text-gray-500 dark:text-gray-400'>
              Enter your email below to login to your account
            </p>
          </div>
        </CardHeader>
        <CardContent className='space-y-6'>
          <SigninForm />
          <Separator />
          <div className='space-y-4 hidden'>
            <Button
              className='w-full'
              variant='outline'>
              Sign in with Google
            </Button>
          </div>
        </CardContent>
        <CardFooter className='flex flex-col space-y-2'>
          <Link
            className='text-sm underline'
            href='/signup'>
            Don&apos;t have an account? Sign up here
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
