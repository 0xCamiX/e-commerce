'use client';

import {
  ClipboardList,
  FileText,
  Home,
  Layers,
  Paintbrush,
  Printer,
  Ruler,
  User,
  Wind,
} from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { Icons } from '@/components/ui/icons';
import {
  buildQuoteHTML,
  buildSummary,
  buildWhatsAppMessage,
  type ClientData,
  createPendienteDim,
  EXTRACTORS,
  formatCOP,
  generateQuoteNumber,
  getRoofType,
  MATERIALS,
  PAINT_COVERAGE,
  PAINT_PRICE,
  type PendienteDim,
  paintCuñetesFromArea,
  ROOF_TYPES,
  type RoofTypeId,
  syncDims,
  totalArea,
} from '@/lib/cotizador';

const INPUT =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-colors';

export default function CotizadorApp() {
  const [client, setClient] = useState<ClientData>({
    name: '',
    phone: '',
    city: '',
    address: '',
  });
  const [roofType, setRoofType] = useState<RoofTypeId>('two');
  const [dims, setDims] = useState<PendienteDim[]>([
    createPendienteDim(),
    createPendienteDim(),
  ]);
  const [material, setMaterial] = useState('');
  const [selectedExtractor, setSelectedExtractor] = useState<number | null>(
    null,
  );
  const [paintRoof, setPaintRoof] = useState(false);
  const [paintArea, setPaintArea] = useState('');
  const [quoteNote, setQuoteNote] = useState('');
  const quoteNumber = useRef(generateQuoteNumber());

  const area = totalArea(dims);
  const paintAreaNum = Number(paintArea) || 0;
  const suggestedCuñetes = paintCuñetesFromArea(paintAreaNum);
  const summary = buildSummary(
    selectedExtractor,
    area,
    paintRoof,
    paintAreaNum,
  );
  const canQuote = selectedExtractor !== null && area > 0;
  const roofTypeObj = getRoofType(roofType);

  const handleRoofTypeChange = (type: RoofTypeId) => {
    setRoofType(type);
    const count = getRoofType(type).pendientes;
    setDims(syncDims(dims, count));
  };

  const updateDim = (
    index: number,
    field: 'largo' | 'ancho',
    value: string,
  ) => {
    const updated = [...dims];
    updated[index] = { ...updated[index], [field]: value };
    setDims(updated);
  };

  const openPdf = () => {
    const html = buildQuoteHTML({
      summary,
      client,
      roofTypeLabel: roofTypeObj.label,
      material,
      area,
      dims,
      note: quoteNote,
      quoteNumber: quoteNumber.current,
    });
    const w = window.open('', '_blank');
    if (w) {
      w.document.write(html);
      w.document.close();
      setTimeout(() => w.print(), 600);
    }
  };

  const sendWhatsApp = () => {
    const msg = encodeURIComponent(
      buildWhatsAppMessage({
        summary,
        client,
        roofTypeLabel: roofTypeObj.label,
        material,
        area,
        note: quoteNote,
        quoteNumber: quoteNumber.current,
      }),
    );
    const clientNum = client.phone.replace(/\D/g, '');
    if (clientNum.length >= 10) {
      window.open(
        `https://wa.me/57${clientNum.replace(/^57/, '')}?text=${msg}`,
        '_blank',
      );
    }
    setTimeout(
      () => window.open(`https://wa.me/573177525559?text=${msg}`, '_blank'),
      900,
    );
  };

  return (
    <section className="w-full bg-slate-50 py-8 md:py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-slate-900 md:text-4xl">
            Cotizador de Extractores Eólicos
          </h1>
          <p className="text-lg font-medium text-slate-600">
            Calcula la cantidad exacta de extractores según las dimensiones de
            tu techo
          </p>
        </div>

        <div className="space-y-6">
          {/* ── DATOS DEL CLIENTE ───────────────────────────── */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
              <User className="h-5 w-5 text-sky-500" />
              Datos del Cliente
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="client-name"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Nombre completo
                </label>
                <input
                  id="client-name"
                  className={INPUT}
                  value={client.name}
                  onChange={e => setClient({ ...client, name: e.target.value })}
                  placeholder="Nombre del cliente"
                />
              </div>
              <div>
                <label
                  htmlFor="client-phone"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Teléfono / WhatsApp
                </label>
                <input
                  id="client-phone"
                  className={INPUT}
                  value={client.phone}
                  onChange={e =>
                    setClient({ ...client, phone: e.target.value })
                  }
                  placeholder="Ej: 3001234567"
                />
              </div>
              <div>
                <label
                  htmlFor="client-city"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Ciudad
                </label>
                <input
                  id="client-city"
                  className={INPUT}
                  value={client.city}
                  onChange={e => setClient({ ...client, city: e.target.value })}
                  placeholder="Ciudad"
                />
              </div>
              <div>
                <label
                  htmlFor="client-address"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Dirección del proyecto
                </label>
                <input
                  id="client-address"
                  className={INPUT}
                  value={client.address}
                  onChange={e =>
                    setClient({ ...client, address: e.target.value })
                  }
                  placeholder="Dirección"
                />
              </div>
            </div>
          </div>

          {/* ── TIPO DE TECHO ───────────────────────────────── */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
              <Home className="h-5 w-5 text-sky-500" />
              Tipo de Techo
            </h3>
            <div className="mb-6 flex flex-wrap gap-2">
              {ROOF_TYPES.map(r => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => handleRoofTypeChange(r.id)}
                  className={`rounded-lg border-2 px-4 py-2.5 text-sm font-medium transition-all ${
                    roofType === r.id
                      ? 'border-sky-500 bg-sky-50 text-sky-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
            <div className="space-y-4">
              {dims.map((dim, i) => (
                <div key={dim.id}>
                  <p className="mb-2 text-sm font-semibold text-sky-700">
                    Pendiente {i + 1}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor={`${dim.id}-largo`}
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                      >
                        Largo (m)
                      </label>
                      <input
                        id={`${dim.id}-largo`}
                        className={INPUT}
                        type="number"
                        min="0"
                        value={dim.largo}
                        onChange={e => updateDim(i, 'largo', e.target.value)}
                        placeholder="metros"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`${dim.id}-ancho`}
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                      >
                        Ancho (m)
                      </label>
                      <input
                        id={`${dim.id}-ancho`}
                        className={INPUT}
                        type="number"
                        min="0"
                        value={dim.ancho}
                        onChange={e => updateDim(i, 'ancho', e.target.value)}
                        placeholder="metros"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {area > 0 && (
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-sky-50 px-4 py-3 text-sm font-semibold text-sky-700">
                <Ruler className="h-4 w-4" />
                Área total del techo: {area.toFixed(2)} m²
              </div>
            )}
          </div>

          {/* ── MATERIAL DE CUBIERTA ───────────────────────── */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
              <Layers className="h-5 w-5 text-sky-500" />
              Material de la Cubierta
            </h3>
            <select
              className={INPUT}
              value={material}
              onChange={e => setMaterial(e.target.value)}
            >
              <option value="">— Seleccione material —</option>
              {MATERIALS.map(m => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* ── SELECTOR DE EXTRACTOR ──────────────────────── */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
              <Wind className="h-5 w-5 text-sky-500" />
              Tipo de Extractor
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {EXTRACTORS.map(ext => {
                const isSelected = selectedExtractor === ext.id;
                const count = area > 0 ? Math.ceil(area / ext.coverage) : 0;
                return (
                  <button
                    key={ext.id}
                    type="button"
                    onClick={() => setSelectedExtractor(ext.id)}
                    className={`rounded-xl border-2 p-5 text-left transition-all ${
                      isSelected
                        ? 'border-sky-500 bg-sky-50 shadow-md'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-base font-bold text-slate-900">
                        {ext.name}
                      </span>
                      {isSelected && (
                        <span className="rounded-full bg-sky-500 px-2 py-0.5 text-[10px] font-bold text-white">
                          ✓
                        </span>
                      )}
                    </div>
                    <p className="mb-3 text-xs leading-relaxed text-slate-600">
                      {ext.description}
                    </p>
                    <div className="mb-1 text-xs text-slate-500">
                      Cobertura: {ext.coverage} m²/und
                    </div>
                    <div className="text-lg font-bold text-green-600">
                      {formatCOP(ext.price)}
                    </div>
                    {isSelected && area > 0 && (
                      <div className="mt-3 rounded-lg bg-sky-500 px-3 py-2 text-center text-sm font-bold text-white">
                        Cantidad: {count} und
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── PINTURA DEL TECHO ──────────────────────────── */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
              <Paintbrush className="h-5 w-5 text-sky-500" />
              Pintura del Techo
            </h3>
            <label className="flex cursor-pointer items-center gap-3 text-sm font-medium text-slate-700">
              <input
                type="checkbox"
                checked={paintRoof}
                onChange={e => setPaintRoof(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-sky-600 accent-sky-600"
              />
              El cliente desea pintar el techo
            </label>
            {paintRoof && (
              <div className="mt-4 space-y-3">
                <div>
                  <label
                    htmlFor="paint-area"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    ¿Cuántos m² desea pintar?
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      id="paint-area"
                      className={`${INPUT} max-w-[200px]`}
                      type="number"
                      min="1"
                      value={paintArea}
                      onChange={e => setPaintArea(e.target.value)}
                      placeholder="m²"
                    />
                    <Image
                      src="/cuñete.jpg"
                      alt="Cuñete de pintura térmica"
                      width={48}
                      height={48}
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-slate-500">
                    1 cuñete cubre {PAINT_COVERAGE} m² · Precio:{' '}
                    {formatCOP(PAINT_PRICE)} / cuñete
                  </p>
                </div>
                {suggestedCuñetes > 0 && (
                  <div className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
                    <span className="font-semibold">
                      Cuñetes sugeridos: {suggestedCuñetes}
                    </span>
                    <span className="mx-2">·</span>
                    Total: {formatCOP(suggestedCuñetes * PAINT_PRICE)}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── NOTAS ADICIONALES ───────────────────────────── */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
              <FileText className="h-5 w-5 text-sky-500" />
              Notas adicionales
            </h3>
            <textarea
              className={`${INPUT} resize-none`}
              rows={3}
              value={quoteNote}
              onChange={e => setQuoteNote(e.target.value)}
              placeholder="Observaciones, condiciones especiales, tiempo de entrega..."
            />
          </div>

          {/* ── RESUMEN DE COTIZACIÓN ──────────────────────── */}
          {canQuote && (
            <div className="rounded-xl border-2 border-sky-500 bg-white p-6 shadow-lg">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
                <ClipboardList className="h-5 w-5 text-sky-500" />
                Resumen de Cotización
              </h3>

              <div className="mb-4 space-y-2 border-b border-slate-200 pb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Cliente:</span>
                  <span className="font-semibold text-slate-900">
                    {client.name || '—'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Techo:</span>
                  <span className="text-slate-700">
                    {roofTypeObj.label} — {material || '—'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Área total:</span>
                  <span className="font-semibold text-slate-900">
                    {area.toFixed(2)} m²
                  </span>
                </div>
              </div>

              {summary.extractor && (
                <div className="mb-2 flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3 text-sm">
                  <span className="text-slate-700">
                    {summary.extractor.name} ({summary.extractorCount} und ×{' '}
                    {formatCOP(summary.extractor.price)})
                  </span>
                  <span className="font-bold text-slate-900">
                    {formatCOP(summary.extractorTotal)}
                  </span>
                </div>
              )}

              {paintRoof && summary.paintCount > 0 && (
                <div className="mb-2 flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3 text-sm">
                  <span className="text-slate-700">
                    Pintura techo ({summary.paintCount} cuñetes ×{' '}
                    {formatCOP(PAINT_PRICE)})
                  </span>
                  <span className="font-bold text-slate-900">
                    {formatCOP(summary.paintTotal)}
                  </span>
                </div>
              )}

              <div className="mt-4 flex items-center justify-between rounded-lg bg-sky-500 px-5 py-4">
                <span className="text-base font-bold text-white">TOTAL</span>
                <span className="text-xl font-extrabold text-white">
                  {formatCOP(summary.total)}
                </span>
              </div>

              <p className="mt-2 text-xs font-medium text-red-500 italic">
                ⚠️ Los costos de envío pueden variar si el proyecto es fuera de
                Cali.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={openPdf}
                  className="flex items-center gap-2 rounded-lg bg-red-500 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-red-600"
                >
                  <Printer className="h-4 w-4" />
                  Ver / Imprimir PDF
                </button>
                <button
                  type="button"
                  onClick={sendWhatsApp}
                  className="flex items-center gap-2 rounded-lg bg-green-500 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-green-600"
                >
                  <Icons.whatsapp className="h-4 w-4" />
                  Enviar por WhatsApp
                </button>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                WhatsApp envía copia simultánea al cliente y a la empresa (+57
                317 752 5559)
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
