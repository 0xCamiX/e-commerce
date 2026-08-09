import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import '../app/styles/globals.css';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
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
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <Navbar />
        <main className="flex min-h-[calc(100vh-3.5rem-1px)] flex-col">
          <div className="flex h-full flex-1 flex-col">{children}</div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
