import {
  Droplets,
  Gauge,
  Layers,
  Settings,
  Shield,
  Wind,
  Wrench,
  Zap,
} from 'lucide-react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Card } from '@/components/ui/card';

const features = [
  {
    icon: Layers,
    title: 'Materiales Premium',
    description:
      'Fabricados en aluminio moldeado o acero galvanizado, garantizando resistencia a la corrosión y durabilidad excepcional.',
  },
  {
    icon: Gauge,
    title: 'Múltiples Tamaños',
    description:
      'Disponibles en diámetros desde 12" hasta 38", adaptándose perfectamente a diferentes necesidades de extracción.',
  },
  {
    icon: Settings,
    title: 'Tipos de Transmisión',
    description:
      'Modelos con transmisión directa o por correas y poleas, según los requerimientos específicos de tu proyecto.',
  },
  {
    icon: Zap,
    title: 'Motores Eficientes',
    description:
      'Equipados con motores de alta eficiencia y bajo consumo energético, disponibles en opciones monofásicas, bifásicas o trifásicas.',
  },
  {
    icon: Wrench,
    title: 'Fácil Mantenimiento',
    description:
      'Diseño que permite acceso frontal para inspecciones y mantenimiento sin necesidad de desmontaje completo.',
  },
  {
    icon: Wind,
    title: 'Diseño Aerodinámico',
    description:
      'Forma tipo hongo optimizada para maximizar el flujo de aire y proteger el motor de las condiciones climáticas.',
  },
  {
    icon: Droplets,
    title: 'Resistente a la Intemperie',
    description:
      'Protección completa contra lluvia, polvo y condiciones ambientales adversas, garantizando operación continua.',
  },
  {
    icon: Shield,
    title: 'Cumplimiento Normativo',
    description:
      'Cumplen con estándares de seguridad e higiene para cocinas industriales y entornos comerciales exigentes.',
  },
];

export default function CaracteristicasExtractoresTipoHongo() {
  return (
    <section
      id="caracteristicas"
      className="w-full bg-background py-12 md:py-16"
    >
      <MaxWidthWrapper>
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
              Características Destacadas
            </h2>
            <p className="mx-auto max-w-2xl text-sm font-medium text-muted-foreground sm:text-base">
              Tecnología de vanguardia y diseño robusto para máxima eficiencia
              en ventilación industrial
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(feature => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="group p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-4 inline-flex rounded-lg bg-accent p-3 text-accent-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-base font-bold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed font-medium text-muted-foreground">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
