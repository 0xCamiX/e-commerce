import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductJsonLd } from '@/components/seo/JsonLd';
import {
  ProductGalleryThumbs,
  ProductPurchase,
} from '@/components/shop/ProductPurchase';
import { siteConfig } from '@/config/site';
import { catalogProducts } from '@/lib/catalog';
import { getStoreProduct } from '@/lib/products';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return catalogProducts.map(product => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getStoreProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | Eólicos Gallego`,
      description: product.shortDescription,
      images: [{ url: product.image, width: 1200, height: 1200 }],
    },
    alternates: { canonical: `${siteConfig.url}/tienda/${product.slug}` },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getStoreProduct(slug);
  if (!product) notFound();

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
      <ProductJsonLd
        name={product.name}
        description={product.description}
        image={`${siteConfig.url}${product.image}`}
        price={product.price}
        sku={product.sku}
      />
      <ProductGalleryThumbs product={product} />
      <div>
        <p className="text-sm font-medium text-primary">Eólicos Gallego</p>
        <h1 className="mt-2">{product.name}</h1>
        <p className="mt-4 text-muted-foreground">{product.description}</p>
        <ul className="mt-6 flex flex-col gap-2 text-sm">
          {product.features.map(feature => (
            <li key={feature}>• {feature}</li>
          ))}
        </ul>
        <div className="mt-8">
          <ProductPurchase product={product} />
        </div>
      </div>
    </div>
  );
}
