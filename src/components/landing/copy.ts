export const LANDING_ASSET_DIR = '/landing';

export const landingAssets = {
  hero: `${LANDING_ASSET_DIR}/extractor-hero.svg`,
  hogarTeja: `${LANDING_ASSET_DIR}/hogar-teja.svg`,
  bodegaFibrocemento: `${LANDING_ASSET_DIR}/bodega-fibrocemento.svg`,
  losaPlana: `${LANDING_ASSET_DIR}/losa-plana.svg`,
  cubiertaMetalica: `${LANDING_ASSET_DIR}/cubierta-metalica.svg`,
  beforeAfter: `${LANDING_ASSET_DIR}/before-after.svg`,
  detalleInstalado: `${LANDING_ASSET_DIR}/detalle-instalado.svg`,
} as const;

export type LandingChapterId =
  | 'calor'
  | 'kwh'
  | 'hogar'
  | 'bodega'
  | 'tallas'
  | 'hongo'
  | 'pintura'
  | 'cotizar';

export type LandingChapter = {
  id: LandingChapterId;
  kicker: string;
  title: string;
  body: string;
  highlightSizes: number[];
  calloutIds: string[];
  productScale: number;
};

export const landingCallouts = [
  {
    id: 'aluminio',
    label: 'Aluminio',
    detail: 'Aspas esféricas, cromo / aluminio',
    position: 'left-2 top-[18%] lg:left-0',
  },
  {
    id: 'cero',
    label: '0 kWh',
    detail: 'Sin motor. Sin factura.',
    position: 'right-2 top-[18%] lg:right-0',
  },
  {
    id: 'silencio',
    label: 'Silencioso',
    detail: 'Gira con el viento, no con un motor',
    position: 'left-2 bottom-[28%] lg:left-0',
  },
  {
    id: 'garantia',
    label: '5 años',
    detail: 'Garantía de fabricación local',
    position: 'right-2 bottom-[28%] lg:right-0',
  },
] as const;

export const landingChapters: LandingChapter[] = [
  {
    id: 'calor',
    kicker: 'Filosofía',
    title: 'El calor se acumula. El aire tiene que salir.',
    body: 'En un recinto cerrado la temperatura percibida sube más rápido que el termómetro. El extractor eólico no enfría con electricidad: abre un camino para que el aire caliente escape por la cubierta.',
    highlightSizes: [31],
    calloutIds: ['aluminio'],
    productScale: 1,
  },
  {
    id: 'kwh',
    kicker: '0 kWh',
    title: 'Gira con el viento. Cero consumo.',
    body: 'Sin motor, sin cableado, sin factura. Un objeto de aluminio que trabaja mientras haya brisa. La propuesta es simple: menos calor percibido, 0 kWh de operación.',
    highlightSizes: [31],
    calloutIds: ['aluminio', 'cero'],
    productScale: 1.04,
  },
  {
    id: 'hogar',
    kicker: 'Hogar',
    title: 'Teja, terraza, cubiertas residenciales.',
    body: 'En casa el confort se siente en las tardes. El modelo 24" cubre recintos pequeños y cubiertas de teja. Instalación puntual, mantenimiento mínimo.',
    highlightSizes: [24],
    calloutIds: ['aluminio', 'silencio'],
    productScale: 0.92,
  },
  {
    id: 'bodega',
    kicker: 'Bodega',
    title: 'Fibrocemento, metálica, volumen industrial.',
    body: 'Bodegas, talleres y naves acumulan calor en la cumbrera. El 31" es el estándar: más caudal a viento bajo, fabricado en Cali para cubiertas de trabajo.',
    highlightSizes: [31],
    calloutIds: ['cero', 'garantia'],
    productScale: 1.08,
  },
  {
    id: 'tallas',
    kicker: 'Tallas',
    title: '24", 31" y 39". Tres diámetros, un mismo objeto.',
    body: 'Hogar · Bodegas · Gran escala. La geometría es la misma — aspas esféricas en aluminio —; cambia el caudal y la cubrición. El cotizador estima cuántos hacen falta.',
    highlightSizes: [24, 31, 39],
    calloutIds: ['aluminio', 'cero', 'silencio', 'garantia'],
    productScale: 1.12,
  },
  {
    id: 'hongo',
    kicker: 'Tipo hongo',
    title: 'Cuando el viento no basta, el hongo extrae.',
    body: 'Cocinas, humos y grasas piden un extractor motorizado. El tipo hongo es otra línea: no reemplaza al eólico, lo complementa cuando hay vapores o extracción forzada.',
    highlightSizes: [],
    calloutIds: ['garantia'],
    productScale: 1,
  },
  {
    id: 'pintura',
    kicker: 'Pintura vs extractor',
    title: 'Reflejar el sol. O sacar el calor.',
    body: 'La pintura térmica rebota radiación en la superficie. El eólico evacua el aire ya caliente. En muchos techos conviven: menos ganancia solar arriba, menos acumulación adentro.',
    highlightSizes: [31],
    calloutIds: ['cero', 'aluminio'],
    productScale: 1.06,
  },
  {
    id: 'cotizar',
    kicker: 'B2B',
    title: 'Un proyecto, una cotización. Sin checkout.',
    body: 'Medimos cubierta, uso y viento. Devolvemos cantidad, talla y una cotización. WhatsApp o el cotizador: el mismo catálogo de 24 / 31 / 39, con IVA y asesoría desde Cali.',
    highlightSizes: [24, 31, 39],
    calloutIds: ['garantia', 'cero'],
    productScale: 1.02,
  },
];

