import {
  type ExtractorConfig,
  formatPriceCOP,
  getExtractorById,
  siteConfig,
} from '@/config/site';

export type RoofTypeId = '1pend' | '2pend' | '3pend';

export interface ClientData {
  name: string;
  phone: string;
  city: string;
  address: string;
}

export interface QuoteLineItem {
  modeloId: number;
  cantidad: number;
}

export interface SimulationInput {
  largo: number;
  ancho: number;
  tipoCubierta: RoofTypeId;
  hMin: number;
  hMax: number;
  hPared: number;
  hCumbrera: number;
  hMax3: number;
  numNaves: number;
  materialValue: string;
  usoLabel: string;
  viento: number;
  modeloId: number;
}

export interface SimulationResult {
  volumen: number;
  qCorregido: number;
  capReal: number;
  extractorCount: number;
  materialLabel: string;
  materialFactor: number;
  usoLabel: string;
  ach: number;
  extractor: ExtractorConfig | null;
  cubiertaLabel: string;
}

export interface QuoteTotals {
  lines: Array<{
    extractor: ExtractorConfig;
    cantidad: number;
    unitPrice: number;
    subtotal: number;
  }>;
  paintCount: number;
  paintTotal: number;
  subtotal: number;
  iva: number;
  total: number;
}

export const ROOF_TYPES: { id: RoofTypeId; label: string }[] = [
  { id: '1pend', label: '1 Pendiente' },
  { id: '2pend', label: '2 Pendientes' },
  { id: '3pend', label: '3+ Naves' },
];

export const EXTRACTORS = siteConfig.extractors;
export const MATERIALS = siteConfig.roofMaterials;
export const USES = siteConfig.spaceUses;
export const PAINT_PRICE = siteConfig.paint.price;
export const PAINT_COVERAGE = siteConfig.paint.coverageM2;
export const TAX_RATE = siteConfig.taxRate;

export const formatCOP = formatPriceCOP;

export function getRoofType(id: RoofTypeId) {
  return ROOF_TYPES.find(r => r.id === id) ?? ROOF_TYPES[1];
}

export function getMaterial(value: string) {
  return MATERIALS.find(m => m.value === value) ?? MATERIALS[0];
}

export function getUse(label: string) {
  return USES.find(u => u.label === label) ?? USES[0];
}

export function computeVolume(input: SimulationInput): number {
  const L = Number(input.largo) || 0;
  const A = Number(input.ancho) || 0;

  if (input.tipoCubierta === '1pend') {
    return L * A * ((Number(input.hMin) + Number(input.hMax)) / 2);
  }

  if (input.tipoCubierta === '2pend') {
    const hp = Number(input.hPared) || 0;
    const hc = Number(input.hCumbrera) || 0;
    return L * A * hp + (L * A * (hc - hp)) / 2;
  }

  const hp = Number(input.hPared) || 0;
  const hm = Number(input.hMax3) || 0;
  return L * A * ((hp + hm) / 2);
}

export function computeCapReal(capBase: number, viento: number): number {
  const v = Math.max(0.5, viento);
  return capBase * Math.sqrt(v / 4);
}

export function simulate(input: SimulationInput): SimulationResult {
  const material = getMaterial(input.materialValue);
  const uso = getUse(input.usoLabel);
  const extractor = getExtractorById(input.modeloId) ?? null;
  const volumen = computeVolume(input);
  const qCorregido = volumen * uso.ach * material.factor;
  const capReal = extractor
    ? computeCapReal(extractor.capBase, input.viento)
    : 0;
  const extractorCount = capReal > 0 ? Math.ceil(qCorregido / capReal) : 0;

  const cubiertaLabel =
    input.tipoCubierta === '1pend'
      ? '1 Pendiente'
      : input.tipoCubierta === '2pend'
        ? '2 Pendientes'
        : `${input.numNaves} Naves`;

  return {
    volumen,
    qCorregido,
    capReal,
    extractorCount,
    materialLabel: material.label,
    materialFactor: material.factor,
    usoLabel: uso.label,
    ach: uso.ach,
    extractor,
    cubiertaLabel,
  };
}

export function paintCuñetesFromArea(paintAreaM2: number): number {
  return paintAreaM2 > 0 ? Math.ceil(paintAreaM2 / PAINT_COVERAGE) : 0;
}

