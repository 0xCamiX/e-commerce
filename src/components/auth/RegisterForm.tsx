'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';

export function RegisterForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function onSubmit(formData: FormData) {
    setPending(true);
    const { error } = await authClient.signUp.email({
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      password: String(formData.get('password') ?? ''),
    });
    setPending(false);
    if (error) {
      toast.error(error.message ?? 'No se pudo crear la cuenta');
      return;
    }
    toast.success('Revisa tu correo para verificar la cuenta');
    router.push('/verificar-email');
  }

  return (
    <form action={onSubmit} className="flex flex-col gap-6">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Nombre</FieldLabel>
          <Input id="name" name="name" required autoComplete="name" />
        </Field>
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
            minLength={10}
            autoComplete="new-password"
          />
        </Field>
      </FieldGroup>
      <Button type="submit" disabled={pending}>
        {pending ? 'Creando…' : 'Crear cuenta'}
      </Button>
    </form>
  );
}