export const landingGallery = [
  {
    id: 'hogar-teja',
    src: landingAssets.hogarTeja,
    title: 'Teja — hogar',
    caption:
      'Cubierta residencial de teja. Placeholder: exportar foto real (Google Photos / Higgsfield).',
    placeholder: true,
  },
  {
    id: 'bodega-fibrocemento',
    src: landingAssets.bodegaFibrocemento,
    title: 'Fibrocemento — bodega',
    caption:
      'Nave con fibrocemento. Placeholder: instalación en bodega, plano medio de la cubierta.',
    placeholder: true,
  },
  {
    id: 'losa-plana',
    src: landingAssets.losaPlana,
    title: 'Losa plana',
    caption:
      'Terraza / losa. Placeholder: extractor sobre base y flashing, contra cielo.',
    placeholder: true,
  },
  {
    id: 'cubierta-metalica',
    src: landingAssets.cubiertaMetalica,
    title: 'Cubierta metálica',
    caption:
      'Lámina metálica industrial. Placeholder: fila de extractores en cumbrera.',
    placeholder: true,
  },
  {
    id: 'before-after',
    src: landingAssets.beforeAfter,
    title: 'Antes / después',
    caption:
      'Esquema de calor percibido. Placeholder: no es un caso medido; sustituir con termografía real.',
    placeholder: true,
  },
  {
    id: 'detalle-instalado',
    src: landingAssets.detalleInstalado,
    title: 'Detalle de instalación',
    caption:
      'Close-up del objeto. Placeholder: 3D Higgsfield o foto de producto en estudio.',
    placeholder: true,
  },
] as const;

export const landingQuote = {
  isPlaceholder: true,
  kicker: 'Resumen de proyecto — placeholder',
  text: 'Bodega de 1.200 m² en el Valle del Cauca. Cubierta de fibrocemento, uso de almacenamiento, viento medio. Estimación de trabajo: extractores 31" en cumbrera, operación a 0 kWh.',
  meta: 'Este bloque es estructura editorial, no un testimonio de cliente. Sustituir con un caso real cuando exista autorización.',
  stats: [
    { label: 'Área', value: '1.200 m²' },
    { label: 'Talla', value: '31"' },
    { label: 'Operación', value: '0 kWh' },
  ],
} as const;

export const landingMetrics = [
  { value: '0 kWh', label: 'Consumo de operación' },
  { value: '5 años', label: 'Garantía de fabricación' },
  { value: '24 / 31 / 39', label: 'Diámetros de catálogo' },
  { value: 'Cali', label: 'Hecho en Colombia' },
] as const;

export const landingBenefits = [
  {
    title: 'Temperatura percibida',
    body: 'El aire caliente sale por la cubierta. El recinto deja de comportarse como un horno al final de la tarde.',
  },
  {
    title: 'Cero electricidad',
    body: 'No hay motor que alimentar. El viento es el único insumo, todos los días del año.',
  },
  {
    title: 'Un objeto, tres tallas',
    body: 'La misma geometría esférica en 24", 31" y 39". Se elige caudal, no otra estética.',
  },
  {
    title: 'Fabricación local',
    body: 'Aluminio y taller en Cali. Repuestos, garantía y visita técnica sin importar un catálogo lejano.',
  },
] as const;

export const landingSocialProof = {
  kicker: 'Confianza, sin gritar',
  body: 'Instalaciones en hogares, bodegas y cubiertas industriales del Valle del Cauca. Los logos reales viven en la home actual; aquí solo el tono.',
  note: 'No inventamos citas de clientes en esta propuesta.',
} as const;
