import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Iniciar sesión',
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <>
      <h1 className="mb-2 text-2xl">Iniciar sesión</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Acceso seguro para clientes y administradores.
      </p>
      <Suspense>
        <LoginForm />
      </Suspense>
      <p className="mt-6 text-sm text-muted-foreground">
        ¿No tienes cuenta? <Link href="/registro">Regístrate</Link>
      </p>
    </>
  );
}
