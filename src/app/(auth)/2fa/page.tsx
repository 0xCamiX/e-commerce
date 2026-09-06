import type { Metadata } from 'next';
import { TwoFactorForm } from '@/components/auth/TwoFactorForm';

export const metadata: Metadata = {
  title: 'Verificación 2FA',
  robots: { index: false, follow: false },
};

export default function TwoFactorPage() {
  return (
    <>
      <h1 className="mb-2 text-2xl">Segundo factor</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Confirma tu identidad con TOTP o un código enviado por correo.
      </p>
      <TwoFactorForm />
    </>
  );
}
