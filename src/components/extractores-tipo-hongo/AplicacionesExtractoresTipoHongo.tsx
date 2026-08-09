import { Building2, ChefHat, Cookie, Factory } from 'lucide-react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Card } from '@/components/ui/card';

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
  },
];

export default function AplicacionesExtractoresTipoHongo() {
  return (
    <section id="aplicaciones" className="w-full bg-muted/50 py-12 md:py-16">
      <MaxWidthWrapper>
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
              Aplicaciones y Casos de Uso
            </h2>
            <p className="mx-auto max-w-2xl text-sm font-medium text-muted-foreground sm:text-base">
              Soluciones versátiles para diferentes industrias y entornos
              comerciales
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {applications.map(app => {
              const Icon = app.icon;
              return (
                <Card
                  key={app.title}
                  className="group p-8 transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-6 flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-primary shadow-lg">
                      <Icon className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 text-base font-bold text-foreground sm:text-lg">
                        {app.title}
                      </h3>
                      <p className="text-sm leading-relaxed font-medium text-muted-foreground">
                        {app.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    <p className="text-sm font-semibold text-foreground">
                      Beneficios principales:
                    </p>
                    <ul className="grid grid-cols-2 gap-2">
                      {app.benefits.map(benefit => (
                        <li
                          key={benefit}
                          className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
