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

const features = [
  {
    icon: Layers,
    title: 'Materiales Premium',
    description:
      'Fabricados en aluminio moldeado o acero galvanizado, garantizando resistencia a la corrosión y durabilidad excepcional.',
    color: 'sky',
  },
  {
    icon: Gauge,
    title: 'Múltiples Tamaños',
    description:
      'Disponibles en diámetros desde 12" hasta 38", adaptándose perfectamente a diferentes necesidades de extracción.',
    color: 'green',
  },
  {
    icon: Settings,
    title: 'Tipos de Transmisión',
    description:
      'Modelos con transmisión directa o por correas y poleas, según los requerimientos específicos de tu proyecto.',
    color: 'amber',
  },
  {
    icon: Zap,
    title: 'Motores Eficientes',
    description:
      'Equipados con motores de alta eficiencia y bajo consumo energético, disponibles en opciones monofásicas, bifásicas o trifásicas.',
    color: 'purple',
  },
  {
    icon: Wrench,
    title: 'Fácil Mantenimiento',
    description:
      'Diseño que permite acceso frontal para inspecciones y mantenimiento sin necesidad de desmontaje completo.',
    color: 'blue',
  },
  {
    icon: Wind,
    title: 'Diseño Aerodinámico',
    description:
      'Forma tipo hongo optimizada para maximizar el flujo de aire y proteger el motor de las condiciones climáticas.',
    color: 'teal',
  },
  {
    icon: Droplets,
    title: 'Resistente a la Intemperie',
    description:
      'Protección completa contra lluvia, polvo y condiciones ambientales adversas, garantizando operación continua.',
    color: 'cyan',
  },
  {
    icon: Shield,
    title: 'Cumplimiento Normativo',
    description:
      'Cumplen con estándares de seguridad e higiene para cocinas industriales y entornos comerciales exigentes.',
    color: 'red',
  },
];

export default function CaracteristicasExtractoresTipoHongo() {
  const colorClasses = {
    sky: 'bg-sky-100 text-sky-600',
    green: 'bg-green-100 text-green-600',
    amber: 'bg-amber-100 text-amber-600',
    purple: 'bg-purple-100 text-purple-600',
    blue: 'bg-blue-100 text-blue-600',
    teal: 'bg-teal-100 text-teal-600',
    cyan: 'bg-cyan-100 text-cyan-600',
    red: 'bg-red-100 text-red-600',
  };

  return (
    <section className="w-full bg-white py-16 md:py-20">
      <MaxWidthWrapper>
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
              Características Destacadas
            </h2>
            <p className="mx-auto max-w-2xl text-lg font-medium text-slate-600">
              Tecnología de vanguardia y diseño robusto para máxima eficiencia
              en ventilación industrial
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(feature => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div
                    className={`mb-4 inline-flex rounded-lg p-3 ${colorClasses[feature.color as keyof typeof colorClasses]}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed font-medium text-slate-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
