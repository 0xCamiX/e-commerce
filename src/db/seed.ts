import { getDb } from '@/db';
import { products } from '@/db/schema';
import { getAuth } from '@/lib/auth';
import { catalogProducts } from '@/lib/catalog';

async function seed() {
  const db = getDb();
  for (const product of catalogProducts) {
    await db
      .insert(products)
      .values({
        id: product.id,
        slug: product.slug,
        name: product.name,
        category: product.category,
        description: product.description,
        shortDescription: product.shortDescription,
        price: product.price,
        sku: product.sku,
        image: product.image,
        gallery: product.gallery,
        features: product.features,
        polarProductId: product.polarProductId,
        stock: product.stock,
        active: product.active,
        sizeInches: product.sizeInches,
        coverageM2: product.coverageM2,
      })
      .onConflictDoNothing();
  }

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (email && password) {
    try {
      await getAuth().api.createUser({
        body: {
          email,
          password,
          name: process.env.ADMIN_NAME ?? 'Administrador',
          role: 'admin',
        },
      });
    } catch (error) {
      console.info('Admin user already exists or could not be created', error);
    }
  }

  console.info('Seed complete');
}

seed().catch(error => {
  console.error(error);
  process.exit(1);
});
