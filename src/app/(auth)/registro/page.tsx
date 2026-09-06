import type { Metadata } from 'next';
import Link from 'next/link';
import { RegisterForm } from '@/components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Crear cuenta',
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  return (
    <>
      <h1 className="mb-2 text-2xl">Crear cuenta</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Verificaremos tu correo con un enlace y un código.
      </p>
      <RegisterForm />
      <p className="mt-6 text-sm text-muted-foreground">
        ¿Ya tienes cuenta? <Link href="/login">Entrar</Link>
      </p>
    </>
  );
}
