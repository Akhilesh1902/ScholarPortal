import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import SignOutButton from './SignoutBtn';

export default async function Header() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  return (
    <header className='flex items-center justify-between p-3 bg-accent'>
      <h1>
        <Link href={'/'}>Scholars Portal</Link>
      </h1>
      <div className='flex gap-4'>
        {data.user ? (
          <SignOutButton />
        ) : (
          <>
            <Button>
              <Link href={'/signin'}>Sign In</Link>
            </Button>
            <Button variant={'secondary'}>
              <Link href={'/signup'}>Sign Up</Link>
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
