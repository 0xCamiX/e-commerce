'use client';

import QRCode from 'qrcode';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';

export default function AdminSecurityPage() {
  const [password, setPassword] = useState('');
  const [qr, setQr] = useState<string | null>(null);
  const [code, setCode] = useState('');

  async function enable() {
    const { data, error } = await authClient.twoFactor.enable({
      password,
      method: 'totp',
    });
    if (error || !data || data.method !== 'totp') {
      toast.error(error?.message ?? 'No se pudo activar 2FA');
      return;
    }
    const dataUrl = await QRCode.toDataURL(data.totpURI);
    setQr(dataUrl);
    toast.message('Escanea el QR y verifica un código para activar 2FA');
  }

  async function verify() {
    const { error } = await authClient.twoFactor.verifyTotp({ code });
    if (error) {
      toast.error(error.message ?? 'Código inválido');
      return;
    }
    toast.success('2FA activado');
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-3xl">Seguridad 2FA</h1>
      <p className="mt-2 mb-6 text-sm text-muted-foreground">
        Activa TOTP con una app autenticadora. También puedes usar códigos por
        correo en el inicio de sesión.
      </p>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="password">Contraseña actual</FieldLabel>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </Field>
      </FieldGroup>
      <Button className="mt-4" onClick={enable}>
        Generar QR TOTP
      </Button>
      {qr ? (
        <div className="mt-6 flex flex-col gap-4">
          {/* biome-ignore lint/performance/noImgElement: QR data URL from authenticator setup */}
          <img src={qr} alt="QR TOTP Eólicos Gallego" className="size-48" />
          <Field>
            <FieldLabel htmlFor="code">Código de verificación</FieldLabel>
            <Input
              id="code"
              value={code}
              onChange={event => setCode(event.target.value)}
            />
          </Field>
          <Button onClick={verify}>Confirmar 2FA</Button>
        </div>
      ) : null}
    </div>
  );
}
