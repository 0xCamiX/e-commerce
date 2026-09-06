import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { ProductForm } from '@/components/admin/ProductForm';
import { getDb } from '@/db';
import { products } from '@/db/schema';

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product] = await getDb()
    .select()
    .from(products)
    .where(eq(products.id, id))
    .limit(1);
  if (!product) notFound();

  return (
    <div>
      <h1 className="mb-6 text-3xl">Editar producto</h1>
      <ProductForm
        product={{
          id: product.id,
          slug: product.slug,
          name: product.name,
          category: product.category,
          description: product.description,
          shortDescription: product.shortDescription,
          price: product.price,
          sku: product.sku ?? '',
          image: product.image,
          gallery: product.gallery ?? [],
          features: product.features ?? [],
          polarProductId: product.polarProductId,
          stock: product.stock,
          active: product.active,
          sizeInches: product.sizeInches,
          coverageM2: product.coverageM2,
        }}
      />
    </div>
  );
}
