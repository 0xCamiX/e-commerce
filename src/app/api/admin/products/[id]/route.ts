import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getDb } from '@/db';
import { products } from '@/db/schema';
import { getAdminSession } from '@/lib/require-admin';

const schema = z.object({
  slug: z.string().min(2).optional(),
  name: z.string().min(2).optional(),
  category: z.enum(['eolico', 'hongo', 'pintura']).optional(),
  description: z.string().min(10).optional(),
  shortDescription: z.string().min(4).optional(),
  price: z.coerce.number().int().positive().optional(),
  sku: z.string().optional(),
  image: z.string().min(1).optional(),
  gallery: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  polarProductId: z.string().nullable().optional(),
  stock: z.coerce.number().int().nonnegative().optional(),
  active: z.boolean().optional(),
  sizeInches: z.coerce.number().int().nullable().optional(),
  coverageM2: z.coerce.number().int().nullable().optional(),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await params;
  const body = schema.parse(await request.json());
  const [updated] = await getDb()
    .update(products)
    .set({ ...body, updatedAt: new Date() })
    .where(eq(products.id, id))
    .returning();
  if (!updated) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(updated);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await params;
  await getDb().delete(products).where(eq(products.id, id));
  return NextResponse.json({ ok: true });
}
