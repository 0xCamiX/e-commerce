import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { catalogProducts } from '@/lib/catalog';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticRoutes = [
    '',
    '/tienda',
    '/cotizador',
    '/extractores-tipo-hongo',
    '/pintura-termica',
    '/carrito',
  ];

  return [
    ...staticRoutes.map(path => ({
      url: `${siteConfig.url}${path}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1 : 0.8,
    })),
    ...catalogProducts.map(product => ({
      url: `${siteConfig.url}/tienda/${product.slug}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
  ];
}
