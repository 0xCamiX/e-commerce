'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Microscope, RotateCcw, Thermometer } from 'lucide-react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

const steps = [
  {
    icon: Lightbulb,
    title: 'Rayos solares',
    description: 'La radiación solar incide sobre la superficie del techo',
    color: 'bg-amber-100 text-amber-600',
    stat: '100%',
    statLabel: 'Radiación incidente',
  },
  {
    icon: Microscope,
    title: 'Microesferas cerámicas',
    description:
      'La pintura contiene millones de microesferas huecas de cerámica',
    color: 'bg-sky-100 text-sky-600',
    stat: 'Millones',
    statLabel: 'Microesferas por m²',
  },
  {
    icon: RotateCcw,
    title: 'Reflexión solar',
    description: 'Las microesferas reflejan hasta el 85% de la radiación solar',
    color: 'bg-green-100 text-green-600',
    stat: '85%',
    statLabel: 'Reflexión',
  },
  {
    icon: Thermometer,
    title: 'Reducción térmica',
    description:
      'La temperatura de la superficie baja drásticamente hasta 20°C menos',
    color: 'bg-orange-100 text-orange-600',
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
    <section
      id="como-funciona"
      className="w-full bg-gradient-to-b from-slate-50 to-white py-20 md:py-28"
    >
      <MaxWidthWrapper>
        <div className="space-y-16">
          <div className="text-center">
            <p className="mb-2 text-sm font-semibold tracking-widest text-amber-600 uppercase">
              Tecnología
            </p>
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
              La ciencia detrás de la frescura
            </h2>
            <p className="mx-auto max-w-2xl text-lg font-medium text-slate-600">
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
                <motion.div
                  key={step.title}
                  variants={itemVariants}
                  className="group relative rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  {idx < steps.length - 1 && (
                    <div className="absolute top-1/2 -right-3 z-10 hidden text-slate-300 lg:block">
                      →
                    </div>
                  )}
                  <div className="mb-4 flex items-center justify-between">
                    <div className={`inline-flex rounded-lg p-3 ${step.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-500">
                      {idx + 1}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed font-medium text-slate-600">
                    {step.description}
                  </p>
                  <div className="border-t border-slate-100 pt-3">
                    <p className="text-2xl font-bold text-slate-900">
                      {step.stat}
                    </p>
                    <p className="text-xs font-medium text-slate-500">
                      {step.statLabel}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Comparison bar */}
          <div className="mx-auto max-w-2xl space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm font-medium text-slate-700">
                <span>Sin pintura térmica</span>
                <span className="font-semibold text-red-600">
                  85% absorción
                </span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-red-400 to-red-500"
                  initial={{ width: 0 }}
                  whileInView={{ width: '85%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm font-medium text-slate-700">
                <span>Con pintura térmica</span>
                <span className="font-semibold text-green-600">
                  85% reflexión
                </span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-green-400 to-green-500"
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
