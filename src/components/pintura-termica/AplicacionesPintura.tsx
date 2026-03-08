'use client';

import { motion } from 'framer-motion';
import { Building2, Factory, Home, Warehouse } from 'lucide-react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

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
        <div className="space-y-16">
          <div className="text-center">
            <p className="mb-2 text-sm font-semibold tracking-widest text-primary uppercase">
              Compatibilidad
            </p>
            <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
              ¿Funciona en tu techo?
            </h2>
            <p className="mx-auto max-w-2xl text-sm font-medium text-muted-foreground sm:text-base">
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
                <motion.div key={surface.name} variants={itemVariants}>
                  <Card className="group h-full p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-primary shadow-lg">
                      <Icon className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <h3 className="mb-2 text-base font-bold text-foreground">
                      {surface.name}
                    </h3>
                    <p className="mb-3 text-sm leading-relaxed font-medium text-muted-foreground">
                      {surface.description}
                    </p>
                    <Badge variant="secondary">{surface.benefit}</Badge>
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
