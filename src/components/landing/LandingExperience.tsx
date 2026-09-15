import { LandingHeroScroll } from '@/components/landing/LandingHeroScroll';

export function LandingExperience() {
  return (
    <>
      <p className="mx-auto max-w-6xl px-5 pt-5 text-[11px] tracking-wide text-[#8a847c] md:px-8">
        T1 preview — pin + scrub. No reemplaza la home.{' '}
        <span className="text-[#1c1916]">/landing</span>
      </p>
      <LandingHeroScroll />
    </>
  );
}
