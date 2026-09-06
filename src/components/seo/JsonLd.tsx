import { siteConfig } from '@/config/site';

export function LocalBusinessJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteConfig.url}#business`,
    name: 'Eólicos Gallego',
    alternateName: ['Eolicos Gallego', 'Extractores Eólicos Gallego'],
    url: siteConfig.url,
    image: `${siteConfig.url}/og/eolicos-gallego.png`,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Cali',
      addressRegion: 'Valle del Cauca',
      addressCountry: 'CO',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 3.4516,
      longitude: -76.532,
    },
    areaServed: ['Cali', 'Valle del Cauca', 'Colombia'],
    priceRange: '$$',
    description: siteConfig.description,
    sameAs: [
      'https://www.instagram.com/eolicosgallego_/',
      'https://www.tiktok.com/@eolicosgallego',
      'https://www.facebook.com/juancarlosgallego32',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ProductJsonLd({
  name,
  description,
  image,
  price,
  sku,
}: {
  name: string;
  description: string;
  image: string;
  price: number;
  sku?: string;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    sku,
    brand: { '@type': 'Brand', name: 'Eólicos Gallego' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'COP',
      price,
      availability: 'https://schema.org/InStock',
      url: siteConfig.url,
      seller: { '@type': 'LocalBusiness', name: 'Eólicos Gallego' },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function FaqJsonLd({
  items,
}: {
  items: Array<{ question: string; answer: string }>;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
