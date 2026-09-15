import { landingMetrics } from '@/components/landing/copy';

export function LandingMetrics() {
  return (
    <section
      id="indicadores"
      className="border-y border-[#1c1916]/8 bg-[#ece7dc]/60"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-5 md:grid-cols-4 md:px-8">
        {landingMetrics.map(metric => (
          <div key={metric.label} className="px-2 py-12 md:py-16">
            <p className="landing-serif text-3xl text-[#1c1916] sm:text-4xl">
              {metric.value}
            </p>
            <p className="mt-2 text-sm text-[#6b6560]">{metric.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
