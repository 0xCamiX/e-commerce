'use client';

import { motion } from 'framer-motion';
import { Droplets, Shield, Thermometer, Zap } from 'lucide-react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Separator } from '@/components/ui/separator';

const benefits = [
  {
    icon: Thermometer,
    stat: '−20°C',
    title: 'Reducción térmica',
    description:
      'Hasta 20 grados Celsius menos en la temperatura superficial del techo.',
  },
  {
    icon: Zap,
    stat: 'Hasta 30%',
    title: 'Ahorro en climatización',
    description:
      'Menor carga calorífica significa menor consumo en aire acondicionado o ventiladores.',
  },
  {
    icon: Droplets,
    stat: 'IP65',
    title: 'Resistente al agua',
    description:
      'Fórmula impermeabilizante integrada que protege la superficie contra la lluvia.',
  },
  {
    icon: Shield,
    stat: '5 años',
    title: 'Garantía de durabilidad',
    description:
      'Resistente a rayos UV, ciclos de lluvia y condiciones climáticas tropicales.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export default function BeneficiosPintura() {
  return (
    <section id="beneficios" className="w-full bg-background py-12 md:py-16">
      <MaxWidthWrapper>
        <div className="space-y-10">
          <div className="text-center">
            <p className="mb-2 text-sm font-semibold tracking-widest text-primary uppercase">
              Beneficios
            </p>
            <h2 className="mb-3 text-2xl font-bold text-foreground md:text-3xl">
              Resultados que se sienten
            </h2>
            <p className="mx-auto max-w-xl text-sm text-muted-foreground">
              Beneficios comprobados respaldados por datos reales de nuestras
              instalaciones en el Valle del Cauca
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {benefits.map(benefit => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  variants={cardVariants}
                  className="flex flex-col rounded-xl border border-border bg-white"
                >
                  <div className="flex items-center gap-3 p-5 pb-0">
                    <Icon className="h-5 w-5 text-primary" />
                    <span className="text-xl font-bold tracking-tight text-foreground">
                      {benefit.stat}
                    </span>
                  </div>
                  <div className="px-5 pt-3 pb-5">
                    <h3 className="mb-1.5 text-sm font-bold text-foreground">
                      {benefit.title}
                    </h3>
                    <Separator className="mb-3" />
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
