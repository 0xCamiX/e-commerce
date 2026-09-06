import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatPriceCOP } from '@/config/site';
import type { StoreProduct } from '@/lib/products';

export function FeaturedProducts({ products }: { products: StoreProduct[] }) {
  return (
    <section id="productos" className="bg-secondary/40 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-medium text-primary">Tienda</p>
            <h2 className="mt-2">Extractores eólicos y pintura térmica</h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/tienda">Ver catálogo completo</Link>
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 6).map(product => (
            <Card key={product.id} className="overflow-hidden pt-0">
              <div className="relative aspect-square bg-muted">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
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
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/tienda/${product.slug}`}>Ver producto</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