export function buildQuoteTotals(
  lines: QuoteLineItem[],
  paintEnabled: boolean,
  paintAreaM2: number,
): QuoteTotals {
  const resolved = lines
    .map(line => {
      const extractor = getExtractorById(line.modeloId);
      if (!extractor) return null;
      const cantidad = Math.max(0, line.cantidad);
      const unitPrice = extractor.price;
      return {
        extractor,
        cantidad,
        unitPrice,
        subtotal: cantidad * unitPrice,
      };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const paintCount = paintEnabled ? paintCuñetesFromArea(paintAreaM2) : 0;
  const paintTotal = paintCount * PAINT_PRICE;
  const subtotal =
    resolved.reduce((acc, l) => acc + l.subtotal, 0) + paintTotal;
  const iva = subtotal * TAX_RATE;
  const total = subtotal + iva;

  return {
    lines: resolved,
    paintCount,
    paintTotal,
    subtotal,
    iva,
    total,
  };
}

export function generateQuoteNumber(): string {
  return `EG-${Date.now().toString().slice(-6)}`;
}

export function buildQuoteHTML(args: {
  totals: QuoteTotals;
  client: ClientData;
  simulation: SimulationResult;
  input: SimulationInput;
  note: string;
  quoteNumber: string;
}): string {
  const { totals, client, simulation, input, note, quoteNumber } = args;
  const today = new Date().toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const lineRows = totals.lines
    .map(
      line => `<tr>
        <td style="padding:10px 12px;border-bottom:1px solid #e3eaf5;">${line.extractor.name}<br><span style="color:#777;font-size:11px;">${line.extractor.description}</span></td>
        <td style="padding:10px 12px;text-align:center;border-bottom:1px solid #e3eaf5;">${line.cantidad}</td>
        <td style="padding:10px 12px;text-align:right;border-bottom:1px solid #e3eaf5;">${formatCOP(line.unitPrice)}</td>
        <td style="padding:10px 12px;text-align:right;border-bottom:1px solid #e3eaf5;font-weight:700;">${formatCOP(line.subtotal)}</td>
      </tr>`,
    )
    .join('');

  const paintRow =
    totals.paintCount > 0
      ? `<tr>
          <td style="padding:10px 12px;border-bottom:1px solid #e3eaf5;">${siteConfig.paint.name}<br><span style="color:#777;font-size:11px;">${siteConfig.paint.unitLabel} — cobertura ${PAINT_COVERAGE} m²/und</span></td>
          <td style="padding:10px 12px;text-align:center;border-bottom:1px solid #e3eaf5;">${totals.paintCount}</td>
          <td style="padding:10px 12px;text-align:right;border-bottom:1px solid #e3eaf5;">${formatCOP(PAINT_PRICE)}</td>
          <td style="padding:10px 12px;text-align:right;border-bottom:1px solid #e3eaf5;font-weight:700;">${formatCOP(totals.paintTotal)}</td>
        </tr>`
      : '';

  const noteHTML = note
    ? `<div style="background:#fff8e1;border:1px solid #ffe082;border-radius:8px;padding:12px;margin-bottom:16px;font-size:13px;"><b>Observaciones:</b> ${note}</div>`
    : '';

  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
<title>Cotización ${quoteNumber}</title>
<style>body{font-family:Arial,sans-serif;margin:0;padding:32px;color:#222;}table{width:100%;border-collapse:collapse;}@media print{body{padding:16px;}}</style>
</head><body>
<div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid #0284c7;padding-bottom:16px;margin-bottom:20px;">
  <div>
    <div style="font-weight:800;font-size:22px;color:#0284c7;">${siteConfig.name}</div>
    <div style="font-size:13px;color:#555;">${siteConfig.contact.address}</div>
    <div style="font-size:13px;color:#555;">Tel: ${siteConfig.contact.phone}</div>
    <div style="font-size:13px;color:#555;">${siteConfig.contact.email}</div>
  </div>
  <div style="text-align:right;">
    <div style="font-size:22px;font-weight:800;color:#0284c7;">COTIZACIÓN</div>
    <div style="font-size:13px;color:#555;">N° ${quoteNumber}</div>
    <div style="font-size:13px;color:#555;">${today}</div>
  </div>
</div>
<div style="background:#f5f7fa;border-radius:8px;padding:14px;margin-bottom:20px;">
  <div style="font-weight:700;color:#0284c7;margin-bottom:8px;">DATOS DEL CLIENTE</div>
  <table style="font-size:13px;"><tr>
    <td style="padding:3px 8px;"><b>Nombre:</b> ${client.name || '—'}</td>
    <td style="padding:3px 8px;"><b>Teléfono:</b> ${client.phone || '—'}</td></tr><tr>
    <td style="padding:3px 8px;"><b>Ciudad:</b> ${client.city || '—'}</td>
    <td style="padding:3px 8px;"><b>Dirección:</b> ${client.address || '—'}</td>
  </tr></table>
</div>
<div style="background:#f5f7fa;border-radius:8px;padding:14px;margin-bottom:20px;">
  <div style="font-weight:700;color:#0284c7;margin-bottom:8px;">DATOS TÉCNICOS DEL SIMULADOR</div>
  <table style="font-size:13px;"><tr>
    <td style="padding:3px 8px;"><b>Medidas:</b> ${input.largo}m × ${input.ancho}m</td>
    <td style="padding:3px 8px;"><b>Cubierta:</b> ${simulation.cubiertaLabel}</td></tr><tr>
    <td style="padding:3px 8px;"><b>Material:</b> ${simulation.materialLabel} (×${simulation.materialFactor})</td>
    <td style="padding:3px 8px;"><b>Uso:</b> ${simulation.usoLabel} (${simulation.ach} ACH)</td></tr><tr>
    <td style="padding:3px 8px;"><b>Volumen:</b> ${simulation.volumen.toFixed(1)} m³</td>
    <td style="padding:3px 8px;"><b>Q corregido:</b> ${simulation.qCorregido.toFixed(0)} m³/h</td></tr><tr>
    <td style="padding:3px 8px;"><b>Viento:</b> ${input.viento} m/s</td>
    <td style="padding:3px 8px;"><b>Cap. real/equipo:</b> ${simulation.capReal.toFixed(0)} m³/h</td>
  </tr></table>
</div>
<table>
  <thead><tr style="background:#0284c7;color:white;">
    <th style="padding:10px 12px;text-align:left;">Descripción</th>
    <th style="padding:10px 12px;text-align:center;">Cant.</th>
    <th style="padding:10px 12px;text-align:right;">Vlr. Unitario</th>
    <th style="padding:10px 12px;text-align:right;">Total</th>
  </tr></thead>
  <tbody>
    ${lineRows}
    ${paintRow}
  </tbody>
  <tfoot>
    <tr>
      <td colspan="3" style="padding:8px 12px;text-align:right;font-size:13px;">Subtotal</td>
      <td style="padding:8px 12px;text-align:right;font-size:13px;">${formatCOP(totals.subtotal)}</td>
    </tr>
    <tr>
      <td colspan="3" style="padding:8px 12px;text-align:right;font-size:13px;">IVA ${(TAX_RATE * 100).toFixed(0)}%</td>
      <td style="padding:8px 12px;text-align:right;font-size:13px;">${formatCOP(totals.iva)}</td>
    </tr>
    <tr style="background:#0284c7;color:white;">
      <td colspan="3" style="padding:12px;text-align:right;font-weight:700;font-size:15px;">TOTAL</td>
      <td style="padding:12px;text-align:right;font-weight:800;font-size:16px;">${formatCOP(totals.total)}</td>
    </tr>
  </tfoot>
</table>
${noteHTML}
<div style="background:#fff3e0;border:1px solid #ffb74d;border-radius:8px;padding:12px;margin-top:16px;font-size:12px;color:#e65100;">
  <b>Nota:</b> Los costos de envío pueden variar si el proyecto es fuera de Cali, Colombia. Precios desde configuración del sitio.
</div>
<div style="border-top:1px solid #e3eaf5;margin-top:24px;padding-top:16px;text-align:center;font-size:12px;color:#777;">
  ${siteConfig.name} · ${siteConfig.contact.address} · Tel: ${siteConfig.contact.phone}
</div>
</body></html>`;
}

export function buildWhatsAppMessage(args: {
  totals: QuoteTotals;
  client: ClientData;
  simulation: SimulationResult;
  note: string;
  quoteNumber: string;
}): string {
  const { totals, client, simulation, note, quoteNumber } = args;

  let msg = `COTIZACION ${quoteNumber} - ${siteConfig.name}\n`;
  msg += `${siteConfig.contact.address} | ${siteConfig.contact.phone}\n\n`;
  msg += `Cliente: ${client.name || '-'} | Tel: ${client.phone || '-'}\n`;
  msg += `Ciudad: ${client.city || '-'} | Dir: ${client.address || '-'}\n\n`;
  msg += `Cubierta: ${simulation.cubiertaLabel} | Material: ${simulation.materialLabel}\n`;
  msg += `Volumen: ${simulation.volumen.toFixed(1)} m3 | Q: ${simulation.qCorregido.toFixed(0)} m3/h\n`;
  msg += `Uso: ${simulation.usoLabel} (${simulation.ach} ACH)\n\n`;

  for (const line of totals.lines) {
    msg += `${line.extractor.name}: ${line.cantidad} und x ${formatCOP(line.unitPrice)} = ${formatCOP(line.subtotal)}\n`;
  }
  if (totals.paintCount > 0) {
    msg += `${siteConfig.paint.name}: ${totals.paintCount} ${siteConfig.paint.unitLabel}s x ${formatCOP(PAINT_PRICE)} = ${formatCOP(totals.paintTotal)}\n`;
  }

  msg += `\nSubtotal: ${formatCOP(totals.subtotal)}\n`;
  msg += `IVA ${(TAX_RATE * 100).toFixed(0)}%: ${formatCOP(totals.iva)}\n`;
  msg += `TOTAL: ${formatCOP(totals.total)}\n\n`;
  msg += 'Los costos de envio pueden variar si es fuera de Cali.';

  if (note) msg += `\n\nNota: ${note}`;

  return msg;
}
