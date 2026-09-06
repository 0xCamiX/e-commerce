import type { Metadata } from 'next';
import { VerifyEmailForm } from '@/components/auth/VerifyEmailForm';

export const metadata: Metadata = {
  title: 'Verificar correo',
  robots: { index: false, follow: false },
};

export default function VerifyEmailPage() {
  return (
    <>
      <h1 className="mb-2 text-2xl">Verifica tu correo</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Ingresa el código de 6 dígitos que enviamos a tu email.
      </p>
      <VerifyEmailForm />
    </>
  );
}
