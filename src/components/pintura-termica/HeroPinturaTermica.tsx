'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { buildWhatsAppUrl } from '@/config/site';

const badges = ['Hogares', 'Bodegas', 'Fábricas', 'Galpones', 'Recintos'];

export default function HeroPinturaTermica() {
  return (
    <section className="relative w-full overflow-hidden bg-slate-950">
      <Image
        src="/products/pintura-termica/hero.png"
        alt="Trabajador aplicando pintura térmica reflectiva en techo de concreto bajo el sol"
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover object-center opacity-40"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent" />

      <MaxWidthWrapper className="relative z-10">
        <div className="flex min-h-[85vh] flex-col justify-center py-20 md:py-28">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="badge-nuevo mb-6 inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-500/20 px-3 py-1.5 text-xs font-semibold text-amber-300">
                <Sparkles className="h-3.5 w-3.5" />
                NUEVO PRODUCTO
              </span>
            </motion.div>

            <motion.h1
              className="mb-6 text-4xl leading-[1.1] font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Reduce hasta{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  20°C
                </span>
              </span>
              <br />
              la temperatura
              <br />
              de tu terraza
            </motion.h1>

            <motion.p
              className="mb-8 max-w-lg text-lg font-medium text-slate-300 sm:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Pintura con <strong className="text-white">microesferas</strong>{' '}
              que refleja los rayos solares y transforma cualquier superficie en
              un escudo contra el calor.
            </motion.p>

            <motion.div
              className="mb-12 flex flex-col gap-3 sm:flex-row sm:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link
                href={buildWhatsAppUrl('Pintura Térmica')}
                target="_blank"
                className="group flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-amber-500/25 transition-all hover:scale-105 hover:shadow-xl hover:shadow-amber-500/30"
              >
                Cotizar ahora
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#como-funciona"
                className="flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
              >
                Ver cómo funciona
                <ChevronDown className="h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <span className="text-sm font-medium text-slate-400">
                Aplicable en:
              </span>
              {badges.map(b => (
                <span
                  key={b}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300"
                >
                  {b}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Stat floating card */}
          <motion.div
            className="absolute right-8 bottom-20 hidden rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-md lg:block"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="space-y-3">
              <div className="flex items-end gap-2">
                <span className="text-5xl font-bold text-amber-400">−20°</span>
                <span className="mb-1 text-lg font-semibold text-white">C</span>
              </div>
              <p className="text-sm font-medium text-slate-300">
                Reducción en temperatura
                <br />
                superficial del techo
              </p>
              <div className="flex items-center gap-4 border-t border-white/10 pt-3">
                <div>
                  <p className="text-2xl font-bold text-white">85%</p>
                  <p className="text-xs text-slate-400">Reflexión solar</p>
                </div>
                <div className="h-8 w-px bg-white/20" />
                <div>
                  <p className="text-2xl font-bold text-white">5</p>
                  <p className="text-xs text-slate-400">Años garantía</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
