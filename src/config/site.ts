export const siteConfig = {
  name: 'Eólicos Gallego',
  description:
    'Sistemas de ventilación ecológica y soluciones térmicas para industrias y edificaciones en Cali, Colombia',
  url: 'https://eolicosgallego.com',
  ogImage: 'og/logo.png',
  links: {
    twitter: 'https://twitter.com/eolicosgallego',
    github: 'https://github.com/eolicosgallego',
  },
  contact: {
    phone: '+57 317 752 5559',
    email: 'carlosgallego32@hotmail.es',
    address: 'Cali, Colombia',
    whatsapp: '573177525559',
  },
  /** Impuesto sobre ventas aplicado en cotizaciones */
  taxRate: 0.19,
  /**
   * Catálogo de extractores eólicos.
   * Fuente de verdad de precios para Precios, Simulador y Cotizador.
   */
  extractors: [
    {
      id: 24,
      size: 24,
      name: 'Extractor Eólico 24"',
      planName: 'Hogar (24")',
      subtitle: 'Para uso residencial',
      description:
        'Ideal para hogares, apartamentos y pequeños comercios. Bajo mantenimiento.',
      price: 830_000,
      capBase: 8500,
      coverageM2: 30,
      warranty: '5 años de garantía',
      features: [
        'Fácil instalación',
        'Bajo mantenimiento',
        '100% ecológico',
        'Silencioso',
      ],
      showInPricing: true,
      recommended: false,
    },
    {
      id: 31,
      size: 31,
      name: 'Extractor Eólico 31"',
      planName: 'Bodegas (31")',
      subtitle: 'Para uso industrial',
      description:
        'Uso estándar para bodegas, casas y áreas medianas. Alta eficiencia a viento bajo.',
      price: 930_000,
      capBase: 12_500,
      coverageM2: 40,
      warranty: '5 años de garantía',
      features: [
        'Alta capacidad de extracción',
        'Fabricación local',
        'Materiales resistentes',
        'Instalación profesional',
      ],
      showInPricing: true,
      recommended: true,
    },
    {
      id: 39,
      size: 39,
      name: 'Extractor Eólico 39"',
      planName: 'Empresarial (39")',
      subtitle: 'Para grandes volúmenes',
      description:
        'Máxima capacidad para galpones, agroindustria y cubiertas de gran escala.',
      price: 1_450_000,
      capBase: 18_500,
      coverageM2: 50,
      warranty: '5 años de garantía',
      features: [
        'Soluciones a medida',
        'Asesoría personalizada',
        'Instalación a gran escala',
        'Soporte prioritario',
      ],
      showInPricing: false,
      recommended: false,
    },
  ],
  /** Plan empresarial sin precio fijo (CTA a cotizador) */
  enterprisePlan: {
    name: 'Empresarial',
    subtitle: 'Para proyectos a gran escala',
    features: [
      'Soluciones a medida',
      'Asesoría personalizada',
      'Instalación a gran escala',
      'Soporte prioritario',
      'Ahorro de energía',
    ],
    url: '/cotizador',
  },
  paint: {
    name: 'Pintura térmica para techo',
    price: 450_000,
    coverageM2: 50,
    unitLabel: 'cuñete',
  },
  /** Factores térmicos de material de teja (simulador) */
  roofMaterials: [
    {
      label: 'Metálica Simple',
      value: 'metalica_simple',
      factor: 1.25,
    },
    {
      label: 'Galvanizada',
      value: 'galvanizada',
      factor: 1.2,
    },
    {
      label: 'UPVC',
      value: 'upvc',
      factor: 1.15,
    },
    {
      label: 'Fibrocemento',
      value: 'fibrocemento',
      factor: 1.1,
    },
    {
      label: 'Termoacústica Sandwich',
      value: 'sandwich',
      factor: 0.9,
    },
    {
      label: 'Standing Seam',
      value: 'standing',
      factor: 0.95,
    },
    {
      label: 'Barro',
      value: 'barro',
      factor: 1.0,
    },
    {
      label: 'Policarbonato',
      value: 'policarbonato',
      factor: 1.3,
    },
  ],
  /** Renovaciones de aire por hora según uso (ACH) */
  spaceUses: [
    { label: 'Bodega', ach: 8 },
    { label: 'Taller Industrial', ach: 12 },
    { label: 'Cocina Industrial', ach: 25 },
    { label: 'Avícola', ach: 20 },
    { label: 'Porcícola', ach: 18 },
    { label: 'Oficina / Comercial', ach: 6 },
    { label: 'Gimnasio', ach: 15 },
    { label: 'Invernadero', ach: 30 },
    { label: 'Galpón / Almacén', ach: 10 },
  ],
  navigation: {
    main: [
      {
        title: 'Eólicos',
        href: '/',
        description: 'Extractores eólicos ecológicos',
        isPrimary: true,
      },
      {
        title: 'Extractores Tipo Hongo',
        href: '/extractores-tipo-hongo',
        description: 'Extractores de ventilación industrial premium',
        isPrimary: true,
      },
      {
        title: 'Pintura Térmica',
        href: '/pintura-termica',
        description: 'Pintura reflectiva que reduce hasta 20°C',
        isPrimary: true,
        isNew: true,
      },
      {
        title: 'Cotizador',
        href: '/cotizador',
        description: 'Cotiza extractores eólicos según tu proyecto',
        isPrimary: true,
      },
    ],
    subNav: {
      '/': [
        { title: 'Inicio', href: '/#hero' },
        { title: 'Precios', href: '/#precios' },
        { title: 'Instalación', href: '/#tutorial' },
        { title: 'Clientes', href: '/#testimonials' },
        { title: 'Contacto', href: '/#contact' },
      ],
      '/extractores-tipo-hongo': [
        { title: 'Descripción', href: '/extractores-tipo-hongo#hero' },
        {
          title: 'Características',
          href: '/extractores-tipo-hongo#caracteristicas',
        },
        {
          title: 'Especificaciones',
          href: '/extractores-tipo-hongo#especificaciones',
        },
      ],
      '/pintura-termica': [
        { title: 'Descripción', href: '/pintura-termica#hero' },
        { title: 'Cómo funciona', href: '/pintura-termica#como-funciona' },
        { title: 'Beneficios', href: '/pintura-termica#beneficios' },
        { title: 'Aplicaciones', href: '/pintura-termica#aplicaciones' },
        {
          title: 'Especificaciones',
          href: '/pintura-termica#especificaciones',
        },
      ],
      '/cotizador': [
        { title: 'Simulador', href: '/cotizador#simulador' },
        { title: 'Cotización', href: '/cotizador#cotizacion' },
      ],
    } as Record<string, { title: string; href: string }[]>,
  },
  features: [
    {
      title: 'Ventilación 100% Ecológica',
      description: 'Sin consumo de energía eléctrica',
      icon: '🌱',
    },
    {
      title: 'Fabricación Local',
      description: 'Hecho en Cali con materiales resistentes',
      icon: '🏭',
    },
    {
      title: 'Garantía de 5 Años',
      description: 'Alta durabilidad y confianza',
      icon: '🛡️',
    },
    {
      title: 'Instalación Sencilla',
      description: 'Rápida instalación en cubiertas',
      icon: '⚡',
    },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
export type ExtractorConfig = (typeof siteConfig.extractors)[number];
export type RoofMaterialConfig = (typeof siteConfig.roofMaterials)[number];
export type SpaceUseConfig = (typeof siteConfig.spaceUses)[number];

export function getExtractorById(id: number): ExtractorConfig | undefined {
  return siteConfig.extractors.find(e => e.id === id);
}

export function formatPriceCOP(price: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function buildWhatsAppUrl(product: string) {
  const phone = siteConfig.contact.whatsapp;
  const message = encodeURIComponent(
    `Hola, estoy interesado en cotizar: ${product}. ¿Me pueden dar más información?`,
  );
  return `https://wa.me/${phone}?text=${message}`;
}
