'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Phone } from 'lucide-react';
import Link from 'next/link';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Icons } from '@/components/ui/icons';
import { buildWhatsAppUrl, siteConfig } from '@/config/site';

export default function CtaPinturaTermica() {
  return (
    <section className="w-full bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 py-20 md:py-28">
      <MaxWidthWrapper>
        <motion.div
          className="space-y-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              ¿Listo para enfriar tu espacio?
            </h2>
            <p className="mx-auto max-w-xl text-lg font-medium text-slate-400">
              Cotización sin compromiso · Respuesta en menos de 2 horas ·
              Asesoría personalizada gratuita
            </p>
          </div>

          <div className="mx-auto flex max-w-xl flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href={buildWhatsAppUrl('Pintura Térmica')}
              target="_blank"
              className="group flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-green-500/25 transition-all hover:scale-105 hover:shadow-xl hover:shadow-green-500/30"
            >
              <Icons.whatsapp className="h-6 w-6" />
              Cotizar por WhatsApp
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href={`tel:${siteConfig.contact.phone}`}
              className="flex items-center justify-center gap-3 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
            >
              <Phone className="h-5 w-5" />
              Llamar ahora
            </Link>
          </div>

          <div className="mx-auto max-w-lg space-y-4 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2">
              <MessageCircle className="h-5 w-5 text-amber-400" />
              <p className="font-semibold text-white">
                Información de contacto
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
              <div>
                <p className="font-medium text-slate-400">Teléfono</p>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="font-semibold text-white hover:text-amber-400"
                >
                  {siteConfig.contact.phone}
                </a>
              </div>
              <div>
                <p className="font-medium text-slate-400">Email</p>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="font-semibold text-white hover:text-amber-400"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
              <div>
                <p className="font-medium text-slate-400">Ubicación</p>
                <p className="font-semibold text-white">
                  {siteConfig.contact.address}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-slate-500">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Envío a nivel nacional
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              Garantía de 5 años
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-sky-500" />
              Asesoría gratuita
            </span>
          </div>
        </motion.div>
      </MaxWidthWrapper>
    </section>
  );
}
