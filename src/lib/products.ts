import { eq } from 'drizzle-orm';
import { getDb, hasDatabase } from '@/db';
import { type Product, products } from '@/db/schema';
import {
  type CatalogProduct,
  catalogProducts,
  getActiveCatalog,
  getCatalogProduct,
} from '@/lib/catalog';

export type StoreProduct = CatalogProduct;

function toStoreProduct(row: Product): StoreProduct {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    description: row.description,
    shortDescription: row.shortDescription,
    price: row.price,
    sku: row.sku ?? '',
    image: row.image,
    gallery: row.gallery ?? [],
    features: row.features ?? [],
    polarProductId: row.polarProductId,
    stock: row.stock,
    active: row.active,
    sizeInches: row.sizeInches,
    coverageM2: row.coverageM2,
  };
}

export async function listStoreProducts(): Promise<StoreProduct[]> {
  if (!hasDatabase()) {
    return getActiveCatalog();
  }
  try {
    const rows = await getDb()
      .select()
      .from(products)
      .where(eq(products.active, true));
    return rows.length > 0 ? rows.map(toStoreProduct) : getActiveCatalog();
  } catch {
    return getActiveCatalog();
  }
}

export async function getStoreProduct(
  slug: string,
): Promise<StoreProduct | undefined> {
  if (!hasDatabase()) {
    return getCatalogProduct(slug);
  }
  try {
    const [row] = await getDb()
      .select()
      .from(products)
      .where(eq(products.slug, slug))
      .limit(1);
    return row ? toStoreProduct(row) : getCatalogProduct(slug);
  } catch {
    return getCatalogProduct(slug);
  }
}

export async function listAdminProducts(): Promise<StoreProduct[]> {
  const rows = await getDb().select().from(products);
  return rows.map(toStoreProduct);
}

export { catalogProducts };
