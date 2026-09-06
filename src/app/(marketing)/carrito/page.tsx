'use client';

import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Empty, EmptyDescription, EmptyTitle } from '@/components/ui/empty';
import { formatPriceCOP, siteConfig } from '@/config/site';
import { useCart } from '@/hooks/use-cart';
import { authClient } from '@/lib/auth-client';

export default function CartPage() {
  const { items, total, updateQty, clear } = useCart();

  async function payWithPolar() {
    const polarIds = items.map(item => item.productId).filter(Boolean);
    const first = items[0];
    if (!first) return;
    try {
      await authClient.checkout({
        products: polarIds,
      });
    } catch {
      toast.message('Polar no está configurado. Te redirigimos a WhatsApp.');
      window.location.href = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
        `Pedido Eólicos Gallego:\n${items
          .map(
            item =>
              `${item.qty} x ${item.name} — ${formatPriceCOP(item.price)}`,
          )
          .join('\n')}\nTotal: ${formatPriceCOP(total)}`,
      )}`;
    }
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24">
        <Empty>
          <EmptyTitle>Tu carrito está vacío</EmptyTitle>
          <EmptyDescription>
            Explora extractores eólicos y pintura térmica.
          </EmptyDescription>
          <Button asChild className="mt-4">
            <Link href="/tienda">Ir a la tienda</Link>
          </Button>
        </Empty>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1>Carrito</h1>
      <div className="mt-8 flex flex-col gap-4">
        {items.map(item => (
          <div
            key={item.productId}
            className="flex items-center gap-4 rounded-2xl border border-border p-4"
          >
            <div className="relative size-20 overflow-hidden rounded-xl bg-muted">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-muted-foreground">
                {formatPriceCOP(item.price)}
              </p>
            </div>
            <input
              type="number"
              min={1}
              value={item.qty}
              className="h-9 w-16 rounded-md border border-input px-2"
              onChange={event =>
                updateQty(item.productId, Number(event.target.value))
              }
            />
          </div>
        ))}
      </div>
      <div className="mt-8 flex items-center justify-between">
        <p className="text-xl font-semibold">{formatPriceCOP(total)}</p>
        <div className="flex gap-2">
          <Button variant="outline" onClick={clear}>
            Vaciar
          </Button>
          <Button onClick={payWithPolar}>Pagar con Polar</Button>
        </div>
      </div>
    </div>
  );
}
