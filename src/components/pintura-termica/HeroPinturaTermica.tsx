'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { buildWhatsAppUrl } from '@/config/site';

const badges = ['Hogares', 'Bodegas', 'Fábricas', 'Galpones', 'Recintos'];

export default function HeroPinturaTermica() {
  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-foreground"
    >
      <Image
        src="/products/pintura-termica/hero.png"
        alt="Trabajador aplicando pintura térmica reflectiva en techo de concreto bajo el sol"
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover object-center opacity-40"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />

      <MaxWidthWrapper className="relative z-10">
        <div className="flex min-h-[85vh] flex-col justify-center py-12 md:py-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Badge
                variant="outline"
                className="mb-6 border-primary/30 bg-primary/20 text-primary-foreground"
              >
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                NUEVO PRODUCTO
              </Badge>
            </motion.div>

            <motion.h1
              className="mb-6 text-2xl leading-[1.1] font-bold tracking-tight text-white sm:text-3xl md:text-4xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Reduce hasta{' '}
              <span className="bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
                20°C
              </span>
              <br />
              la temperatura
              <br />
              de tu terraza
            </motion.h1>

            <motion.p
              className="mb-8 max-w-lg text-sm font-medium text-white/70 sm:text-base"
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
              <Button asChild size="lg" className="shadow-lg">
                <Link
                  href={buildWhatsAppUrl('Pintura Térmica')}
                  target="_blank"
                >
                  Cotizar ahora
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/20 bg-white/5 text-white backdrop-blur-sm hover:border-white/40 hover:bg-white/10 hover:text-white"
              >
                <Link href="#como-funciona">
                  Ver cómo funciona
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <span className="text-sm font-medium text-white/50">
                Aplicable en:
              </span>
              {badges.map(b => (
                <Badge
                  key={b}
                  variant="outline"
                  className="border-white/10 bg-white/5 text-white/80"
                >
                  {b}
                </Badge>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="absolute right-8 bottom-20 hidden rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-md lg:block"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="space-y-3">
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-primary">−20°</span>
                <span className="mb-1 text-base font-semibold text-white">
                  C
                </span>
              </div>
              <p className="text-sm font-medium text-white/70">
                Reducción en temperatura
                <br />
                superficial del techo
              </p>
              <div className="flex items-center gap-4 border-t border-white/10 pt-3">
                <div>
                  <p className="text-xl font-bold text-white">85%</p>
                  <p className="text-xs text-white/50">Reflexión solar</p>
                </div>
                <div className="h-8 w-px bg-white/20" />
                <div>
                  <p className="text-xl font-bold text-white">5</p>
                  <p className="text-xs text-white/50">Años garantía</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
