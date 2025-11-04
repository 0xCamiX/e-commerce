import { Building2, Home, Star, Warehouse } from 'lucide-react';
import Link from 'next/link';
import type React from 'react';
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const plans = [
  {
    type: 'Hogar (24" - 60cm)',
    price: '$750,000 COP + IVA',
    description: 'Buena para hogares, apartamentos y pequeños comercios.',
    warranty: '5 años de garantía',
    features: [
      'Fácil instalación',
      'Bajo mantenimiento',
      '100% ecológico',
      'Silencioso',
    ],
    button: {
      label: 'Comprar',
      url: 'https://wa.me/573177525559',
      style:
        'bg-gradient-to-r from-sky-500 to-sky-400 text-white shadow-md shadow-sky-200/80 hover:shadow-lg hover:shadow-sky-300/90 hover:-translate-y-0.5',
    },
    icon: Home,
    gradient: 'from-sky-200 via-sky-100 to-sky-50',
  },
  {
    type: 'Bodegas (31" - 80cm)',
    price: '$850,000 COP + IVA',
    description: 'Ideal para fábricas, bodegas y hangares.',
    warranty: '5 años de garantía',
    features: [
      'Alta capacidad de extracción',
      'Fabricación local',
      'Materiales resistentes',
      'Instalación profesional',
    ],
    button: {
      label: 'Comprar',
      url: 'https://wa.me/573177525559',
      style:
        'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg shadow-green-200/80 hover:shadow-xl hover:shadow-green-300/90 hover:-translate-y-1 hover:scale-105',
    },
    icon: Warehouse,
    gradient: 'from-green-200 via-green-100 to-green-50',
  },
  {
    type: 'Empresarial',
    price: null,
    description:
      'Proyectos empresariales para cubiertas industriales o de gran cantidad. Contáctanos para un acuerdo en el precio.',
    warranty: null,
    features: [
      'Soluciones a medida',
      'Asesoría personalizada',
      'Instalación a gran escala',
      'Soporte prioritario',
      'Ahorro de energía',
    ],
    button: {
      label: 'Contáctanos',
      url: 'https://wa.me/573177525559',
      style:
        'bg-gradient-to-r from-amber-500 to-amber-400 text-white shadow-md shadow-amber-200/80 hover:shadow-lg hover:shadow-amber-300/90 hover:-translate-y-0.5',
    },
    icon: Building2,
    gradient: 'from-amber-200 via-amber-100 to-amber-50',
  },
];

function IconMesh({
  Icon,
  count = 36,
}: {
  Icon: React.ComponentType<{ strokeWidth?: number }>;
  count?: number;
}) {
  // Renderiza una malla de iconos pequeños
  return (
    <svg
      className="absolute inset-0 h-full w-full [mask-image:linear-gradient(to_bottom,black_60%,transparent)] opacity-30"
      style={{ zIndex: 1 }}
      aria-hidden="true"
      role="presentation"
    >
      {Array.from({ length: count }, (_, i) => {
        const x = (i % 12) * 24 + 8;
        const y = Math.floor(i / 12) * 24 + 8;
        return (
          <g
            key={`icon-${x}-${y}`}
            transform={`translate(${x},${y}) scale(0.18)`}
          >
            <Icon strokeWidth={1} />
          </g>
        );
      })}
    </svg>
  );
}

export default function Prices() {
  return (
    <section className="w-full bg-slate-50 py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="mb-4 text-center text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
          Precios
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-lg font-medium text-slate-600">
          Elige el extractor ideal para tu espacio
        </p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan, idx) => (
            <div
              key={plan.type}
              className={`overflow-hidden rounded-xl transition-transform duration-300 ease-in-out ${idx === 1 ? 'border-2 border-green-400 shadow-xl shadow-green-100/50 hover:scale-105' : 'border border-gray-100 hover:scale-102'}`}
            >
              <div className="flex h-full flex-col">
                {/* Gradiente y malla de iconos */}
                <div
                  className={`relative h-24 w-full bg-gradient-to-b ${plan.gradient}`}
                >
                  <IconMesh Icon={plan.icon} />
                  <div className="absolute top-4 left-4 z-10">
                    <plan.icon className="h-6 w-6 text-black opacity-60" />
                  </div>
                  {idx === 1 && (
                    <div className="absolute top-4 right-4 z-10 rounded-full bg-gradient-to-r from-green-600 to-green-500 px-4 py-1.5 text-sm font-semibold text-white shadow-lg ring-2 ring-white/20">
                      Recomendado
                    </div>
                  )}
                </div>
                {/* Contenido de la carta */}
                <div className="flex flex-1 flex-col bg-white">
                  <CardHeader className="px-6 pt-4 pb-2">
                    <CardTitle className="text-xl font-bold text-slate-900">
                      {plan.type}
                    </CardTitle>
                    <CardDescription className="min-h-[40px] font-medium text-slate-600">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col justify-between px-6 pt-0 pb-6">
                    <div>
                      {plan.price && (
                        <div className="mb-2 flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-slate-900">
                            {plan.price}
                          </span>
                        </div>
                      )}
                      {plan.warranty && (
                        <div className="mb-2 text-xs font-semibold text-sky-700">
                          {plan.warranty}
                        </div>
                      )}
                      <ul className="mb-4 space-y-1">
                        {plan.features.map(f => (
                          <li
                            key={f}
                            className="flex items-center text-sm font-medium text-slate-700"
                          >
                            <Star className="mr-2 h-3 w-3 text-sky-400 opacity-70" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link
                      href={plan.button.url}
                      target="_blank"
                      className={`group mt-auto flex w-full items-center justify-center rounded-lg px-4 py-2 text-center text-base font-semibold transition-all duration-300 ease-in-out ${plan.button.style}`}
                    >
                      {plan.button.label}
                    </Link>
                  </CardContent>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
