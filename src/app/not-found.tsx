import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <h1>Página no encontrada</h1>
      <p className="mt-3 text-muted-foreground">
        Vuelve al catálogo de extractores eólicos de Eólicos Gallego.
      </p>
      <Button asChild className="mt-6">
        <Link href="/">Ir al inicio</Link>
      </Button>
    </div>
  );
}
