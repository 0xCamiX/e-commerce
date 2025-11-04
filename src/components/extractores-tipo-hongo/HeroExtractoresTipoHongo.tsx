import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Wind, Shield, Zap } from 'lucide-react';
import Link from 'next/link';

export default function HeroExtractoresTipoHongo() {
  return (
    <section className="w-full bg-gradient-to-b from-slate-50 to-white py-16 md:py-24">
      <MaxWidthWrapper>
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700">
            <Wind className="h-4 w-4" />
            Nuevo Producto
          </div>

          {/* Título principal */}
          <h1 className="mb-6 text-4xl leading-tight font-bold text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl">
            Extractores Tipo{' '}
            <span className="relative inline-block">
              <span className="rounded-md bg-gradient-to-r from-sky-600 to-sky-500 px-3 py-1 font-medium text-white shadow-lg">
                Hongo
              </span>
            </span>
            <br className="hidden sm:block" />
            <span className="text-slate-700">
              Ventilación Industrial Premium
            </span>
          </h1>

          {/* Descripción */}
          <p className="mb-8 max-w-3xl text-lg font-medium text-slate-600 sm:text-xl md:text-2xl">
            Solución profesional para la extracción eficiente de{' '}
            <b>humos, vapores, grasas y olores</b> en entornos industriales y
            comerciales. Diseño aerodinámico que protege el motor y maximiza el
            flujo de aire.
          </p>

          {/* Iconos destacados */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <div className="rounded-full bg-sky-100 p-4">
                <Shield className="h-6 w-6 text-sky-600" />
              </div>
              <p className="text-sm font-semibold text-slate-700">
                Alta Durabilidad
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="rounded-full bg-green-100 p-4">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-sm font-semibold text-slate-700">
                Eficiencia Energética
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="rounded-full bg-amber-100 p-4">
                <Wind className="h-6 w-6 text-amber-600" />
              </div>
              <p className="text-sm font-semibold text-slate-700">
                Alto Flujo de Aire
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <Link
              href="https://wa.me/573177525559?text=Hola,%20me%20interesan%20los%20Extractores%20Tipo%20Hongo"
              target="_blank"
              className="w-full rounded-lg bg-gradient-to-r from-sky-500 to-sky-600 px-8 py-4 text-center text-base font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl sm:w-auto"
            >
              Solicitar Cotización
            </Link>
            <Link
              href="#especificaciones"
              className="w-full rounded-lg border-2 border-slate-300 bg-white px-8 py-4 text-center text-base font-semibold text-slate-700 transition-all hover:border-sky-400 hover:bg-slate-50 sm:w-auto"
            >
              Ver Especificaciones
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
