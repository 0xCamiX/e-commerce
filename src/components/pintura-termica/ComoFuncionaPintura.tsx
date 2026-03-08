'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Microscope, RotateCcw, Thermometer } from 'lucide-react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Card } from '@/components/ui/card';

const steps = [
  {
    icon: Lightbulb,
    title: 'Rayos solares',
    description: 'La radiación solar incide sobre la superficie del techo',
    stat: '100%',
    statLabel: 'Radiación incidente',
  },
  {
    icon: Microscope,
    title: 'Microesferas cerámicas',
    description:
      'La pintura contiene millones de microesferas huecas de cerámica',
    stat: 'Millones',
    statLabel: 'Microesferas por m²',
  },
  {
    icon: RotateCcw,
    title: 'Reflexión solar',
    description: 'Las microesferas reflejan hasta el 85% de la radiación solar',
    stat: '85%',
    statLabel: 'Reflexión',
  },
  {
    icon: Thermometer,
    title: 'Reducción térmica',
    description:
      'La temperatura de la superficie baja drásticamente hasta 20°C menos',
    stat: '−20°C',
    statLabel: 'En superficie',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export default function ComoFuncionaPintura() {
  return (
    <section id="como-funciona" className="w-full bg-muted/50 py-12 md:py-16">
      <MaxWidthWrapper>
        <div className="space-y-16">
          <div className="text-center">
            <p className="mb-2 text-sm font-semibold tracking-widest text-primary uppercase">
              Tecnología
            </p>
            <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
              La ciencia detrás de la frescura
            </h2>
            <p className="mx-auto max-w-2xl text-sm font-medium text-muted-foreground sm:text-base">
              La pintura térmica actúa como un escudo que refleja la radiación
              solar antes de que se convierta en calor dentro de tu espacio
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div key={step.title} variants={itemVariants}>
                  <Card className="group relative h-full p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
                    {idx < steps.length - 1 && (
                      <div className="absolute top-1/2 -right-3 z-10 hidden text-muted-foreground lg:block">
                        →
                      </div>
                    )}
                    <div className="mb-4 flex items-center justify-between">
                      <div className="inline-flex rounded-lg bg-accent p-3 text-accent-foreground">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-bold text-muted-foreground">
                        {idx + 1}
                      </span>
                    </div>
                    <h3 className="mb-2 text-base font-bold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed font-medium text-muted-foreground">
                      {step.description}
                    </p>
                    <div className="border-t border-border pt-3">
                      <p className="text-xl font-bold text-foreground">
                        {step.stat}
                      </p>
                      <p className="text-xs font-medium text-muted-foreground">
                        {step.statLabel}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          <div className="mx-auto max-w-2xl space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm font-medium text-foreground">
                <span>Sin pintura térmica</span>
                <span className="font-semibold text-destructive">
                  85% absorción
                </span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full bg-destructive"
                  initial={{ width: 0 }}
                  whileInView={{ width: '85%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm font-medium text-foreground">
                <span>Con pintura térmica</span>
                <span className="font-semibold text-primary">
                  85% reflexión
                </span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  initial={{ width: 0 }}
                  whileInView={{ width: '85%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                />
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
