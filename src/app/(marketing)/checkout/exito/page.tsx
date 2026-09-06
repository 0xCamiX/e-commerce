import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Pago confirmado',
  robots: { index: false, follow: false },
};

export default function CheckoutSuccessPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1>Gracias por tu compra</h1>
      <p className="mt-4 text-muted-foreground">
        Recibimos tu pedido de Eólicos Gallego. Te contactaremos para
        coordinación de envío o instalación.
      </p>
      <Button asChild className="mt-8">
        <Link href="/tienda">Seguir comprando</Link>
      </Button>
    </div>
  );
}
