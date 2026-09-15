import { landingGallery, landingQuote } from '@/components/landing/copy';

export function LandingGallery() {
  return (
    <section
      id="instalaciones"
      className="mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-28"
    >
      <div className="mb-12 max-w-2xl">
        <p className="mb-3 text-[11px] font-medium tracking-[0.22em] text-[#6b6560] uppercase">
          Instalaciones
        </p>
        <h2 className="landing-serif text-4xl leading-tight font-normal text-[#1c1916] sm:text-5xl">
          Cubiertas reales. Fotos por reemplazar.
        </h2>
        <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[#5c574f]">
          Cada recuadro espera un export de Google Photos o un still 3D de
          Higgsfield. El overlay oscuro es el patrón de caption; no recortes el
          producto.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {landingGallery.map(shot => (
          <figure
            key={shot.id}
            className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#e6e0d4]"
          >
            {/* biome-ignore lint/performance/noImgElement: SVG placeholders aren't handled well by next/image; swap when Juan drops JPG/WebP. */}
            <img
              src={shot.src}
              alt={shot.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 from-20% via-black/35 via-45% to-transparent" />
            {shot.placeholder ? (
              <span className="absolute top-3 left-3 rounded-full bg-black/45 px-2.5 py-1 text-[10px] font-medium tracking-wide text-white/90 uppercase backdrop-blur-sm">
                Placeholder
              </span>
            ) : null}
            <figcaption className="absolute inset-x-0 bottom-0 p-5">
              <p className="landing-serif text-xl text-white">{shot.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-white/75">
                {shot.caption}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

      <blockquote className="mt-20 max-w-3xl border-t border-[#1c1916]/10 pt-10">
        <p className="text-[11px] font-medium tracking-[0.22em] text-[#2d7a5e] uppercase">
          {landingQuote.kicker}
        </p>
        <p className="landing-serif mt-4 text-3xl leading-snug text-[#1c1916] sm:text-4xl">
          {landingQuote.text}
        </p>
        <dl className="mt-8 flex flex-wrap gap-8 text-sm">
          {landingQuote.stats.map(stat => (
            <div key={stat.label}>
              <dt className="text-[#6b6560]">{stat.label}</dt>
              <dd className="mt-1 font-medium text-[#1c1916]">{stat.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 max-w-xl text-xs leading-relaxed text-[#8a847c]">
          {landingQuote.meta}
        </p>
      </blockquote>
    </section>
  );
}
