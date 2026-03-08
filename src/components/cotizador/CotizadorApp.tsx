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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
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
    <section className="w-full bg-muted/50 py-8 md:py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">
            Cotizador de Extractores Eólicos
          </h1>
          <p className="text-sm text-muted-foreground">
            Calcula la cantidad exacta de extractores según las dimensiones de
            tu techo
          </p>
        </div>

        <div className="space-y-6">
          {/* DATOS DEL CLIENTE */}
          <Card className="p-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
              <User className="h-5 w-5 text-primary" />
              Datos del Cliente
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="client-name">Nombre completo</Label>
                <Input
                  id="client-name"
                  value={client.name}
                  onChange={e => setClient({ ...client, name: e.target.value })}
                  placeholder="Nombre del cliente"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-phone">Teléfono / WhatsApp</Label>
                <Input
                  id="client-phone"
                  value={client.phone}
                  onChange={e =>
                    setClient({ ...client, phone: e.target.value })
                  }
                  placeholder="Ej: 3001234567"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-city">Ciudad</Label>
                <Input
                  id="client-city"
                  value={client.city}
                  onChange={e => setClient({ ...client, city: e.target.value })}
                  placeholder="Ciudad"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-address">Dirección del proyecto</Label>
                <Input
                  id="client-address"
                  value={client.address}
                  onChange={e =>
                    setClient({ ...client, address: e.target.value })
                  }
                  placeholder="Dirección"
                />
              </div>
            </div>
          </Card>

          {/* TIPO DE TECHO */}
          <Card className="p-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
              <Home className="h-5 w-5 text-primary" />
              Tipo de Techo
            </h3>
            <div className="mb-6 flex flex-wrap gap-2">
              {ROOF_TYPES.map(r => (
                <Button
                  key={r.id}
                  type="button"
                  variant={roofType === r.id ? 'default' : 'outline'}
                  onClick={() => handleRoofTypeChange(r.id)}
                >
                  {r.label}
                </Button>
              ))}
            </div>
            <div className="space-y-4">
              {dims.map((dim, i) => (
                <div key={dim.id}>
                  <p className="mb-2 text-sm font-semibold text-primary">
                    Pendiente {i + 1}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor={`${dim.id}-largo`}>Largo (m)</Label>
                      <Input
                        id={`${dim.id}-largo`}
                        type="number"
                        min="0"
                        value={dim.largo}
                        onChange={e => updateDim(i, 'largo', e.target.value)}
                        placeholder="metros"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`${dim.id}-ancho`}>Ancho (m)</Label>
                      <Input
                        id={`${dim.id}-ancho`}
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
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground">
                <Ruler className="h-4 w-4" />
                Área total del techo: {area.toFixed(2)} m²
              </div>
            )}
          </Card>

          {/* MATERIAL DE CUBIERTA */}
          <Card className="p-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
              <Layers className="h-5 w-5 text-primary" />
              Material de la Cubierta
            </h3>
            <select
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
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
          </Card>

          {/* SELECTOR DE EXTRACTOR */}
          <Card className="p-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
              <Wind className="h-5 w-5 text-primary" />
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
                        ? 'border-primary bg-accent shadow-md'
                        : 'border-border bg-card hover:border-primary/50 hover:shadow-sm'
                    }`}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-base font-bold text-foreground">
                        {ext.name}
                      </span>
                      {isSelected && <Badge>✓</Badge>}
                    </div>
                    <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
                      {ext.description}
                    </p>
                    <div className="mb-1 text-xs text-muted-foreground">
                      Cobertura: {ext.coverage} m²/und
                    </div>
                    <div className="text-lg font-bold text-primary">
                      {formatCOP(ext.price)}
                    </div>
                    {isSelected && area > 0 && (
                      <div className="mt-3 rounded-lg bg-primary px-3 py-2 text-center text-sm font-bold text-primary-foreground">
                        Cantidad: {count} und
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </Card>

          {/* PINTURA DEL TECHO */}
          <Card className="p-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
              <Paintbrush className="h-5 w-5 text-primary" />
              Pintura del Techo
            </h3>
            <div className="flex items-center gap-3">
              <Checkbox
                id="paint-roof"
                checked={paintRoof}
                onCheckedChange={checked => setPaintRoof(checked === true)}
              />
              <Label htmlFor="paint-roof" className="cursor-pointer">
                El cliente desea pintar el techo
              </Label>
            </div>
            {paintRoof && (
              <div className="mt-4 space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="paint-area">¿Cuántos m² desea pintar?</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      id="paint-area"
                      className="max-w-[200px]"
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
                  <p className="text-xs text-muted-foreground">
                    1 cuñete cubre {PAINT_COVERAGE} m² · Precio:{' '}
                    {formatCOP(PAINT_PRICE)} / cuñete
                  </p>
                </div>
                {suggestedCuñetes > 0 && (
                  <div className="rounded-lg bg-accent px-4 py-3 text-sm text-accent-foreground">
                    <span className="font-semibold">
                      Cuñetes sugeridos: {suggestedCuñetes}
                    </span>
                    <span className="mx-2">·</span>
                    Total: {formatCOP(suggestedCuñetes * PAINT_PRICE)}
                  </div>
                )}
              </div>
            )}
          </Card>

          {/* NOTAS ADICIONALES */}
          <Card className="p-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
              <FileText className="h-5 w-5 text-primary" />
              Notas adicionales
            </h3>
            <Textarea
              rows={3}
              value={quoteNote}
              onChange={e => setQuoteNote(e.target.value)}
              placeholder="Observaciones, condiciones especiales, tiempo de entrega..."
            />
          </Card>

          {/* RESUMEN DE COTIZACIÓN */}
          {canQuote && (
            <Card className="border-2 border-primary p-6 shadow-lg">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
                <ClipboardList className="h-5 w-5 text-primary" />
                Resumen de Cotización
              </h3>

              <div className="mb-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cliente:</span>
                  <span className="font-semibold text-foreground">
                    {client.name || '—'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Techo:</span>
                  <span className="text-foreground">
                    {roofTypeObj.label} — {material || '—'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Área total:</span>
                  <span className="font-semibold text-foreground">
                    {area.toFixed(2)} m²
                  </span>
                </div>
              </div>

              <Separator className="my-4" />

              {summary.extractor && (
                <div className="mb-2 flex items-center justify-between rounded-lg bg-muted px-4 py-3 text-sm">
                  <span className="text-foreground">
                    {summary.extractor.name} ({summary.extractorCount} und ×{' '}
                    {formatCOP(summary.extractor.price)})
                  </span>
                  <span className="font-bold text-foreground">
                    {formatCOP(summary.extractorTotal)}
                  </span>
                </div>
              )}

              {paintRoof && summary.paintCount > 0 && (
                <div className="mb-2 flex items-center justify-between rounded-lg bg-muted px-4 py-3 text-sm">
                  <span className="text-foreground">
                    Pintura techo ({summary.paintCount} cuñetes ×{' '}
                    {formatCOP(PAINT_PRICE)})
                  </span>
                  <span className="font-bold text-foreground">
                    {formatCOP(summary.paintTotal)}
                  </span>
                </div>
              )}

              <div className="mt-4 flex items-center justify-between rounded-lg bg-primary px-5 py-4">
                <span className="text-base font-bold text-primary-foreground">
                  TOTAL
                </span>
                <span className="text-xl font-extrabold text-primary-foreground">
                  {formatCOP(summary.total)}
                </span>
              </div>

              <p className="mt-2 text-xs font-medium text-destructive italic">
                ⚠️ Los costos de envío pueden variar si el proyecto es fuera de
                Cali.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Button variant="destructive" onClick={openPdf}>
                  <Printer className="mr-2 h-4 w-4" />
                  Ver / Imprimir PDF
                </Button>
                <Button onClick={sendWhatsApp}>
                  <Icons.whatsapp className="mr-2 h-4 w-4" />
                  Enviar por WhatsApp
                </Button>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                WhatsApp envía copia simultánea al cliente y a la empresa (+57
                317 752 5559)
              </p>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
