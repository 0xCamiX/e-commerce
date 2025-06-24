import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../app/styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Eólicos Gallego',
  description:
    'Extractores eólicos en Cali, Colombia para la extracción de calor en hogares, oficinas y negocios.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="grainy-light flex min-h-[calc(100vh-3.5rem-1px)] flex-col">
          <div className="flex h-full flex-1 flex-col">
            <Navbar />
            {children}
          </div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
