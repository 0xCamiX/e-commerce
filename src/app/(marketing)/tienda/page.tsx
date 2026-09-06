import type { Metadata } from 'next';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { listStoreProducts } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Tienda de extractores eólicos',
  description:
    'Compra extractores eólicos 24, 31 y 39 pulgadas, extractores tipo hongo y pintura térmica. Eólicos Gallego, Cali, Colombia.',
  keywords: [
    'comprar extractores eólicos',
    'tienda Eólicos Gallego',
    'extractor eólico 31 pulgadas precio',
    'pintura térmica Colombia',
  ],
};

export default async function ShopPage() {
  const products = await listStoreProducts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1>Tienda Eólicos Gallego</h1>
      <p className="mt-3 mb-10 max-w-2xl text-muted-foreground">
        Extractores eólicos, tipo hongo y pintura térmica. Compra en línea o
        cotiza instalación a nivel nacional.
      </p>
      <ProductGrid products={products} />
    </div>
  );
}
