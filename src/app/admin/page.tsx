import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { listAdminProducts } from '@/lib/products';
import { requireAdmin } from '@/lib/require-admin';

export default async function AdminHomePage() {
  await requireAdmin();
  const products = await listAdminProducts();

  return (
    <div>
      <h1 className="text-3xl">Panel Eólicos Gallego</h1>
      <p className="mt-2 text-muted-foreground">
        Administra extractores eólicos y pintura térmica.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border p-6">
          <p className="text-sm text-muted-foreground">Productos</p>
          <p className="mt-2 text-3xl font-semibold">{products.length}</p>
        </div>
        <div className="rounded-2xl border border-border p-6">
          <p className="text-sm text-muted-foreground">Activos</p>
          <p className="mt-2 text-3xl font-semibold">
            {products.filter(product => product.active).length}
          </p>
        </div>
      </div>
      <Button asChild className="mt-8">
        <Link href="/admin/productos">Gestionar catálogo</Link>
      </Button>
    </div>
  );
}
