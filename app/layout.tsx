import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import '@/styles/globals.css';

import { Recursive } from 'next/font/google';
import { siteConfig } from '@/config/site';

const recursive = Recursive({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  icons: {
    icon: 'favicon/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es'>
      <body className={recursive.className}>
        <Navbar />
        <main className='flex grainy-light flex-col min-h-[calc(100vh-3.5rem-1px)]'>
          <div className='flex-1 flex flex-col h-full'>{children}</div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
