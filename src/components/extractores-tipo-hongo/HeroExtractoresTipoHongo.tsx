import { Shield, Wind, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';

const highlights = [
  { icon: Shield, label: 'Alta durabilidad' },
  { icon: Zap, label: 'Eficiencia energética' },
  { icon: Wind, label: 'Alto flujo de aire' },
];

export default function HeroExtractoresTipoHongo() {
  return (
    <section className="relative overflow-hidden bg-[oklch(0.18_0.04_250)] text-primary-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,oklch(0.45_0.12_220/.45),transparent_45%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div>
          <Badge variant="secondary" className="mb-5">
            Eólicos Gallego · Tipo hongo
          </Badge>
          <h1 className="text-primary-foreground">
            Extractores tipo hongo para ventilación industrial
          </h1>
          <p className="mt-5 max-w-xl text-base text-primary-foreground/75 sm:text-lg">
            Extracción de humos, vapores, grasas y olores en cocinas
            industriales, panaderías y fábricas. Diseño aerodinámico que protege
            el motor y maximiza el flujo de aire.
          </p>
          <ul className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-6">
            {highlights.map(item => (
              <li key={item.label} className="flex items-center gap-2 text-sm">
                <item.icon className="size-4 text-accent" />
                {item.label}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/tienda/extractor-tipo-hongo">Ver en tienda</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
                  'Hola, me interesan los extractores tipo hongo de Eólicos Gallego.',
                )}`}
                target="_blank"
              >
                Solicitar cotización
              </Link>
            </Button>
          </div>
        </div>
        <div className="relative min-h-72 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
          <Image
            src="/products/extractor-tipo-hongo.png"
            alt="Extractor tipo hongo Eólicos Gallego para ventilación industrial"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}
