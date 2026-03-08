'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Microscope, Thermometer } from 'lucide-react';
import Image from 'next/image';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Separator } from '@/components/ui/separator';

const steps = [
  {
    icon: Lightbulb,
    title: 'Rayos solares',
    description: 'La radiación solar incide sobre la superficie del techo',
    stat: '100%',
    statLabel: 'Radiación incidente',
    image: null as string | null,
  },
  {
    icon: Microscope,
    title: 'Microesferas',
    description:
      'La pintura contiene millones de microesferas huecas que reflejan la radiación',
    stat: 'Millones',
    statLabel: 'Microesferas por m²',
    image: null as string | null,
  },
  {
    icon: Thermometer,
    title: 'Reducción térmica',
    description:
      'La temperatura de la superficie baja drásticamente hasta 20°C menos',
    stat: '−20°C',
    statLabel: 'En superficie',
    image: null as string | null,
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
        <div className="space-y-10">
          <div className="text-center">
            <p className="mb-2 text-sm font-semibold tracking-widest text-primary uppercase">
              Tecnología
            </p>
            <h2 className="mb-3 text-2xl font-bold text-foreground md:text-3xl">
              La ciencia detrás de la frescura
            </h2>
            <p className="mx-auto max-w-xl text-sm text-muted-foreground">
              La pintura térmica actúa como un escudo que refleja la radiación
              solar antes de que se convierta en calor dentro de tu espacio
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {steps.map(step => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  variants={itemVariants}
                  className="flex flex-col rounded-xl border border-border bg-white"
                >
                  <div className="flex aspect-[16/10] items-center justify-center bg-muted/30">
                    {step.image ? (
                      <Image
                        src={step.image}
                        alt={step.title}
                        width={400}
                        height={250}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Icon className="h-10 w-10 text-muted-foreground/40" />
                    )}
                  </div>
                  <Separator />
                  <div className="p-5">
                    <p className="mb-1 text-xs font-semibold text-primary">
                      {step.stat} — {step.statLabel}
                    </p>
                    <h3 className="mb-1.5 text-base font-bold text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Comparison: sin / con pintura */}
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 flex aspect-[21/9] items-center justify-center rounded-xl border border-border bg-white">
              <p className="text-xs text-muted-foreground">
                Imagen comparativa pendiente
              </p>
            </div>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-sm font-medium text-foreground">
                  <span>Sin pintura térmica</span>
                  <span className="font-semibold text-destructive">65°C</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="h-full rounded-full bg-destructive"
                    initial={{ width: 0 }}
                    whileInView={{ width: '85%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-sm font-medium text-foreground">
                  <span>Con pintura térmica</span>
                  <span className="font-semibold text-primary">38°C</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    initial={{ width: 0 }}
                    whileInView={{ width: '50%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
