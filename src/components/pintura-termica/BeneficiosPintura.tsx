'use client';

import { motion } from 'framer-motion';
import { Droplets, Shield, Thermometer, Zap } from 'lucide-react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

const benefits = [
  {
    icon: Thermometer,
    stat: '−20°C',
    title: 'Reducción térmica',
    description:
      'Hasta 20 grados Celsius menos en la temperatura superficial del techo',
    gradient: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50',
  },
  {
    icon: Zap,
    stat: 'Hasta 30%',
    title: 'Ahorro en climatización',
    description:
      'Menor carga calorífica significa menor consumo en aire acondicionado o ventiladores',
    gradient: 'from-amber-500 to-yellow-500',
    bgColor: 'bg-amber-50',
  },
  {
    icon: Droplets,
    stat: 'IP65',
    title: 'Resistente al agua',
    description:
      'Fórmula impermeabilizante integrada que protege la superficie contra la lluvia',
    gradient: 'from-sky-500 to-blue-500',
    bgColor: 'bg-sky-50',
  },
  {
    icon: Shield,
    stat: '5 años',
    title: 'Garantía de durabilidad',
    description:
      'Resistente a rayos UV, ciclos de lluvia y condiciones climáticas tropicales',
    gradient: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50',
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
    <section className="w-full bg-white py-20 md:py-28">
      <MaxWidthWrapper>
        <div className="space-y-16">
          <div className="text-center">
            <p className="mb-2 text-sm font-semibold tracking-widest text-amber-600 uppercase">
              Beneficios
            </p>
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
              Resultados que se sienten
            </h2>
            <p className="mx-auto max-w-2xl text-lg font-medium text-slate-600">
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
                  className={`group overflow-hidden rounded-xl border border-slate-200 ${benefit.bgColor} p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg`}
                >
                  <div
                    className={`mb-4 inline-flex rounded-lg bg-gradient-to-r p-3 ${benefit.gradient} shadow-lg`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <p className="mb-1 text-3xl font-bold text-slate-900">
                    {benefit.stat}
                  </p>
                  <h3 className="mb-2 text-lg font-bold text-slate-900">
                    {benefit.title}
                  </h3>
                  <p className="text-sm leading-relaxed font-medium text-slate-600">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
