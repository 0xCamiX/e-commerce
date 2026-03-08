'use client';

import { motion } from 'framer-motion';
import { Droplets, Shield, Thermometer, Zap } from 'lucide-react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Card } from '@/components/ui/card';

const benefits = [
  {
    icon: Thermometer,
    stat: '−20°C',
    title: 'Reducción térmica',
    description:
      'Hasta 20 grados Celsius menos en la temperatura superficial del techo',
  },
  {
    icon: Zap,
    stat: 'Hasta 30%',
    title: 'Ahorro en climatización',
    description:
      'Menor carga calorífica significa menor consumo en aire acondicionado o ventiladores',
  },
  {
    icon: Droplets,
    stat: 'IP65',
    title: 'Resistente al agua',
    description:
      'Fórmula impermeabilizante integrada que protege la superficie contra la lluvia',
  },
  {
    icon: Shield,
    stat: '5 años',
    title: 'Garantía de durabilidad',
    description:
      'Resistente a rayos UV, ciclos de lluvia y condiciones climáticas tropicales',
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
        <div className="space-y-16">
          <div className="text-center">
            <p className="mb-2 text-sm font-semibold tracking-widest text-primary uppercase">
              Beneficios
            </p>
            <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
              Resultados que se sienten
            </h2>
            <p className="mx-auto max-w-2xl text-sm font-medium text-muted-foreground sm:text-base">
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
                <motion.div key={benefit.title} variants={cardVariants}>
                  <Card className="group h-full p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
                    <div className="mb-4 inline-flex rounded-lg bg-primary p-3 shadow-lg">
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <p className="mb-1 text-2xl font-bold text-foreground">
                      {benefit.stat}
                    </p>
                    <h3 className="mb-2 text-base font-bold text-foreground">
                      {benefit.title}
                    </h3>
                    <p className="text-sm leading-relaxed font-medium text-muted-foreground">
                      {benefit.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
