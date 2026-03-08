import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const plans = [
  {
    name: 'Hogar (24")',
    subtitle: 'Para uso residencial',
    price: '$750,000',
    period: 'COP + IVA',
    warranty: '5 años de garantía',
    features: [
      'Fácil instalación',
      'Bajo mantenimiento',
      '100% ecológico',
      'Silencioso',
    ],
    url: '/cotizador',
    recommended: false,
  },
  {
    name: 'Bodegas (31")',
    subtitle: 'Para uso industrial',
    price: '$850,000',
    period: 'COP + IVA',
    warranty: '5 años de garantía',
    features: [
      'Alta capacidad de extracción',
      'Fabricación local',
      'Materiales resistentes',
      'Instalación profesional',
    ],
    url: '/cotizador',
    recommended: true,
  },
  {
    name: 'Empresarial',
    subtitle: 'Para proyectos a gran escala',
    price: null,
    period: null,
    warranty: null,
    features: [
      'Soluciones a medida',
      'Asesoría personalizada',
      'Instalación a gran escala',
      'Soporte prioritario',
      'Ahorro de energía',
    ],
    url: '/cotizador',
    recommended: false,
  },
];

export default function Prices() {
  return (
    <section id="precios" className="w-full bg-background py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">
            Precios
          </h2>
          <p className="mx-auto max-w-lg text-sm text-muted-foreground">
            Elige el extractor ideal para tu espacio
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map(plan => (
            <div
              key={plan.name}
              className={`flex flex-col rounded-xl border bg-white p-6 ${
                plan.recommended
                  ? 'border-primary ring-1 ring-primary/20'
                  : 'border-border'
              }`}
            >
              <div className="mb-4">
                <p className="text-base font-bold text-foreground">
                  {plan.name}
                </p>
                <p className="text-xs text-muted-foreground">{plan.subtitle}</p>
              </div>

              {plan.price ? (
                <div className="mb-1">
                  <span className="text-3xl font-bold tracking-tight text-foreground">
                    {plan.price}
                  </span>
                </div>
              ) : (
                <div className="mb-1">
                  <span className="text-lg font-semibold text-foreground">
                    Cotización personalizada
                  </span>
                </div>
              )}

              {plan.period && (
                <p className="mb-4 text-xs text-muted-foreground">
                  {plan.period}
                </p>
              )}

              {plan.warranty && (
                <p className="mb-4 text-xs font-medium text-primary">
                  {plan.warranty}
                </p>
              )}

              {!plan.price && <div className="mb-4" />}

              <Separator className="mb-4" />

              <ul className="mb-6 flex-1 space-y-2.5">
                {plan.features.map(f => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-[13px] text-muted-foreground"
                  >
                    <Check className="h-3.5 w-3.5 flex-shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className="w-full"
                variant={plan.recommended ? 'default' : 'outline'}
              >
                <Link href={plan.url}>
                  {plan.price ? 'Comprar' : 'Contáctanos'}
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
