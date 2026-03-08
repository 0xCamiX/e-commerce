export interface ExtractorOption {
  id: number;
  name: string;
  size: number;
  coverage: number;
  price: number;
  description: string;
}

export interface ClientData {
  name: string;
  phone: string;
  city: string;
  address: string;
}

export interface PendienteDim {
  id: string;
  largo: string;
  ancho: string;
}

let _pendienteSeq = 0;
export function createPendienteDim(largo = '', ancho = ''): PendienteDim {
  return { id: `p-${++_pendienteSeq}`, largo, ancho };
}

export type RoofTypeId = 'one' | 'two' | 'three' | 'four';

export interface RoofType {
  id: RoofTypeId;
  label: string;
  pendientes: number;
}

export interface QuoteSummary {
  extractor: ExtractorOption | null;
  extractorCount: number;
  extractorTotal: number;
  paintCount: number;
  paintTotal: number;
  total: number;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

export const ROOF_TYPES: RoofType[] = [
  { id: 'one', label: 'Una pendiente', pendientes: 1 },
  { id: 'two', label: 'Dos pendientes', pendientes: 2 },
  { id: 'three', label: 'Tres pendientes', pendientes: 3 },
  { id: 'four', label: 'Cuatro pendientes', pendientes: 4 },
];

export const EXTRACTORS: ExtractorOption[] = [
  {
    id: 1,
    name: 'Extractor Eólico 24"',
    size: 24,
    coverage: 30,
    price: 750_000,
    description: 'Ideal para hogares, apartamentos y pequeños comercios',
  },
  {
    id: 2,
    name: 'Extractor Eólico 31"',
    size: 31,
    coverage: 40,
    price: 850_000,
    description: 'Uso estándar para bodegas, casas y áreas medianas',
  },
  {
    id: 3,
    name: 'Extractor Eólico 39"',
    size: 39,
    coverage: 50,
    price: 1_450_000,
    description: 'Para grandes áreas industriales y galpones',
  },
];

export const MATERIALS = [
  'Teja de barro',
  'Teja asfáltica',
  'Teja metálica',
  'Teja fibrocemento',
  'Teja termoacústica',
  'Losa de concreto',
  'Policarbonato',
];

export const PAINT_PRICE = 450_000;
export const PAINT_COVERAGE = 50;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function formatCOP(n: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(n);
}

export function totalArea(dims: PendienteDim[]): number {
  return dims.reduce(
    (sum, d) =>
      sum +
      (Number.parseFloat(d.largo) || 0) * (Number.parseFloat(d.ancho) || 0),
    0,
  );
}

export function extractorCount(area: number, coverage: number): number {
  return area > 0 && coverage > 0 ? Math.ceil(area / coverage) : 0;
}

export function syncDims(dims: PendienteDim[], count: number): PendienteDim[] {
  const result = [...dims];
  while (result.length < count) result.push(createPendienteDim());
  while (result.length > count) result.pop();
  return result;
}

export function getRoofType(id: RoofTypeId): RoofType {
  return ROOF_TYPES.find(r => r.id === id) ?? ROOF_TYPES[1];
}

export function generateQuoteNumber(): string {
  return `EG-${Date.now().toString().slice(-6)}`;
}

export function paintCuñetesFromArea(paintAreaM2: number): number {
  return paintAreaM2 > 0 ? Math.ceil(paintAreaM2 / PAINT_COVERAGE) : 0;
}

export function buildSummary(
  selectedId: number | null,
  area: number,
  paintEnabled: boolean,
  paintAreaM2: number,
): QuoteSummary {
  const ext = EXTRACTORS.find(e => e.id === selectedId) ?? null;
  const count = ext ? extractorCount(area, ext.coverage) : 0;
  const extTotal = ext ? count * ext.price : 0;
  const pCount = paintEnabled ? paintCuñetesFromArea(paintAreaM2) : 0;
  const pTotal = pCount * PAINT_PRICE;
  return {
    extractor: ext,
    extractorCount: count,
    extractorTotal: extTotal,
    paintCount: pCount,
    paintTotal: pTotal,
    total: extTotal + pTotal,
  };
}

// ---------------------------------------------------------------------------
// PDF HTML builder
// ---------------------------------------------------------------------------

export function buildQuoteHTML(args: {
  summary: QuoteSummary;
  client: ClientData;
  roofTypeLabel: string;
  material: string;
  area: number;
  dims: PendienteDim[];
  note: string;
  quoteNumber: string;
}): string {
  const {
    summary: s,
    client,
    roofTypeLabel,
    material,
    area,
    dims,
    note,
    quoteNumber,
  } = args;
  const today = new Date().toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const paintRow =
    s.paintCount > 0
      ? `<tr>
          <td style="padding:10px 12px;border-bottom:1px solid #e3eaf5;">Pintura térmica para techo<br><span style="color:#777;font-size:11px;">Cuñete — cobertura ${PAINT_COVERAGE} m²/und</span></td>
          <td style="padding:10px 12px;text-align:center;border-bottom:1px solid #e3eaf5;">${s.paintCount}</td>
          <td style="padding:10px 12px;text-align:right;border-bottom:1px solid #e3eaf5;">${formatCOP(PAINT_PRICE)}</td>
          <td style="padding:10px 12px;text-align:right;border-bottom:1px solid #e3eaf5;font-weight:700;">${formatCOP(s.paintTotal)}</td>
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
    <div style="font-weight:800;font-size:22px;color:#0284c7;">Eólicos Gallego</div>
    <div style="font-size:13px;color:#555;">Cali, Colombia</div>
    <div style="font-size:13px;color:#555;">Tel: +57 317 752 5559</div>
    <div style="font-size:13px;color:#555;">carlosgallego32@hotmail.es</div>
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
  <div style="font-weight:700;color:#0284c7;margin-bottom:8px;">ESPECIFICACIONES DEL TECHO</div>
  <table style="font-size:13px;"><tr>
    <td style="padding:3px 8px;"><b>Tipo:</b> ${roofTypeLabel}</td>
    <td style="padding:3px 8px;"><b>Material:</b> ${material || '—'}</td></tr><tr>
    <td style="padding:3px 8px;"><b>Área total:</b> ${area.toFixed(2)} m²</td>
    <td style="padding:3px 8px;"><b>Pendientes:</b> ${dims.map((d, i) => `P${i + 1}: ${d.largo || 0}×${d.ancho || 0}m`).join(', ')}</td>
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
    ${
      s.extractor
        ? `<tr>
      <td style="padding:10px 12px;border-bottom:1px solid #e3eaf5;">${s.extractor.name}<br><span style="color:#777;font-size:11px;">${s.extractor.description}</span></td>
      <td style="padding:10px 12px;text-align:center;border-bottom:1px solid #e3eaf5;">${s.extractorCount}</td>
      <td style="padding:10px 12px;text-align:right;border-bottom:1px solid #e3eaf5;">${formatCOP(s.extractor.price)}</td>
      <td style="padding:10px 12px;text-align:right;border-bottom:1px solid #e3eaf5;font-weight:700;">${formatCOP(s.extractorTotal)}</td>
    </tr>`
        : ''
    }
    ${paintRow}
  </tbody>
  <tfoot><tr style="background:#0284c7;color:white;">
    <td colspan="3" style="padding:12px;text-align:right;font-weight:700;font-size:15px;">TOTAL</td>
    <td style="padding:12px;text-align:right;font-weight:800;font-size:16px;">${formatCOP(s.total)}</td>
  </tr></tfoot>
</table>
${noteHTML}
<div style="background:#fff3e0;border:1px solid #ffb74d;border-radius:8px;padding:12px;margin-top:16px;font-size:12px;color:#e65100;">
  <b>Nota:</b> Los costos de envío pueden variar si el proyecto es fuera de Cali, Colombia.
</div>
<div style="border-top:1px solid #e3eaf5;margin-top:24px;padding-top:16px;text-align:center;font-size:12px;color:#777;">
  Eólicos Gallego · Cali, Colombia · Tel: +57 317 752 5559
</div>
</body></html>`;
}

// ---------------------------------------------------------------------------
// WhatsApp message builder
// ---------------------------------------------------------------------------

export function buildWhatsAppMessage(args: {
  summary: QuoteSummary;
  client: ClientData;
  roofTypeLabel: string;
  material: string;
  area: number;
  note: string;
  quoteNumber: string;
}): string {
  const {
    summary: s,
    client,
    roofTypeLabel,
    material,
    area,
    note,
    quoteNumber,
  } = args;

  let msg = `COTIZACION ${quoteNumber} - Eolicos Gallego\n`;
  msg += `Cali, Colombia | +57 317 752 5559\n\n`;
  msg += `Cliente: ${client.name || '-'} | Tel: ${client.phone || '-'}\n`;
  msg += `Ciudad: ${client.city || '-'} | Dir: ${client.address || '-'}\n\n`;
  msg += `Techo: ${roofTypeLabel} | Material: ${material || '-'}\n`;
  msg += `Area total: ${area.toFixed(2)} m2\n\n`;

  if (s.extractor) {
    msg += `${s.extractor.name}: ${s.extractorCount} und x ${formatCOP(s.extractor.price)} = ${formatCOP(s.extractorTotal)}\n`;
  }
  if (s.paintCount > 0) {
    msg += `Pintura térmica: ${s.paintCount} cuñetes x ${formatCOP(PAINT_PRICE)} = ${formatCOP(s.paintTotal)}\n`;
  }

  msg += `\nTOTAL: ${formatCOP(s.total)}\n\n`;
  msg += 'Los costos de envio pueden variar si es fuera de Cali.';

  if (note) msg += `\n\nNota: ${note}`;

  return msg;
}
