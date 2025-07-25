import type { Metadata } from 'next';
import './globals.css';
import Header from './components/Header';
import { Toaster } from 'react-hot-toast';
export const metadata: Metadata = {
  title: 'Scholar Portal',
  description:
    'Jss Stu Scholar portal to maintain the records of PhD Scholars.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='min-h-screen'>
        <Header />
        {children}
        <Toaster toastOptions={{ duration: 3000 }} />
      </body>
    </html>
  );
}
