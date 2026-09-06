'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') ?? '/admin';
  const [pending, setPending] = useState(false);

  async function onSubmit(formData: FormData) {
    setPending(true);
    const { error } = await authClient.signIn.email({
      email: String(formData.get('email') ?? ''),
      password: String(formData.get('password') ?? ''),
    });
    setPending(false);
    if (error) {
      toast.error(error.message ?? 'No se pudo iniciar sesión');
      return;
    }
    router.push(next);
    router.refresh();
  }

  return (
    <form action={onSubmit} className="flex flex-col gap-6">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Correo</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Contraseña</FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
          />
        </Field>
      </FieldGroup>
      <Button type="submit" disabled={pending}>
        {pending ? 'Entrando…' : 'Entrar'}
      </Button>
    </form>
  );
}
