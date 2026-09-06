'use client';

import Image from 'next/image';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { formatPriceCOP, siteConfig } from '@/config/site';
import { useCart } from '@/hooks/use-cart';
import { authClient } from '@/lib/auth-client';
import type { StoreProduct } from '@/lib/products';

export function ProductPurchase({ product }: { product: StoreProduct }) {
  const { addItem } = useCart();

  async function checkoutNow() {
    if (product.polarProductId) {
      try {
        await authClient.checkout({ products: [product.polarProductId] });
        return;
      } catch {
        toast.error('No se pudo abrir Polar. Usa el carrito o WhatsApp.');
      }
    }
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    toast.success('Añadido al carrito');
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-3xl font-semibold">{formatPriceCOP(product.price)}</p>
      <p className="text-sm text-muted-foreground">
        COP + IVA · Envío a cotizar
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button size="lg" onClick={checkoutNow}>
          Comprar
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => {
            addItem({
              productId: product.id,
              slug: product.slug,
              name: product.name,
              price: product.price,
              image: product.image,
            });
            toast.success('Añadido al carrito');
          }}
        >
          Añadir al carrito
        </Button>
        <Button asChild size="lg" variant="secondary">
          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
              `Hola, quiero comprar: ${product.name}`,
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
        </Button>
      </div>
    </div>
  );
}

export function ProductGalleryThumbs({ product }: { product: StoreProduct }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {product.gallery.map(src => (
        <div
          key={src}
          className="relative aspect-square overflow-hidden rounded-2xl bg-muted"
        >
          <Image
            src={src}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </div>
      ))}
    </div>
  );
}
