import { landingBenefits, landingSocialProof } from '@/components/landing/copy';

export function LandingBenefits() {
  return (
    <section
      id="beneficios"
      className="mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-28"
    >
      <div className="mb-14 max-w-xl">
        <p className="mb-3 text-[11px] font-medium tracking-[0.22em] text-[#6b6560] uppercase">
          Beneficios
        </p>
        <h2 className="landing-serif text-4xl leading-tight font-normal text-[#1c1916] sm:text-5xl">
          Menos calor percibido. El mismo techo.
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {landingBenefits.map(item => (
          <article
            key={item.title}
            className="border-t border-[#1c1916]/10 pt-6"
          >
            <h3 className="text-base font-medium text-[#1c1916]">
              {item.title}
            </h3>
            <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-[#5c574f]">
              {item.body}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-20 max-w-lg">
        <p className="text-[11px] font-medium tracking-[0.22em] text-[#6b6560] uppercase">
          {landingSocialProof.kicker}
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-[#5c574f]">
          {landingSocialProof.body}
        </p>
        <p className="mt-2 text-xs text-[#8a847c]">{landingSocialProof.note}</p>
      </div>
    </section>
  );
}
