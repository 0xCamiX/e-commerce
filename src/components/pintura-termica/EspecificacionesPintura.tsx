import { CheckCircle } from 'lucide-react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

const specifications = [
  { property: 'Reflectancia solar', value: '≥ 85% (ASTM E903)' },
  { property: 'Emisividad térmica', value: '≥ 0.90' },
  { property: 'Índice de reflectancia solar', value: 'SRI ≥ 104' },
  { property: 'Rendimiento', value: '4–6 m² por litro' },
  { property: 'Capas recomendadas', value: '2 manos' },
  { property: 'Tiempo de secado', value: '2–4 horas por mano' },
  { property: 'Temperatura de aplicación', value: '10°C – 40°C' },
  { property: 'Resistencia UV', value: 'Clase A (10 años)' },
  { property: 'Base', value: 'Al agua / acrílica' },
  { property: 'Colores disponibles', value: 'Blanco, Gris Claro, Beige' },
  { property: 'Garantía', value: '5 años' },
];

const highlights = [
  'Certificada bajo estándares ASTM',
  'No tóxica ni inflamable',
  'Bajo olor — aplicación sin molestias',
  'Resistente a hongos y moho',
  'Secado rápido — 2 manos en un día',
  'Compatible con rodillo, brocha y airless',
];

export default function EspecificacionesPintura() {
  return (
    <section id="especificaciones" className="w-full bg-white py-20 md:py-28">
      <MaxWidthWrapper>
        <div className="space-y-16">
          <div className="text-center">
            <p className="mb-2 text-sm font-semibold tracking-widest text-amber-600 uppercase">
              Especificaciones
            </p>
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
              Ficha técnica del producto
            </h2>
            <p className="mx-auto max-w-2xl text-lg font-medium text-slate-600">
              Datos técnicos respaldados por pruebas de laboratorio y estándares
              internacionales
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            {/* Table */}
            <div className="lg:col-span-3">
              <div className="overflow-hidden rounded-xl border border-slate-200 shadow-lg">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-amber-500 to-orange-500">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-white">
                        Propiedad
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-white">
                        Valor
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {specifications.map((spec, idx) => (
                      <tr
                        key={spec.property}
                        className={`transition-colors hover:bg-slate-50 ${idx % 2 === 0 ? 'bg-slate-50/50' : ''}`}
                      >
                        <td className="px-6 py-3 text-sm font-semibold text-slate-900">
                          {spec.property}
                        </td>
                        <td className="px-6 py-3 font-mono text-sm font-medium text-slate-700">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Highlights */}
            <div className="lg:col-span-2">
              <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-amber-50 to-orange-50 p-8 shadow-sm">
                <h3 className="mb-6 text-xl font-bold text-slate-900">
                  Ventajas adicionales
                </h3>
                <ul className="space-y-4">
                  {highlights.map(item => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm font-medium text-slate-700"
                    >
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
