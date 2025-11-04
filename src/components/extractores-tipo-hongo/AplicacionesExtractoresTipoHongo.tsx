import { Building2, ChefHat, Cookie, Factory } from 'lucide-react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

const applications = [
  {
    icon: ChefHat,
    title: 'Cocinas Industriales y Restaurantes',
    description:
      'Eliminan eficientemente humos, vapores y olores de cocina, manteniendo un ambiente limpio, seguro y confortable para el personal.',
    benefits: [
      'Eliminación de humos y grasas',
      'Reducción de olores',
      'Mejora de condiciones laborales',
      'Cumplimiento de normativas sanitarias',
    ],
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50',
  },
  {
    icon: Cookie,
    title: 'Panaderías y Pastelerías',
    description:
      'Controlan la acumulación de calor y vapor generado durante el proceso de horneado, protegiendo equipos y mejorando la calidad del producto final.',
    benefits: [
      'Control de temperatura',
      'Reducción de humedad',
      'Protección de equipos',
      'Mejora de calidad del producto',
    ],
    color: 'from-amber-500 to-yellow-500',
    bgColor: 'bg-amber-50',
  },
  {
    icon: Factory,
    title: 'Fábricas y Plantas de Producción',
    description:
      'Aseguran la extracción de contaminantes, vapores químicos y partículas, mejorando las condiciones laborales y la eficiencia operativa.',
    benefits: [
      'Extracción de contaminantes',
      'Mejora de calidad del aire',
      'Protección de trabajadores',
      'Cumplimiento de seguridad industrial',
    ],
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Building2,
    title: 'Edificios Comerciales',
    description:
      'Ideal para espacios comerciales que requieren ventilación eficiente, como centros comerciales, hoteles y edificios de oficinas.',
    benefits: [
      'Ventilación general',
      'Control de humedad',
      'Eficiencia energética',
      'Ambiente confortable',
    ],
    color: 'from-slate-500 to-gray-500',
    bgColor: 'bg-slate-50',
  },
];

export default function AplicacionesExtractoresTipoHongo() {
  return (
    <section className="w-full bg-gradient-to-b from-slate-50 to-white py-16 md:py-20">
      <MaxWidthWrapper>
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
              Aplicaciones y Casos de Uso
            </h2>
            <p className="mx-auto max-w-2xl text-lg font-medium text-slate-600">
              Soluciones versátiles para diferentes industrias y entornos
              comerciales
            </p>
          </div>

          {/* Applications Grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {applications.map(app => {
              const Icon = app.icon;
              return (
                <div
                  key={app.title}
                  className={`group overflow-hidden rounded-xl border border-slate-200 ${app.bgColor} p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl`}
                >
                  <div className="mb-6 flex items-start gap-4">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-r ${app.color} shadow-lg`}
                    >
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 text-xl font-bold text-slate-900">
                        {app.title}
                      </h3>
                      <p className="text-sm leading-relaxed font-medium text-slate-600">
                        {app.description}
                      </p>
                    </div>
                  </div>

                  {/* Benefits List */}
                  <div className="mt-6 space-y-2">
                    <p className="text-sm font-semibold text-slate-700">
                      Beneficios principales:
                    </p>
                    <ul className="grid grid-cols-2 gap-2">
                      {app.benefits.map(benefit => (
                        <li
                          key={benefit}
                          className="flex items-center gap-2 text-sm font-medium text-slate-600"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-sky-500"></span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
