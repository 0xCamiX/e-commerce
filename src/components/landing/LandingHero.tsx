import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { SpinningExtractor } from '@/components/landing/SpinningExtractor';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';

const benefits = [
  'Sin consumo eléctrico',
  '5 años de garantía',
  'Fabricado en Cali',
];

export function LandingHero() {
  return (
    <section className="relative overflow-hidden bg-[oklch(0.18_0.04_250)] text-primary-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,oklch(0.45_0.12_220/.45),transparent_45%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div>
          <Badge variant="secondary" className="mb-5">
            Eólicos Gallego · Cali, Colombia
          </Badge>
          <h1 className="text-primary-foreground">
            Extractores eólicos que giran con el viento y enfrían tu cubierta
          </h1>
          <p className="mt-5 max-w-xl text-base text-primary-foreground/75 sm:text-lg">
            Ventilación 100% ecológica para hogares, bodegas y galpones.
            Fabricamos extractores eólicos en aluminio, tipo hongo y pintura
            térmica que baja hasta 20°C la temperatura del techo.
          </p>
          <ul className="mt-6 flex flex-col gap-2">
            {benefits.map(item => (
              <li key={item} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="size-4 text-accent" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/tienda">Ver productos</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
                  'Hola, quiero cotizar extractores eólicos Gallego.',
                )}`}
                target="_blank"
              >
                Cotizar por WhatsApp
              </Link>
            </Button>
          </div>
        </div>
        <div className="relative">
          <SpinningExtractor className="max-w-[460px]" />
          <p className="mt-2 text-center text-xs text-primary-foreground/60">
            Extractor eólico tipo turbina · impulsado 100% por el viento
          </p>
        </div>
      </div>
    </section>
  );
}
