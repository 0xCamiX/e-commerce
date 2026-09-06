import Link from 'next/link';
import { ProductsTable } from '@/components/admin/ProductsTable';
import { Button } from '@/components/ui/button';

export default function AdminProductsPage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-3xl">Productos</h1>
        <Button asChild>
          <Link href="/admin/productos/nuevo">Agregar producto</Link>
        </Button>
      </div>
      <ProductsTable />
    </div>
  );
}
