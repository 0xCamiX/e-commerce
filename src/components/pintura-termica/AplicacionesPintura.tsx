'use client';

import { motion } from 'framer-motion';
import { Building2, Factory, Home, Warehouse } from 'lucide-react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

const surfaces = [
  {
    icon: Building2,
    name: 'Losa de concreto plana',
    description: 'La superficie más común. Máximo beneficio térmico.',
    benefit: 'Máximo beneficio',
    color: 'from-slate-500 to-gray-600',
    bgColor: 'bg-slate-50',
  },
  {
    icon: Factory,
    name: 'Teja metálica / zinc',
    description:
      'Alta ganancia térmica. Ideal para bodegas y galpones industriales.',
    benefit: 'Ideal para industria',
    color: 'from-sky-500 to-blue-600',
    bgColor: 'bg-sky-50',
  },
  {
    icon: Warehouse,
    name: 'Eternit / fibrocemento',
    description:
      'Muy común en Colombia. Compatible directo con excelente adherencia.',
    benefit: 'Compatible directo',
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
  },
  {
    icon: Home,
    name: 'Teja de barro',
    description:
      'Requiere imprimante previo. Excelente resultado en viviendas tradicionales.',
    benefit: 'Con imprimante',
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-50',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export default function AplicacionesPintura() {
  return (
    <section className="w-full bg-gradient-to-b from-slate-50 to-white py-20 md:py-28">
      <MaxWidthWrapper>
        <div className="space-y-16">
          <div className="text-center">
            <p className="mb-2 text-sm font-semibold tracking-widest text-amber-600 uppercase">
              Compatibilidad
            </p>
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
              ¿Funciona en tu techo?
            </h2>
            <p className="mx-auto max-w-2xl text-lg font-medium text-slate-600">
              La pintura térmica se adapta a los tipos de superficie más comunes
              en Colombia
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {surfaces.map(surface => {
              const Icon = surface.icon;
              return (
                <motion.div
                  key={surface.name}
                  variants={itemVariants}
                  className={`group overflow-hidden rounded-xl border border-slate-200 ${surface.bgColor} p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg`}
                >
                  <div
                    className={`mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-r ${surface.color} shadow-lg`}
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-slate-900">
                    {surface.name}
                  </h3>
                  <p className="mb-3 text-sm leading-relaxed font-medium text-slate-600">
                    {surface.description}
                  </p>
                  <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
                    {surface.benefit}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
