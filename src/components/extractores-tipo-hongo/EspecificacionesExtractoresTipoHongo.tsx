'use client';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Link from 'next/link';
import { CheckCircle, Ruler, Gauge, Zap, Settings } from 'lucide-react';

const specifications = [
  {
    size: '12"',
    diameter: '30.5 cm',
    airflow: '850 - 1,200 CFM',
    motor: 'Monofásico / Trifásico',
    voltage: '110V / 220V',
    transmission: 'Directa / Correas',
    recommended: false,
  },
  {
    size: '16"',
    diameter: '40.6 cm',
    airflow: '1,500 - 2,000 CFM',
    motor: 'Monofásico / Trifásico',
    voltage: '110V / 220V',
    transmission: 'Directa / Correas',
    recommended: false,
  },
  {
    size: '20"',
    diameter: '50.8 cm',
    airflow: '2,500 - 3,200 CFM',
    motor: 'Monofásico / Trifásico',
    voltage: '110V / 220V',
    transmission: 'Directa / Correas',
    recommended: true,
  },
  {
    size: '24"',
    diameter: '61 cm',
    airflow: '3,500 - 4,500 CFM',
    motor: 'Monofásico / Trifásico',
    voltage: '110V / 220V',
    transmission: 'Directa / Correas',
    recommended: false,
  },
  {
    size: '30"',
    diameter: '76.2 cm',
    airflow: '5,000 - 6,500 CFM',
    motor: 'Trifásico',
    voltage: '220V / 380V',
    transmission: 'Correas',
    recommended: false,
  },
  {
    size: '38"',
    diameter: '96.5 cm',
    airflow: '8,000 - 10,000 CFM',
    motor: 'Trifásico',
    voltage: '220V / 380V',
    transmission: 'Correas',
    recommended: false,
  },
];

const materials = [
  'Aluminio moldeado de alta calidad',
  'Acero galvanizado G-90',
  'Pintura epóxica resistente a la corrosión',
  'Componentes de acero inoxidable',
];

const warranty = {
  title: 'Garantía y Soporte',
  items: [
    '5 años de garantía en materiales y mano de obra',
    'Soporte técnico especializado',
    'Servicio de mantenimiento preventivo',
    'Asesoría en instalación y diseño',
  ],
};

export default function EspecificacionesExtractoresTipoHongo() {
  return (
    <section id="especificaciones" className="w-full bg-white py-16 md:py-20">
      <MaxWidthWrapper>
        <div className="space-y-16">
          {/* Header */}
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
              Especificaciones Técnicas
            </h2>
            <p className="mx-auto max-w-2xl text-lg font-medium text-slate-600">
              Modelos disponibles y características técnicas para cada necesidad
            </p>
          </div>

          {/* Specifications Table */}
          <div className="overflow-hidden rounded-xl border border-slate-200 shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-sky-500 to-sky-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white">
                      <div className="flex items-center gap-2">
                        <Ruler className="h-4 w-4" />
                        Tamaño
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white">
                      Diámetro
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white">
                      <div className="flex items-center gap-2">
                        <Gauge className="h-4 w-4" />
                        Flujo de Aire
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        Motor
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white">
                      Voltaje
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white">
                      <div className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        Transmisión
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {specifications.map((spec, idx) => (
                    <tr
                      key={idx}
                      className={`transition-colors hover:bg-slate-50 ${
                        spec.recommended ? 'bg-sky-50' : ''
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-base font-bold text-slate-900">
                            {spec.size}
                          </span>
                          {spec.recommended && (
                            <span className="rounded-full bg-gradient-to-r from-green-500 to-green-600 px-2 py-0.5 text-xs font-semibold text-white">
                              Popular
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-700">
                        {spec.diameter}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-700">
                        {spec.airflow}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-700">
                        {spec.motor}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-700">
                        {spec.voltage}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-700">
                        {spec.transmission}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Materials and Warranty Grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Materials */}
            <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 shadow-sm">
              <h3 className="mb-4 text-xl font-bold text-slate-900">
                Materiales de Construcción
              </h3>
              <ul className="space-y-3">
                {materials.map((material, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm font-medium text-slate-700"
                  >
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                    <span>{material}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Warranty */}
            <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-sky-50 to-white p-8 shadow-sm">
              <h3 className="mb-4 text-xl font-bold text-slate-900">
                {warranty.title}
              </h3>
              <ul className="space-y-3">
                {warranty.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm font-medium text-slate-700"
                  >
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-sky-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 p-8 text-center shadow-lg">
            <h3 className="mb-4 text-2xl font-bold text-white">
              ¿Necesitas asesoría personalizada?
            </h3>
            <p className="mb-6 text-lg font-medium text-sky-50">
              Nuestro equipo de expertos te ayudará a elegir el modelo ideal
              para tu proyecto
            </p>
            <Link
              href="https://wa.me/573177525559?text=Hola,%20necesito%20asesoría%20sobre%20Extractores%20Tipo%20Hongo"
              target="_blank"
              className="inline-block rounded-lg bg-white px-8 py-3 text-base font-semibold text-sky-600 transition-all hover:scale-105 hover:shadow-xl"
            >
              Solicitar Asesoría Gratuita
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
