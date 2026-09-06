import { ArrowRight, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatPriceCOP, siteConfig } from '@/config/site';

const pricingPlans = [
  ...siteConfig.extractors
    .filter(e => e.showInPricing)
    .map(extractor => ({
      name: extractor.planName,
      subtitle: extractor.subtitle,
      price: formatPriceCOP(extractor.price),
      period: 'COP + IVA',
      warranty: extractor.warranty,
      features: [...extractor.features],
      url: `/tienda/extractor-eolico-${extractor.size}`,
      recommended: extractor.recommended,
      image: `/products/extractor-${extractor.size}-studio.png`,
      imageAlt: `Extractor eólico ${extractor.size} pulgadas Eólicos Gallego`,
    })),
  {
    name: siteConfig.enterprisePlan.name,
    subtitle: siteConfig.enterprisePlan.subtitle,
    price: null as string | null,
    period: null as string | null,
    warranty: null as string | null,
    features: [...siteConfig.enterprisePlan.features],
    url: siteConfig.enterprisePlan.url,
    recommended: false,
    image: '/products/extractor-warehouse-row.png',
    imageAlt: 'Instalación industrial de extractores eólicos Gallego',
  },
];

export default function Prices() {
  return (
    <section id="precios" className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-medium text-primary">Precios</p>
          <h2 className="mt-2">Extractores eólicos Gallego por tamaño</h2>
          <p className="mt-3 text-muted-foreground">
            Tres diámetros fabricados en Cali. Elige el extractor eólico según
            el recinto o pide un proyecto a medida.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {pricingPlans.map(plan => (
            <article
              key={plan.name}
              className={`flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm ${
                plan.recommended
                  ? 'border-primary ring-1 ring-primary/20'
                  : 'border-border'
              }`}
            >
              <div className="relative aspect-[4/3] bg-muted">
                <Image
                  src={plan.image}
                  alt={plan.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {plan.recommended ? (
                  <Badge className="absolute top-3 left-3">Recomendado</Badge>
                ) : null}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-lg font-semibold text-foreground">
                  {plan.name}
                </p>
                <p className="text-sm text-muted-foreground">{plan.subtitle}</p>

                {plan.price ? (
                  <p className="mt-4 text-3xl font-semibold tracking-tight">
                    {plan.price}
                  </p>
                ) : (
                  <p className="mt-4 text-lg font-semibold">
                    Cotización personalizada
                  </p>
                )}

                {plan.period ? (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {plan.period}
                  </p>
                ) : null}

                {plan.warranty ? (
                  <p className="mt-2 text-xs font-medium text-primary">
                    {plan.warranty}
                  </p>
                ) : null}

                <ul className="mt-6 mb-6 flex-1 space-y-2.5">
                  {plan.features.map(feature => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="size-3.5 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className="w-full"
                  variant={plan.recommended ? 'default' : 'outline'}
                >
                  <Link href={plan.url}>
                    {plan.price ? 'Ver producto' : 'Contáctanos'}
                    <ArrowRight className="ml-1.5 size-3.5" />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
