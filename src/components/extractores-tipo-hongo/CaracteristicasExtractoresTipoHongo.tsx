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
    title: 'Construcción y Diseño',
    icon: Layers,
    points: [
      {
        icon: Layers,
        text: 'Aluminio moldeado o acero galvanizado resistente a la corrosión',
      },
      {
        icon: Gauge,
        text: 'Diámetros desde 12" hasta 38" para distintas necesidades',
      },
      {
        icon: Wind,
        text: 'Forma tipo hongo aerodinámica que maximiza el flujo de aire',
      },
      {
        icon: Droplets,
        text: 'Protección completa contra lluvia, polvo e intemperie',
      },
    ],
  },
  {
    title: 'Rendimiento y Operación',
    icon: Zap,
    points: [
      {
        icon: Settings,
        text: 'Transmisión directa o por correas y poleas según tu proyecto',
      },
      {
        icon: Zap,
        text: 'Motores de alta eficiencia: monofásicos, bifásicos o trifásicos',
      },
      {
        icon: Wrench,
        text: 'Acceso frontal para inspección y mantenimiento sin desmontaje',
      },
      {
        icon: Shield,
        text: 'Cumple estándares de seguridad e higiene industrial',
      },
    ],
  },
];

export default function CaracteristicasExtractoresTipoHongo() {
  return (
    <section
      id="caracteristicas"
      className="w-full bg-background py-12 md:py-16"
    >
      <MaxWidthWrapper>
        <div className="space-y-10">
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
              Características Destacadas
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base">
              Tecnología de vanguardia y diseño robusto para máxima eficiencia
              en ventilación industrial
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {features.map(group => {
              const GroupIcon = group.icon;
              return (
                <Card key={group.title} className="p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <GroupIcon className="h-5 w-5 text-primary" />
                    <h3 className="text-base font-bold text-foreground">
                      {group.title}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {group.points.map(point => {
                      const PointIcon = point.icon;
                      return (
                        <li
                          key={point.text}
                          className="flex items-start gap-3 text-sm text-muted-foreground"
                        >
                          <PointIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                          <span>{point.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                </Card>
              );
            })}
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
