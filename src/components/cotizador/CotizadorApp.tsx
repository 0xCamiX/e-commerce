'use client';

import {
  Calculator,
  ClipboardList,
  Paintbrush,
  Printer,
  Ruler,
  User,
  Wind,
} from 'lucide-react';
import Image from 'next/image';
import { type ComponentType, useMemo, useRef, useState } from 'react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { siteConfig } from '@/config/site';
import {
  buildQuoteHTML,
  buildQuoteTotals,
  buildWhatsAppMessage,
  type ClientData,
  EXTRACTORS,
  formatCOP,
  generateQuoteNumber,
  MATERIALS,
  PAINT_COVERAGE,
  PAINT_PRICE,
  type QuoteLineItem,
  ROOF_TYPES,
  type RoofTypeId,
  simulate,
  TAX_RATE,
  USES,
} from '@/lib/cotizador';

type TabId = 'simulador' | 'cotizador';

export default function CotizadorApp() {
  const [tab, setTab] = useState<TabId>('simulador');

  const [largo, setLargo] = useState(20);
  const [ancho, setAncho] = useState(12);
  const [tipoCubierta, setTipoCubierta] = useState<RoofTypeId>('2pend');
  const [hMin, setHMin] = useState(3);
  const [hMax, setHMax] = useState(6);
  const [hPared, setHPared] = useState(3.5);
  const [hCumbrera, setHCumbrera] = useState(6.5);
  const [hMax3, setHMax3] = useState(7);
  const [numNaves, setNumNaves] = useState(2);
  const [material, setMaterial] = useState<string>(MATERIALS[0].value);
  const [uso, setUso] = useState<string>(USES[0].label);
  const [viento, setViento] = useState(4);
  const [modeloCalcId, setModeloCalcId] = useState(31);

  const [client, setClient] = useState<ClientData>({
    name: '',
    phone: '',
    city: '',
    address: '',
  });
  const [cotizador, setCotizador] = useState<QuoteLineItem[]>([
    { modeloId: 31, cantidad: 2 },
  ]);
  const [paintRoof, setPaintRoof] = useState(false);
  const [paintArea, setPaintArea] = useState('');
  const [quoteNote, setQuoteNote] = useState('');
  const quoteNumber = useRef(generateQuoteNumber());

  const simulationInput = useMemo(
    () => ({
      largo,
      ancho,
      tipoCubierta,
      hMin,
      hMax,
      hPared,
      hCumbrera,
      hMax3,
      numNaves,
      materialValue: material,
      usoLabel: uso,
      viento,
      modeloId: modeloCalcId,
    }),
    [
      largo,
      ancho,
      tipoCubierta,
      hMin,
      hMax,
      hPared,
      hCumbrera,
      hMax3,
      numNaves,
      material,
      uso,
      viento,
      modeloCalcId,
    ],
  );

  const simulation = useMemo(
    () => simulate(simulationInput),
    [simulationInput],
  );

  const paintAreaNum = Number(paintArea) || 0;
  const totals = useMemo(
    () => buildQuoteTotals(cotizador, paintRoof, paintAreaNum),
    [cotizador, paintRoof, paintAreaNum],
  );

  const canQuote = totals.lines.some(l => l.cantidad > 0);

  const syncToCotizador = () => {
    setCotizador([
      {
        modeloId: modeloCalcId,
        cantidad: Math.max(1, simulation.extractorCount),
      },
    ]);
    setTab('cotizador');
  };

  const openPdf = () => {
    const html = buildQuoteHTML({
      totals,
      client,
      simulation,
      input: simulationInput,
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
        totals,
        client,
        simulation,
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
      () =>
        window.open(
          `https://wa.me/${siteConfig.contact.whatsapp}?text=${msg}`,
          '_blank',
        ),
      900,
    );
  };

  return (
    <section className="w-full py-8 md:py-12">
      <MaxWidthWrapper>
        <div className="mb-6 text-center">
          <p className="mb-2 text-sm font-semibold tracking-widest text-primary uppercase">
            Simulador + Cotizador
          </p>
          <h1 className="mb-3 text-2xl font-bold text-foreground md:text-3xl">
            Cotizador de Extractores Eólicos
          </h1>
          <p className="mx-auto max-w-xl text-sm text-muted-foreground">
            Calcula la cantidad de extractores por volumen, ACH y viento. Los
            precios salen de la configuración del sitio.
          </p>
        </div>

        <div className="mb-8 flex justify-center gap-2">
          {(
            [
              { id: 'simulador', label: 'Simulador', icon: Calculator },
              { id: 'cotizador', label: 'Cotizador', icon: ClipboardList },
            ] as const
          ).map(item => (
            <Button
              key={item.id}
              type="button"
              size="sm"
              variant={tab === item.id ? 'default' : 'outline'}
              onClick={() => setTab(item.id)}
            >
              <item.icon className="mr-1.5 size-3.5" />
              {item.label}
            </Button>
          ))}
        </div>

        {tab === 'simulador' && (
          <div id="simulador" className="mx-auto flex max-w-4xl flex-col gap-8">
            <div>
              <SectionLabel
                icon={Ruler}
                number={1}
                title="Dimensiones de la nave"
                description="Largo, ancho y tipo de cubierta para calcular el volumen"
              />
              <div className="mt-4 rounded-xl border border-border bg-white p-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="largo" className="text-xs">
                      Largo (m)
                    </Label>
                    <Input
                      id="largo"
                      type="number"
                      min="0"
                      value={largo}
                      onChange={e => setLargo(Number(e.target.value))}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="ancho" className="text-xs">
                      Ancho (m)
                    </Label>
                    <Input
                      id="ancho"
                      type="number"
                      min="0"
                      value={ancho}
                      onChange={e => setAncho(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-2">
                  <Label className="text-xs">Tipo de cubierta</Label>
                  <ToggleGroup
                    type="single"
                    value={tipoCubierta}
                    onValueChange={value => {
                      if (value) setTipoCubierta(value as RoofTypeId);
                    }}
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

                <div className="mt-4 grid grid-cols-2 gap-4">
                  {tipoCubierta === '1pend' && (
                    <>
                      <NumberField
                        id="hMin"
                        label="h_min (m)"
                        value={hMin}
                        onChange={setHMin}
                        hint="Vol = L·A·(hmin+hmax)/2"
                      />
                      <NumberField
                        id="hMax"
                        label="h_max (m)"
                        value={hMax}
                        onChange={setHMax}
                      />
                    </>
                  )}
                  {tipoCubierta === '2pend' && (
                    <>
                      <NumberField
                        id="hPared"
                        label="h_pared (m)"
                        value={hPared}
                        onChange={setHPared}
                        hint="Vol = L·A·hp + L·A·(hc-hp)/2"
                      />
                      <NumberField
                        id="hCumbrera"
                        label="h_cumbrera (m)"
                        value={hCumbrera}
                        onChange={setHCumbrera}
                      />
                    </>
                  )}
                  {tipoCubierta === '3pend' && (
                    <>
                      <NumberField
                        id="hPared3"
                        label="h_pared (m)"
                        value={hPared}
                        onChange={setHPared}
                      />
                      <NumberField
                        id="hMax3"
                        label="h_max (m)"
                        value={hMax3}
                        onChange={setHMax3}
                      />
                      <NumberField
                        id="numNaves"
                        label="N° Naves"
                        value={numNaves}
                        onChange={setNumNaves}
                        className="col-span-2"
                        hint="Vol = L·A·(hp+hm)/2"
                      />
                    </>
                  )}
                </div>
              </div>
            </div>

            <div>
              <SectionLabel
                icon={Wind}
                number={2}
                title="Condiciones y material"
                description="Teja, uso del espacio, viento y modelo de cálculo"
              />
              <div className="mt-4 rounded-xl border border-border bg-white p-5">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs">Material teja</Label>
                    <select
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
                      value={material}
                      onChange={e => setMaterial(e.target.value)}
                    >
                      {MATERIALS.map(m => (
                        <option key={m.value} value={m.value}>
                          {m.label} — Factor {m.factor}
                        </option>
                      ))}
                    </select>
                    <p className="text-[11px] text-muted-foreground">
                      Factor {simulation.materialFactor} → Q = Vol·ACH·Factor
                    </p>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs">Tipo de uso (ACH)</Label>
                    <select
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
                      value={uso}
                      onChange={e => setUso(e.target.value)}
                    >
                      {USES.map(u => (
                        <option key={u.label} value={u.label}>
                          {u.label} — {u.ach} ACH
                        </option>
                      ))}
                    </select>
                    <p className="text-[11px] text-muted-foreground">
                      ACH: <b>{simulation.ach}</b> renov/h
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 md:col-span-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Viento (m/s)</Label>
                      <span className="text-xs font-semibold">
                        {viento} m/s
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={12}
                      step={0.5}
                      value={viento}
                      onChange={e => setViento(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                    <div className="flex justify-between text-[10px] text-muted-foreground">
                      <span>1 m/s brisa</span>
                      <span>4 m/s base</span>
                      <span>12 m/s fuerte</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 md:col-span-2">
                    <Label className="text-xs">Modelo para cálculo</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {EXTRACTORS.map(m => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setModeloCalcId(m.id)}
                          className={`rounded-lg border-2 px-2 py-3 text-center text-xs font-bold transition ${
                            modeloCalcId === m.id
                              ? 'border-primary bg-primary text-primary-foreground'
                              : 'border-border bg-white text-muted-foreground hover:border-primary/40'
                          }`}
                        >
                          {m.size}"
                          <span className="mt-0.5 block text-[10px] font-normal opacity-80">
                            {m.capBase.toLocaleString('es-CO')} m³/h
                          </span>
                        </button>
                      ))}
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      cap_real = cap_base · √(viento/4) →{' '}
                      <b className="text-foreground">
                        {simulation.capReal.toFixed(0)} m³/h
                      </b>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-foreground p-5 text-background">
              <div className="text-[11px] font-bold tracking-widest text-primary uppercase">
                Resultado cálculo
              </div>
              <div className="mt-1 text-3xl font-black">
                {simulation.extractorCount}{' '}
                <span className="text-base font-semibold text-background/70">
                  extractores {simulation.extractor?.size}"
                </span>
              </div>
              <p className="mt-2 text-xs text-background/60">
                Volumen {simulation.volumen.toFixed(1)} m³ · Q corregido{' '}
                {simulation.qCorregido.toFixed(0)} m³/h · Teja{' '}
                {simulation.materialLabel} · Cubierta {simulation.cubiertaLabel}
              </p>

              <div className="mt-4 grid grid-cols-3 gap-2 text-[11px]">
                <div className="rounded-lg bg-white/10 p-3">
                  <div className="text-background/50 uppercase">Volumen</div>
                  <div className="text-sm font-bold">
                    {simulation.volumen.toFixed(1)} m³
                  </div>
                </div>
                <div className="rounded-lg bg-white/10 p-3">
                  <div className="text-background/50 uppercase">
                    Q corregido
                  </div>
                  <div className="text-sm font-bold">
                    {simulation.qCorregido.toFixed(0)} m³/h
                  </div>
                </div>
                <div className="rounded-lg bg-primary p-3 text-primary-foreground">
                  <div className="uppercase opacity-80">Cap real</div>
                  <div className="text-sm font-black">
                    {simulation.capReal.toFixed(0)} m³/h
                  </div>
                </div>
              </div>

              <Button
                type="button"
                className="mt-4 w-full"
                variant="secondary"
                onClick={syncToCotizador}
              >
                Usar en Cotizador →
              </Button>
            </div>
          </div>
        )}

        {tab === 'cotizador' && (
          <div
            id="cotizacion"
            className="mx-auto flex max-w-4xl flex-col gap-8"
          >
            <div>
              <SectionLabel
                icon={User}
                number={1}
                title="Datos del cliente"
                description="Información para la cotización y WhatsApp"
              />
              <div className="mt-4 rounded-xl border border-border bg-white p-5">
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

            <div>
              <SectionLabel
                icon={ClipboardList}
                number={2}
                title="Equipos cotizados"
                description="Precios unitarios solo lectura desde config/site.ts"
              />
              <div className="mt-4 rounded-xl border border-border bg-white p-5">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <Badge variant="secondary" className="text-[10px]">
                    Precio desde siteConfig
                  </Badge>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      setCotizador([
                        ...cotizador,
                        { modeloId: 24, cantidad: 1 },
                      ])
                    }
                  >
                    + Agregar modelo
                  </Button>
                </div>

                <div className="space-y-3">
                  {cotizador.map((row, idx) => {
                    const precioUnit =
                      EXTRACTORS.find(m => m.id === row.modeloId)?.price ?? 0;
                    return (
                      <div
                        key={`line-${row.modeloId}-${idx}`}
                        className="grid grid-cols-1 gap-3 rounded-lg border border-border p-3 sm:grid-cols-[1.4fr_0.6fr_1fr_auto]"
                      >
                        <select
                          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"
                          value={row.modeloId}
                          onChange={e => {
                            const newId = Number(e.target.value);
                            setCotizador(prev =>
                              prev.map((r, i) =>
                                i === idx ? { ...r, modeloId: newId } : r,
                              ),
                            );
                          }}
                        >
                          {EXTRACTORS.map(m => (
                            <option key={m.id} value={m.id}>
                              {m.size}" — {formatCOP(m.price)}
                            </option>
                          ))}
                        </select>
                        <Input
                          type="number"
                          min={0}
                          value={row.cantidad}
                          onChange={e =>
                            setCotizador(prev =>
                              prev.map((r, i) =>
                                i === idx
                                  ? {
                                      ...r,
                                      cantidad: Number(e.target.value),
                                    }
                                  : r,
                              ),
                            )
                          }
                        />
                        <div className="flex h-9 items-center rounded-md border border-border bg-muted/40 px-3 text-sm font-semibold">
                          {formatCOP(precioUnit)}
                        </div>
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            setCotizador(prev =>
                              prev.filter((_, i) => i !== idx),
                            )
                          }
                        >
                          ✕
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div>
              <SectionLabel
                icon={Paintbrush}
                number={3}
                title="Pintura y notas"
                description="Opcional: pintura térmica y observaciones"
              />
              <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-border bg-white p-5">
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
                      Incluir pintura térmica
                    </Label>
                  </div>
                  {paintRoof && (
                    <div className="mt-4 flex flex-col gap-2">
                      <Label htmlFor="paint-area" className="text-xs">
                        m² a pintar
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
                        1 {siteConfig.paint.unitLabel} cubre {PAINT_COVERAGE} m²
                        · {formatCOP(PAINT_PRICE)} /{' '}
                        {siteConfig.paint.unitLabel}
                      </p>
                      {totals.paintCount > 0 && (
                        <p className="text-xs font-semibold">
                          {totals.paintCount} {siteConfig.paint.unitLabel}s ·{' '}
                          {formatCOP(totals.paintTotal)}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="rounded-xl border border-border bg-white p-5">
                  <Label className="mb-2 text-xs">Notas adicionales</Label>
                  <Textarea
                    rows={4}
                    value={quoteNote}
                    onChange={e => setQuoteNote(e.target.value)}
                    placeholder="Observaciones, condiciones especiales..."
                    className="text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-xs">
              <p className="font-semibold text-foreground">
                Resumen técnico del simulador
              </p>
              <div className="mt-2 grid grid-cols-2 gap-2 text-muted-foreground">
                <span>
                  Medidas:{' '}
                  <b className="text-foreground">
                    {largo}m × {ancho}m
                  </b>
                </span>
                <span>
                  Volumen:{' '}
                  <b className="text-foreground">
                    {simulation.volumen.toFixed(1)} m³
                  </b>
                </span>
                <span>
                  Cubierta:{' '}
                  <b className="text-foreground">{simulation.cubiertaLabel}</b>
                </span>
                <span>
                  Teja:{' '}
                  <b className="text-foreground">
                    {simulation.materialLabel} (×{simulation.materialFactor})
                  </b>
                </span>
              </div>
            </div>

            {canQuote ? (
              <div className="rounded-xl border border-border bg-white p-5">
                <div className="space-y-2 text-xs">
                  {totals.lines.map(line => (
                    <div
                      key={`${line.extractor.id}-${line.cantidad}`}
                      className="flex items-center justify-between rounded-lg border border-border px-4 py-2.5"
                    >
                      <span>
                        {line.extractor.name} ({line.cantidad} und ×{' '}
                        {formatCOP(line.unitPrice)})
                      </span>
                      <span className="font-bold">
                        {formatCOP(line.subtotal)}
                      </span>
                    </div>
                  ))}
                  {totals.paintCount > 0 && (
                    <div className="flex items-center justify-between rounded-lg border border-border px-4 py-2.5">
                      <span>
                        Pintura ({totals.paintCount} × {formatCOP(PAINT_PRICE)})
                      </span>
                      <span className="font-bold">
                        {formatCOP(totals.paintTotal)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between px-1 pt-1 text-muted-foreground">
                    <span>Subtotal</span>
                    <span>{formatCOP(totals.subtotal)}</span>
                  </div>
                  <div className="flex justify-between px-1 text-muted-foreground">
                    <span>IVA {(TAX_RATE * 100).toFixed(0)}%</span>
                    <span>{formatCOP(totals.iva)}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-primary px-5 py-3 text-primary-foreground">
                    <span className="text-sm font-bold">TOTAL</span>
                    <span className="text-base font-extrabold">
                      {formatCOP(totals.total)}
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-[11px] font-medium text-destructive italic">
                  Los costos de envío pueden variar fuera de Cali.
                </p>

                <Separator className="my-4" />

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
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-border bg-white p-8 text-center text-xs text-muted-foreground">
                Agrega al menos un equipo con cantidad mayor a 0, o usa el
                resultado del simulador.
              </div>
            )}
          </div>
        )}
      </MaxWidthWrapper>
    </section>
  );
}

function NumberField({
  id,
  label,
  value,
  onChange,
  hint,
  className,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (v: number) => void;
  hint?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className ?? ''}`}>
      <Label htmlFor={id} className="text-xs">
        {label}
      </Label>
      <Input
        id={id}
        type="number"
        step="0.1"
        min="0"
        value={value}
        onChange={e => onChange(Number(e.target.value))}
      />
      {hint && (
        <span className="text-[10px] text-muted-foreground">{hint}</span>
      )}
    </div>
  );
}

function SectionLabel({
  icon: Icon,
  number,
  title,
  description,
}: {
  icon: ComponentType<{ className?: string }>;
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
