import type { Metadata } from 'next';
import { LandingExperience } from '@/components/landing/LandingExperience';

export const metadata: Metadata = {
  title: 'Propuesta landing — Extractor eólico',
  description:
    'Propuesta de landing con scroll-motion para el extractor eólico de Eólicos Gallego. Preview interno; no indexar.',
  robots: { index: false, follow: false },
};

export default function LandingProposalPage() {
  return <LandingExperience />;
}
