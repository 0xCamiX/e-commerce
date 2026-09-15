export const LANDING_ASSET_DIR = '/landing';

/** Slots for Figma PNG/SVG drops. See public/landing/README.md. */
export const landingAssets = {
  chrome: `${LANDING_ASSET_DIR}/extractor-chrome.svg`,
  tip1: `${LANDING_ASSET_DIR}/tip-1.svg`,
  tip2: `${LANDING_ASSET_DIR}/tip-2.svg`,
  tip3: `${LANDING_ASSET_DIR}/tip-3.svg`,
  tip4: `${LANDING_ASSET_DIR}/tip-4.svg`,
  photoHogarTeja: `${LANDING_ASSET_DIR}/photo-hogar-teja.svg`,
  photoBodega: `${LANDING_ASSET_DIR}/photo-bodega.svg`,
  photoLosa: `${LANDING_ASSET_DIR}/photo-losa.svg`,
} as const;

export const landingHeroCopy = {
  h1: 'Baja el calor que se siente. Sin gastar un kWh.',
  sub: 'Viento natural para hogar, bodega y local en Colombia.',
} as const;

export type LandingScrubId =
  | 'hogar'
  | 'bodega'
  | 'tallas'
  | 'hongo'
  | 'pintura'
  | 'indicadores'
  | 'cita'
  | 'beneficios';

export type LandingScrubStep = {
  id: LandingScrubId;
  kicker: string;
  title: string;
  body: string;
  photo: string | null;
  highlightSizes: number[];
  isPlaceholder?: boolean;
};

export const landingScrubSteps: LandingScrubStep[] = [
  {
    id: 'hogar',
    kicker: 'Hogar en teja',
    title: 'Hogar en teja',
    body: 'Aire constante, menos sofoco.',
    photo: landingAssets.photoHogarTeja,
    highlightSizes: [24],
  },
  {
    id: 'bodega',
    kicker: 'Bodega/local',
    title: 'Bodega/local',
    body: 'Ventilación pasiva a escala.',
    photo: landingAssets.photoBodega,
    highlightSizes: [31],
  },
  {
    id: 'tallas',
    kicker: 'Tallas',
    title: 'Elegí talla 24 / 31 / 39',
    body: 'Según espacio, no por catálogo genérico.',
    photo: null,
    highlightSizes: [24, 31, 39],
  },
  {
    id: 'hongo',
    kicker: 'Tipo hongo',
    title: 'Tipo hongo',
    body: 'Cuando el techo lo pide.',
    photo: landingAssets.photoLosa,
    highlightSizes: [],
  },
  {
    id: 'pintura',
    kicker: 'Pintura vs extractor',
    title: 'Pintura térmica vs extractor',
    body: 'Cuándo cada uno (y cuándo juntos).',
    photo: null,
    highlightSizes: [],
  },
  {
    id: 'indicadores',
    kicker: 'Indicadores',
    title: 'Indicadores',
    body: '0 energía eléctrica · instalación en techo · fabricado en Cali.',
    photo: null,
    highlightSizes: [],
  },
  {
    id: 'cita',
    kicker: 'Placeholder',
    title: 'Cita / proyecto',
    body: 'Pendiente de confirmación. Juan valida un quote real de instalación antes de publicar. No es un testimonio de cliente.',
    photo: null,
    highlightSizes: [],
    isPlaceholder: true,
  },
  {
    id: 'beneficios',
    kicker: 'Beneficios',
    title: 'Beneficios',
    body: 'Menos calor percibido · menos ruido de equipos · menos dependencia del aire acondicionado.',
    photo: null,
    highlightSizes: [],
  },
];

/** ScrollTrigger timeline labels, in order of intent. */
export const landingTimelineLabels: LandingScrubId[] = [
  'hogar',
  'bodega',
  'tallas',
  'hongo',
  'pintura',
  'indicadores',
  'cita',
  'beneficios',
];
