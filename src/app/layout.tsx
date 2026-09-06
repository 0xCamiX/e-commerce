import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Providers } from '@/components/providers';
import { siteConfig } from '@/config/site';
import './styles/globals.css';

const geist = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Eólicos Gallego | Extractores eólicos 100% ecológicos en Cali',
    template: '%s | Eólicos Gallego',
  },
  description:
    'Eólicos Gallego fabrica extractores eólicos en Cali, Colombia. Ventilación ecológica sin electricidad, extractores tipo hongo y pintura térmica. Garantía 5 años.',
  keywords: [
    'Eólicos Gallego',
    'Eolicos Gallego',
    'extractores eólicos',
    'extractores eolicos Cali',
    'extractor eólico Colombia',
    'extractor eólico 31 pulgadas',
    'ventilación ecológica',
    'ventilación industrial Cali',
    'pintura térmica techo',
    'extractores tipo hongo',
  ],
  authors: [{ name: 'Eólicos Gallego' }],
  creator: 'Eólicos Gallego',
  publisher: 'Eólicos Gallego',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: siteConfig.url,
    siteName: 'Eólicos Gallego',
    title: 'Eólicos Gallego | Extractores eólicos en Cali, Colombia',
    description: siteConfig.description,
    images: [
      {
        url: '/og/eolicos-gallego.png',
        width: 1200,
        height: 630,
        alt: 'Eólicos Gallego — extractores eólicos ecológicos',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eólicos Gallego | Extractores eólicos',
    description: siteConfig.description,
    images: ['/og/eolicos-gallego.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  category: 'manufacturing',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
