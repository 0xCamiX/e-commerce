import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getDb } from '@/db';
import { products } from '@/db/schema';
import { listAdminProducts } from '@/lib/products';
import { getAdminSession } from '@/lib/require-admin';

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const rows = await listAdminProducts();
  return NextResponse.json(rows);
}

const schema = z.object({
  id: z.string().min(2).optional(),
  slug: z.string().min(2),
  name: z.string().min(2),
  category: z.enum(['eolico', 'hongo', 'pintura']),
  description: z.string().min(10),
  shortDescription: z.string().min(4),
  price: z.coerce.number().int().positive(),
  sku: z.string().optional(),
  image: z.string().min(1),
  gallery: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  polarProductId: z.string().nullable().optional(),
  stock: z.coerce.number().int().nonnegative().default(0),
  active: z.boolean().default(true),
  sizeInches: z.coerce.number().int().nullable().optional(),
  coverageM2: z.coerce.number().int().nullable().optional(),
});

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = schema.parse(await request.json());
  const id = body.id ?? body.slug;
  const [created] = await getDb()
    .insert(products)
    .values({
      id,
      slug: body.slug,
      name: body.name,
      category: body.category,
      description: body.description,
      shortDescription: body.shortDescription,
      price: body.price,
      sku: body.sku,
      image: body.image,
      gallery: body.gallery ?? [body.image],
      features: body.features ?? [],
      polarProductId: body.polarProductId ?? null,
      stock: body.stock,
      active: body.active,
      sizeInches: body.sizeInches ?? null,
      coverageM2: body.coverageM2 ?? null,
    })
    .returning();
  return NextResponse.json(created, { status: 201 });
}
