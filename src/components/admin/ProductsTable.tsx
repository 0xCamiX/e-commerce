'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createColumnHelper,
  tableFeatures,
  useTable,
} from '@tanstack/react-table';
import Link from 'next/link';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatPriceCOP } from '@/config/site';
import type { StoreProduct } from '@/lib/products';

const features = tableFeatures({});
const helper = createColumnHelper<typeof features, StoreProduct>();
const EMPTY: StoreProduct[] = [];

const columns = helper.columns([
  helper.accessor('name', { header: 'Producto' }),
  helper.accessor('category', {
    header: 'Tipo',
    cell: info => <Badge variant="secondary">{info.getValue()}</Badge>,
  }),
  helper.accessor('price', {
    header: 'Precio',
    cell: info => formatPriceCOP(info.getValue()),
  }),
  helper.accessor('stock', { header: 'Stock' }),
  helper.accessor('active', {
    header: 'Estado',
    cell: info => (info.getValue() ? 'Activo' : 'Oculto'),
  }),
  helper.display({
    id: 'actions',
    header: 'Acciones',
    cell: info => (
      <Button asChild size="sm" variant="outline">
        <Link href={`/admin/productos/${info.row.original.id}`}>Editar</Link>
      </Button>
    ),
  }),
]);

export function ProductsTable() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['admin-products'],
    queryFn: async () => {
      const response = await fetch('/api/admin/products');
      if (!response.ok) throw new Error('No se pudieron cargar productos');
      return (await response.json()) as StoreProduct[];
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('No se pudo eliminar');
    },
    onSuccess: () => {
      toast.success('Producto eliminado');
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
    },
  });

  const table = useTable({
    features,
    columns,
    data: query.data ?? EMPTY,
  });

  if (query.isLoading) return <p>Cargando catálogo…</p>;

  return (
    <div className="rounded-2xl border border-border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(group => (
            <TableRow key={group.id}>
              {group.headers.map(header => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : (
                    <table.FlexRender header={header} />
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow key={row.id}>
              {row.getAllCells().map(cell => (
                <TableCell key={cell.id}>
                  <table.FlexRender cell={cell} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {remove.isError ? (
        <p className="p-3 text-sm text-destructive">Error al eliminar</p>
      ) : null}
    </div>
  );
}
