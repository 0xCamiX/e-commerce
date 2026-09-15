import { Instrument_Serif } from 'next/font/google';
import type { ReactNode } from 'react';

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-landing-serif',
  display: 'swap',
});

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${instrumentSerif.variable} landing-canvas`}>
      {children}
    </div>
  );
}
