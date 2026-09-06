'use client';

import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatPriceCOP } from '@/config/site';
import { useCart } from '@/hooks/use-cart';
import type { StoreProduct } from '@/lib/products';

export function ProductGrid({ products }: { products: StoreProduct[] }) {
  const { addItem } = useCart();

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map(product => (
        <Card key={product.id} className="overflow-hidden pt-0">
          <Link
            href={`/tienda/${product.slug}`}
            className="relative block aspect-square"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </Link>
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {product.shortDescription}
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">
              {formatPriceCOP(product.price)}
            </p>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button asChild variant="outline" className="flex-1">
              <Link href={`/tienda/${product.slug}`}>Ver</Link>
            </Button>
            <Button
              className="flex-1"
              onClick={() => {
                addItem({
                  productId: product.id,
                  slug: product.slug,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                });
                toast.success(`${product.name} añadido al carrito`);
              }}
            >
              Añadir
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
