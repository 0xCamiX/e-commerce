import { siteConfig } from '@/config/site';

export type ProductCategory = 'eolico' | 'hongo' | 'pintura';

export interface CatalogProduct {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  description: string;
  shortDescription: string;
  price: number;
  sku: string;
  image: string;
  gallery: string[];
  features: string[];
  polarProductId: string | null;
  stock: number;
  active: boolean;
  sizeInches: number | null;
  coverageM2: number | null;
}

export const catalogProducts: CatalogProduct[] = [
  {
    id: 'extractor-24',
    slug: 'extractor-eolico-24',
    name: 'Extractor Eólico 24"',
    category: 'eolico',
    description:
      'Extractor eólico 24 pulgadas fabricado en aluminio por Eólicos Gallego en Cali, Colombia. Ideal para hogares, apartamentos y pequeños comercios. Ventilación 100% ecológica, sin consumo eléctrico y con 5 años de garantía.',
    shortDescription: 'Para uso residencial y comercios pequeños.',
    price: siteConfig.extractors[0].price,
    sku: 'EG-EOL-24',
    image: '/products/extractor-24-studio.png',
    gallery: [
      '/products/extractor-24-studio.png',
      '/products/extractor-home-roof.png',
      '/products/extractor-closeup-vanes.png',
    ],
    features: [...siteConfig.extractors[0].features],
    polarProductId: null,
    stock: 40,
    active: true,
    sizeInches: 24,
    coverageM2: siteConfig.extractors[0].coverageM2,
  },
  {
    id: 'extractor-31',
    slug: 'extractor-eolico-31',
    name: 'Extractor Eólico 31"',
    category: 'eolico',
    description:
      'Extractor eólico 31 pulgadas, el más solicitado de Eólicos Gallego. Alta eficiencia a viento bajo para bodegas, casas y cubiertas medianas en Cali y todo Colombia. Aluminio resistente, fabricación local y 5 años de garantía.',
    shortDescription: 'El más vendido para bodegas y cubiertas medianas.',
    price: siteConfig.extractors[1].price,
    sku: 'EG-EOL-31',
    image: '/products/extractor-31-studio.png',
    gallery: [
      '/products/extractor-31-studio.png',
      '/products/extractor-warehouse-row.png',
      '/products/extractor-hero-roof.png',
      '/products/extractor-closeup-vanes.png',
    ],
    features: [...siteConfig.extractors[1].features],
    polarProductId: null,
    stock: 80,
    active: true,
    sizeInches: 31,
    coverageM2: siteConfig.extractors[1].coverageM2,
  },
  {
    id: 'extractor-39',
    slug: 'extractor-eolico-39',
    name: 'Extractor Eólico 39"',
    category: 'eolico',
    description:
      'Extractor eólico 39 pulgadas de máxima capacidad para galpones, agroindustria y cubiertas de gran escala. Solución industrial de Eólicos Gallego con asesoría e instalación a medida en Colombia.',
    shortDescription: 'Máxima capacidad para galpones e industria.',
    price: siteConfig.extractors[2].price,
    sku: 'EG-EOL-39',
    image: '/products/extractor-39-studio.png',
    gallery: [
      '/products/extractor-39-studio.png',
      '/products/extractor-galpon.png',
      '/products/extractor-warehouse-row.png',
    ],
    features: [...siteConfig.extractors[2].features],
    polarProductId: null,
    stock: 25,
    active: true,
    sizeInches: 39,
    coverageM2: siteConfig.extractors[2].coverageM2,
  },
  {
    id: 'extractor-hongo',
    slug: 'extractor-tipo-hongo',
    name: 'Extractor Tipo Hongo',
    category: 'hongo',
    description:
      'Extractor tipo hongo de alta eficiencia para ventilación industrial: extracción de humos, vapores, grasas y olores en cocinas, panaderías y fábricas. Comercializado por Eólicos Gallego en Cali, Colombia.',
    shortDescription: 'Ventilación industrial premium para humos y vapores.',
    price: 1_250_000,
    sku: 'EG-HONGO-01',
    image: '/products/extractor-tipo-hongo.png',
    gallery: [
      '/products/extractor-tipo-hongo.png',
      '/products/extractor-galpon.png',
    ],
    features: [
      'Alta capacidad de extracción',
      'Uso industrial y gastronómico',
      'Instalación profesional',
      'Asesoría técnica',
    ],
    polarProductId: null,
    stock: 15,
    active: true,
    sizeInches: null,
    coverageM2: null,
  },
  {
    id: 'pintura-termica',
    slug: 'pintura-termica',
    name: siteConfig.paint.name,
    category: 'pintura',
    description:
      'Pintura térmica con microesferas que refleja los rayos solares y reduce hasta 20°C la temperatura superficial del techo. Disponible en Cali y todo el Valle del Cauca con Eólicos Gallego.',
    shortDescription: 'Reduce hasta 20°C la temperatura del techo.',
    price: siteConfig.paint.price,
    sku: 'EG-PINT-50',
    image: '/products/pintura-product-bucket.png',
    gallery: [
      '/products/pintura-product-bucket.png',
      '/products/pintura-termica-techo.png',
    ],
    features: [
      'Hasta 20°C menos en superficie',
      `Cubre ~${siteConfig.paint.coverageM2} m² por ${siteConfig.paint.unitLabel}`,
      'Ahorro en aire acondicionado',
      'Resistente a UV y lluvia',
    ],
    polarProductId: null,
    stock: 60,
    active: true,
    sizeInches: null,
    coverageM2: siteConfig.paint.coverageM2,
  },
];

export function getCatalogProduct(slug: string) {
  return catalogProducts.find(product => product.slug === slug);
}

export function getActiveCatalog() {
  return catalogProducts.filter(product => product.active);
}
