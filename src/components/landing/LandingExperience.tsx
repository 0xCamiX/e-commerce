import { LandingBenefits } from '@/components/landing/LandingBenefits';
import { LandingCta } from '@/components/landing/LandingCta';
import { LandingGallery } from '@/components/landing/LandingGallery';
import { LandingHeroScroll } from '@/components/landing/LandingHeroScroll';
import { LandingMetrics } from '@/components/landing/LandingMetrics';

export function LandingExperience() {
  return (
    <>
      <p className="mx-auto max-w-6xl px-5 pt-6 text-[11px] tracking-wide text-[#8a847c] md:px-8">
        Propuesta de scroll — no reemplaza la home actual. Ruta de preview:{' '}
        <span className="text-[#1c1916]">/landing</span>
      </p>
      <LandingHeroScroll />
      <LandingGallery />
      <LandingMetrics />
      <LandingBenefits />
      <LandingCta />
    </>
  );
}
