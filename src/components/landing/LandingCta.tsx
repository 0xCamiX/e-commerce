import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { buildWhatsAppUrl, siteConfig } from '@/config/site';

export function LandingCta() {
  return (
    <section
      id="cotizar-b2b"
      className="mx-auto w-full max-w-6xl px-5 pb-24 md:px-8 md:pb-32"
    >
      <div className="rounded-[2rem] bg-[#1c1916] px-8 py-14 text-[#f7f4ee] sm:px-14 sm:py-16">
        <p className="text-[11px] font-medium tracking-[0.22em] text-[#9dcebc] uppercase">
          Cotizar B2B
        </p>
        <h2 className="landing-serif mt-4 max-w-xl text-4xl leading-tight font-normal sm:text-5xl">
          Dinos la cubierta. Te devolvemos la talla.
        </h2>
        <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#c4bfb4]">
          Sin checkout en esta propuesta. El flujo sigue siendo cotizador y
          WhatsApp — el mismo de siempre, con 24", 31" y 39".
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-[#f7f4ee] px-7 text-[#1c1916] shadow-none hover:bg-white"
          >
            <Link href="/cotizador">Cotizar</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full border-[#f7f4ee]/20 bg-transparent px-7 text-[#f7f4ee] shadow-none hover:bg-[#f7f4ee]/10 hover:text-white"
          >
            <Link
              href={buildWhatsAppUrl('Extractor eólico — proyecto B2B')}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </Link>
          </Button>
        </div>
        <p className="mt-8 text-xs text-[#8a847c]">
          {siteConfig.contact.phone} · {siteConfig.contact.address}
        </p>
      </div>
    </section>
  );
}
