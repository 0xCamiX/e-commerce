'use client';

import { motion } from 'framer-motion';
import { Building2, Factory, Home, Warehouse } from 'lucide-react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const surfaces = [
  {
    icon: Building2,
    name: 'Losa de concreto plana',
    description: 'La superficie más común. Máximo beneficio térmico.',
    benefit: 'Máximo beneficio',
  },
  {
    icon: Factory,
    name: 'Teja metálica / zinc',
    description:
      'Alta ganancia térmica. Ideal para bodegas y galpones industriales.',
    benefit: 'Ideal para industria',
  },
  {
    icon: Warehouse,
    name: 'Eternit / fibrocemento',
    description:
      'Muy común en Colombia. Compatible directo con excelente adherencia.',
    benefit: 'Compatible directo',
  },
  {
    icon: Home,
    name: 'Teja de barro',
    description:
      'Requiere imprimante previo. Excelente resultado en viviendas tradicionales.',
    benefit: 'Con imprimante',
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
    <section id="aplicaciones" className="w-full bg-muted/50 py-12 md:py-16">
      <MaxWidthWrapper>
        <div className="space-y-10">
          <div className="text-center">
            <p className="mb-2 text-sm font-semibold tracking-widest text-primary uppercase">
              Compatibilidad
            </p>
            <h2 className="mb-3 text-2xl font-bold text-foreground md:text-3xl">
              ¿Funciona en tu techo?
            </h2>
            <p className="mx-auto max-w-xl text-sm text-muted-foreground">
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
                  className="flex flex-col rounded-xl border border-border bg-white"
                >
                  <div className="flex items-center gap-3 p-5 pb-0">
                    <Icon className="h-5 w-5 text-primary" />
                    <Badge variant="secondary" className="text-[10px]">
                      {surface.benefit}
                    </Badge>
                  </div>
                  <div className="px-5 pt-3 pb-5">
                    <h3 className="mb-1.5 text-sm font-bold text-foreground">
                      {surface.name}
                    </h3>
                    <Separator className="mb-3" />
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {surface.description}
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
