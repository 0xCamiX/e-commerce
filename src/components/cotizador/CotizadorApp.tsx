'use client';

import {
  ClipboardList,
  Home,
  Paintbrush,
  Printer,
  Ruler,
  ShieldCheck,
  User,
  Wind,
} from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
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

const SECTIONS = [
  { id: 'datos-cliente', label: 'Datos del cliente' },
  { id: 'especificaciones', label: 'Especificaciones' },
  { id: 'extractores', label: 'Extractores' },
  { id: 'pintura-notas', label: 'Pintura y notas' },
  { id: 'cotizacion', label: 'Cotización' },
];

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

  const handleRoofTypeChange = (value: string) => {
    if (!value) return;
    const type = value as RoofTypeId;
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
    <section className="w-full py-8 md:py-12">
      <MaxWidthWrapper>
        {/* Header */}
        <div className="mb-6 text-center">
          <p className="mb-2 text-sm font-semibold tracking-widest text-primary uppercase">
            Cotizador
          </p>
          <h2 className="mb-3 text-2xl font-bold text-foreground md:text-3xl">
            Cotizador de Extractores Eólicos
          </h2>
          <p className="mx-auto max-w-xl text-sm text-muted-foreground">
            Calcula la cantidad exacta de extractores según las dimensiones de
            tu techo
          </p>
        </div>

        {/* Breadcrumb */}
        <div className="mb-8 flex justify-center">
          <Breadcrumb>
            <BreadcrumbList className="text-xs">
              {SECTIONS.map((sec, i) => (
                <BreadcrumbItem key={sec.id}>
                  {i > 0 && <BreadcrumbSeparator />}
                  <BreadcrumbLink href={`#${sec.id}`}>
                    {sec.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="mx-auto flex max-w-4xl flex-col gap-10">
          {/* ─── SECTION 1: DATOS DEL CLIENTE ─── */}
          <div id="datos-cliente">
            <SectionLabel
              icon={User}
              number={1}
              title="Datos del Cliente"
              description="Información del cliente para la cotización"
            />
            <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-5">
              {/* Privacy note */}
              <div className="flex flex-col gap-3 md:col-span-2">
                <div className="flex items-start gap-2.5 rounded-xl border border-border bg-white p-5">
                  <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div>
                    <p className="mb-1 text-xs font-bold text-foreground">
                      Protección de datos
                    </p>
                    <p className="text-[11px] leading-relaxed text-muted-foreground">
                      Los datos recolectados son utilizados exclusivamente para
                      la generación de la cotización. Su información está
                      almacenada siguiendo las políticas de seguridad y
                      protección de datos personales vigentes en Colombia (Ley
                      1581 de 2012).
                    </p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="rounded-xl border border-border bg-white p-5 md:col-span-3">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="client-name" className="text-xs">
                      Nombre completo
                    </Label>
                    <Input
                      id="client-name"
                      value={client.name}
                      onChange={e =>
                        setClient({ ...client, name: e.target.value })
                      }
                      placeholder="Nombre del cliente"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="client-phone" className="text-xs">
                      Teléfono / WhatsApp
                    </Label>
                    <Input
                      id="client-phone"
                      value={client.phone}
                      onChange={e =>
                        setClient({ ...client, phone: e.target.value })
                      }
                      placeholder="Ej: 3001234567"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="client-city" className="text-xs">
                      Ciudad
                    </Label>
                    <Input
                      id="client-city"
                      value={client.city}
                      onChange={e =>
                        setClient({ ...client, city: e.target.value })
                      }
                      placeholder="Ciudad"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="client-address" className="text-xs">
                      Dirección del proyecto
                    </Label>
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
              </div>
            </div>
          </div>

          <Separator />

          {/* ─── SECTION 2: ESPECIFICACIONES DEL TECHO ─── */}
          <div id="especificaciones">
            <SectionLabel
              icon={Home}
              number={2}
              title="Especificaciones del Techo"
              description="Tipo de techo, material y dimensiones por pendiente"
            />
            <div className="mt-4 rounded-xl border border-border bg-white p-5">
              <div className="flex flex-col gap-5">
                {/* Tipo de techo */}
                <div className="flex flex-col gap-2">
                  <Label className="text-xs">Tipo de techo</Label>
                  <ToggleGroup
                    type="single"
                    value={roofType}
                    onValueChange={handleRoofTypeChange}
                    variant="outline"
                    size="sm"
                    spacing={2}
                  >
                    {ROOF_TYPES.map(r => (
                      <ToggleGroupItem
                        key={r.id}
                        value={r.id}
                        className="text-xs"
                      >
                        {r.label}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>

                {/* Material */}
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs">Material de la cubierta</Label>
                  <select
                    className="flex h-9 w-full max-w-sm rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
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

                <Separator />

                {/* Dimensions */}
                <div className="flex flex-col gap-3">
                  <Label className="text-xs">Dimensiones por pendiente</Label>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {dims.map((dim, i) => (
                      <div
                        key={dim.id}
                        className="rounded-lg border border-border p-3"
                      >
                        <p className="mb-2 text-xs font-semibold text-primary">
                          Pendiente {i + 1}
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex flex-col gap-1">
                            <Label
                              htmlFor={`${dim.id}-largo`}
                              className="text-[11px] text-muted-foreground"
                            >
                              Largo (m)
                            </Label>
                            <Input
                              id={`${dim.id}-largo`}
                              type="number"
                              min="0"
                              value={dim.largo}
                              onChange={e =>
                                updateDim(i, 'largo', e.target.value)
                              }
                              placeholder="metros"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <Label
                              htmlFor={`${dim.id}-ancho`}
                              className="text-[11px] text-muted-foreground"
                            >
                              Ancho (m)
                            </Label>
                            <Input
                              id={`${dim.id}-ancho`}
                              type="number"
                              min="0"
                              value={dim.ancho}
                              onChange={e =>
                                updateDim(i, 'ancho', e.target.value)
                              }
                              placeholder="metros"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {area > 0 && (
                  <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-4 py-2.5 text-xs font-semibold text-foreground">
                    <Ruler className="size-3.5 text-primary" />
                    Área total del techo: {area.toFixed(2)} m²
                  </div>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* ─── SECTION 3: TIPO DE EXTRACTOR ─── */}
          <div id="extractores">
            <SectionLabel
              icon={Wind}
              number={3}
              title="Tipo de Extractor"
              description="Selecciona el extractor adecuado para tu proyecto"
            />
            <div className="mt-4 flex flex-col gap-3">
              {EXTRACTORS.map(ext => {
                const isSelected = selectedExtractor === ext.id;
                const count = area > 0 ? Math.ceil(area / ext.coverage) : 0;
                return (
                  <button
                    key={ext.id}
                    type="button"
                    onClick={() => setSelectedExtractor(ext.id)}
                    className={`flex items-center gap-4 rounded-xl border-2 bg-white p-4 text-left transition-colors ${
                      isSelected
                        ? 'border-primary'
                        : 'border-border hover:border-primary/40'
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-foreground">
                          {ext.name}
                        </span>
                        {isSelected && (
                          <Badge className="text-[10px]">Seleccionado</Badge>
                        )}
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {ext.description} · Cubre {ext.coverage} m²/und
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-primary">
                        {formatCOP(ext.price)}
                      </p>
                      {isSelected && area > 0 && (
                        <Badge variant="secondary" className="mt-1 text-[10px]">
                          {count} und
                        </Badge>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <Separator />

          {/* ─── SECTION 4: PINTURA Y NOTAS ─── */}
          <div id="pintura-notas">
            <SectionLabel
              icon={Paintbrush}
              number={4}
              title="Pintura y Notas"
              description="Agrega pintura térmica y observaciones adicionales"
            />
            <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Paint */}
              <div className="rounded-xl border border-border bg-white p-5">
                <p className="mb-3 text-xs font-bold text-foreground">
                  Pintura del Techo
                </p>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="paint-roof"
                      checked={paintRoof}
                      onCheckedChange={checked =>
                        setPaintRoof(checked === true)
                      }
                    />
                    <Label
                      htmlFor="paint-roof"
                      className="cursor-pointer text-xs"
                    >
                      El cliente desea pintar el techo
                    </Label>
                  </div>
                  {paintRoof && (
                    <>
                      <Separator />
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="paint-area" className="text-xs">
                          ¿Cuántos m² desea pintar?
                        </Label>
                        <div className="flex items-center gap-3">
                          <Input
                            id="paint-area"
                            className="max-w-[140px]"
                            type="number"
                            min="1"
                            value={paintArea}
                            onChange={e => setPaintArea(e.target.value)}
                            placeholder="m²"
                          />
                          <Image
                            src="/cuñete.jpg"
                            alt="Cuñete de pintura térmica"
                            width={36}
                            height={36}
                            className="rounded-lg object-cover"
                          />
                        </div>
                        <p className="text-[11px] text-muted-foreground">
                          1 cuñete cubre {PAINT_COVERAGE} m² · Precio:{' '}
                          {formatCOP(PAINT_PRICE)} / cuñete
                        </p>
                      </div>
                      {suggestedCuñetes > 0 && (
                        <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-xs text-foreground">
                          <span className="font-semibold">
                            Cuñetes: {suggestedCuñetes}
                          </span>
                          <span className="text-muted-foreground">·</span>
                          <span>
                            {formatCOP(suggestedCuñetes * PAINT_PRICE)}
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Notes */}
              <div className="rounded-xl border border-border bg-white p-5">
                <p className="mb-3 text-xs font-bold text-foreground">
                  Notas adicionales
                </p>
                <Textarea
                  rows={3}
                  value={quoteNote}
                  onChange={e => setQuoteNote(e.target.value)}
                  placeholder="Observaciones, condiciones especiales, tiempo de entrega..."
                  className="text-sm"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* ─── SECTION 5: COTIZACIÓN ─── */}
          <div id="cotizacion">
            <SectionLabel
              icon={ClipboardList}
              number={5}
              title="Generar Cotización"
              description="Revisa el resumen y envía la cotización"
            />

            {canQuote ? (
              <div className="mt-4 rounded-xl border border-border bg-white p-5">
                <div className="flex flex-col gap-4">
                  {/* Client summary */}
                  <div className="grid grid-cols-1 gap-x-8 gap-y-1 text-xs sm:grid-cols-3">
                    <div className="flex justify-between sm:flex-col sm:gap-0.5">
                      <span className="text-muted-foreground">Cliente</span>
                      <span className="font-semibold text-foreground">
                        {client.name || '—'}
                      </span>
                    </div>
                    <div className="flex justify-between sm:flex-col sm:gap-0.5">
                      <span className="text-muted-foreground">Techo</span>
                      <span className="text-foreground">
                        {roofTypeObj.label} — {material || '—'}
                      </span>
                    </div>
                    <div className="flex justify-between sm:flex-col sm:gap-0.5">
                      <span className="text-muted-foreground">Área total</span>
                      <span className="font-semibold text-foreground">
                        {area.toFixed(2)} m²
                      </span>
                    </div>
                  </div>

                  <Separator />

                  {/* Line items */}
                  <div className="flex flex-col gap-2">
                    {summary.extractor && (
                      <div className="flex items-center justify-between rounded-lg border border-border px-4 py-2.5 text-xs">
                        <span className="text-foreground">
                          {summary.extractor.name} ({summary.extractorCount} und
                          × {formatCOP(summary.extractor.price)})
                        </span>
                        <span className="font-bold text-foreground">
                          {formatCOP(summary.extractorTotal)}
                        </span>
                      </div>
                    )}

                    {paintRoof && summary.paintCount > 0 && (
                      <div className="flex items-center justify-between rounded-lg border border-border px-4 py-2.5 text-xs">
                        <span className="text-foreground">
                          Pintura techo ({summary.paintCount} cuñetes ×{' '}
                          {formatCOP(PAINT_PRICE)})
                        </span>
                        <span className="font-bold text-foreground">
                          {formatCOP(summary.paintTotal)}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between rounded-lg bg-primary px-5 py-3">
                      <span className="text-sm font-bold text-primary-foreground">
                        TOTAL
                      </span>
                      <span className="text-base font-extrabold text-primary-foreground">
                        {formatCOP(summary.total)}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] font-medium text-destructive italic">
                    ⚠️ Los costos de envío pueden variar si el proyecto es fuera
                    de Cali.
                  </p>

                  <Separator />

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3">
                    <Button size="sm" variant="outline" onClick={openPdf}>
                      <Printer className="mr-1.5 size-3.5" />
                      Ver / Imprimir PDF
                    </Button>
                    <Button size="sm" onClick={sendWhatsApp}>
                      <Icons.whatsapp className="mr-1.5 size-3.5" />
                      Enviar por WhatsApp
                    </Button>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    WhatsApp envía copia simultánea al cliente y a la empresa
                    (+57 317 752 5559)
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-4 rounded-xl border border-dashed border-border bg-white p-8 text-center">
                <p className="text-xs text-muted-foreground">
                  Completa las secciones anteriores para generar la cotización.
                  Necesitas al menos seleccionar un extractor e ingresar las
                  dimensiones del techo.
                </p>
              </div>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}

function SectionLabel({
  icon: Icon,
  number,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  number: number;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
        {number}
      </div>
      <div>
        <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
          <Icon className="size-4 text-primary" />
          {title}
        </h3>
        <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
