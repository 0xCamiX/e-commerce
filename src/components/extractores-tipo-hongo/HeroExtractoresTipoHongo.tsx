import { Shield, Wind, Zap } from 'lucide-react';
import Link from 'next/link';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function HeroExtractoresTipoHongo() {
  return (
    <section id="hero" className="w-full bg-muted/50 py-12 md:py-16">
      <MaxWidthWrapper>
        <div className="flex flex-col items-center text-center">
          <Badge variant="secondary" className="mb-6 gap-2 text-sm">
            <Wind className="h-4 w-4" />
            Nuevo Producto
          </Badge>

          <h1 className="mb-6 text-2xl leading-tight font-bold text-foreground sm:text-3xl md:text-4xl">
            Extractores Tipo{' '}
            <span className="inline-block rounded-md bg-primary px-3 py-1 font-medium text-primary-foreground shadow-lg">
              Hongo
            </span>
            <br className="hidden sm:block" />
            <span className="text-muted-foreground">
              Ventilación Industrial Premium
            </span>
          </h1>

          <p className="mb-8 max-w-3xl text-sm font-medium text-muted-foreground sm:text-base">
            Solución profesional para la extracción eficiente de{' '}
            <b className="text-foreground">humos, vapores, grasas y olores</b>{' '}
            en entornos industriales y comerciales. Diseño aerodinámico que
            protege el motor y maximiza el flujo de aire.
          </p>

          <div className="mb-10 flex flex-wrap items-center justify-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <div className="rounded-full bg-accent p-4">
                <Shield className="h-6 w-6 text-accent-foreground" />
              </div>
              <p className="text-sm font-semibold text-foreground">
                Alta Durabilidad
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="rounded-full bg-accent p-4">
                <Zap className="h-6 w-6 text-accent-foreground" />
              </div>
              <p className="text-sm font-semibold text-foreground">
                Eficiencia Energética
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="rounded-full bg-accent p-4">
                <Wind className="h-6 w-6 text-accent-foreground" />
              </div>
              <p className="text-sm font-semibold text-foreground">
                Alto Flujo de Aire
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <Button asChild size="lg" className="shadow-lg">
              <Link
                href="https://wa.me/573177525559?text=Hola,%20me%20interesan%20los%20Extractores%20Tipo%20Hongo"
                target="_blank"
              >
                Solicitar Cotización
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#especificaciones">Ver Especificaciones</Link>
            </Button>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
