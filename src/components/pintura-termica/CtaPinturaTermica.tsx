'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Phone } from 'lucide-react';
import Link from 'next/link';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import { buildWhatsAppUrl, siteConfig } from '@/config/site';

export default function CtaPinturaTermica() {
  return (
    <section className="w-full bg-foreground py-12 md:py-16">
      <MaxWidthWrapper>
        <motion.div
          className="space-y-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-background md:text-3xl">
              ¿Listo para enfriar tu espacio?
            </h2>
            <p className="mx-auto max-w-xl text-sm font-medium text-background/60 sm:text-base">
              Cotización sin compromiso · Respuesta en menos de 2 horas ·
              Asesoría personalizada gratuita
            </p>
          </div>

          <div className="mx-auto flex max-w-xl flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="shadow-lg">
              <Link href={buildWhatsAppUrl('Pintura Térmica')} target="_blank">
                <Icons.whatsapp className="mr-2 h-5 w-5" />
                Cotizar por WhatsApp
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-background/20 bg-background/5 text-background backdrop-blur-sm hover:border-background/40 hover:bg-background/10 hover:text-background"
            >
              <Link href={`tel:${siteConfig.contact.phone}`}>
                <Phone className="mr-2 h-5 w-5" />
                Llamar ahora
              </Link>
            </Button>
          </div>

          <Card className="mx-auto max-w-lg border-background/10 bg-background/5 p-6 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              <p className="font-semibold text-background">
                Información de contacto
              </p>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
              <div>
                <p className="font-medium text-background/50">Teléfono</p>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="font-semibold text-background hover:text-primary"
                >
                  {siteConfig.contact.phone}
                </a>
              </div>
              <div>
                <p className="font-medium text-background/50">Email</p>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="font-semibold text-background hover:text-primary"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
              <div>
                <p className="font-medium text-background/50">Ubicación</p>
                <p className="font-semibold text-background">
                  {siteConfig.contact.address}
                </p>
              </div>
            </div>
          </Card>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-background/50">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Envío a nivel nacional
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-chart-4" />
              Garantía de 5 años
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-chart-3" />
              Asesoría gratuita
            </span>
          </div>
        </motion.div>
      </MaxWidthWrapper>
    </section>
  );
}
