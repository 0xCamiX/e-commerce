'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { authClient } from '@/lib/auth-client';

export function TwoFactorForm() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [pending, setPending] = useState(false);

  async function verifyTotp() {
    setPending(true);
    const { error } = await authClient.twoFactor.verifyTotp({ code });
    setPending(false);
    if (error) {
      toast.error(error.message ?? 'Código TOTP inválido');
      return;
    }
    router.push('/admin');
  }

  async function sendEmailOtp() {
    const { error } = await authClient.twoFactor.sendOtp();
    if (error) toast.error(error.message ?? 'No se pudo enviar el OTP');
    else toast.success('Código enviado al correo');
  }

  async function verifyEmailOtp() {
    setPending(true);
    const { error } = await authClient.twoFactor.verifyOtp({ code });
    setPending(false);
    if (error) {
      toast.error(error.message ?? 'OTP inválido');
      return;
    }
    router.push('/admin');
  }

  return (
    <Tabs defaultValue="app">
      <TabsList>
        <TabsTrigger value="app">App autenticadora</TabsTrigger>
        <TabsTrigger value="email">Código por correo</TabsTrigger>
      </TabsList>
      <TabsContent value="app" className="mt-6">
        <FieldGroup>
          <Field>
            <FieldLabel>Código TOTP</FieldLabel>
            <InputOTP maxLength={6} value={code} onChange={setCode}>
              <InputOTPGroup>
                {[0, 1, 2, 3, 4, 5].map(slot => (
                  <InputOTPSlot key={slot} index={slot} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </Field>
        </FieldGroup>
        <Button className="mt-4" onClick={verifyTotp} disabled={pending}>
          Verificar
        </Button>
      </TabsContent>
      <TabsContent value="email" className="mt-6">
        <Button variant="outline" onClick={sendEmailOtp}>
          Enviar código al correo
        </Button>
        <FieldGroup className="mt-4">
          <Field>
            <FieldLabel>Código email</FieldLabel>
            <InputOTP maxLength={6} value={code} onChange={setCode}>
              <InputOTPGroup>
                {[0, 1, 2, 3, 4, 5].map(slot => (
                  <InputOTPSlot key={slot} index={slot} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </Field>
        </FieldGroup>
        <Button className="mt-4" onClick={verifyEmailOtp} disabled={pending}>
          Verificar correo
        </Button>
      </TabsContent>
    </Tabs>
  );
}
