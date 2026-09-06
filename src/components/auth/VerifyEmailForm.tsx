'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { authClient } from '@/lib/auth-client';

export function VerifyEmailForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [pending, setPending] = useState(false);

  async function sendCode() {
    setPending(true);
    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email,
      type: 'email-verification',
    });
    setPending(false);
    if (error) {
      toast.error(error.message ?? 'No se pudo enviar el código');
      return;
    }
    toast.success('Código enviado');
  }

  async function verify() {
    setPending(true);
    const { error } = await authClient.emailOtp.verifyEmail({
      email,
      otp,
    });
    setPending(false);
    if (error) {
      toast.error(error.message ?? 'Código inválido');
      return;
    }
    toast.success('Correo verificado');
    router.push('/admin');
  }

  return (
    <div className="flex flex-col gap-6">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Correo</FieldLabel>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
        </Field>
        <Field>
          <FieldLabel>Código de 6 dígitos</FieldLabel>
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              {Array.from({ length: 6 }).map((_, index) => (
                <InputOTPSlot key={`otp-${index}`} index={index} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </Field>
      </FieldGroup>
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={sendCode}
          disabled={pending}
        >
          Enviar código
        </Button>
        <Button
          type="button"
          onClick={verify}
          disabled={pending || otp.length < 6}
        >
          Verificar
        </Button>
      </div>
    </div>
  );
}
