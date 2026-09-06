# Eólicos Gallego

Sitio web y tienda de extractores eólicos fabricados en Cali, Colombia. Ventilación ecológica sin electricidad, extractores tipo hongo y pintura térmica.

## Stack

- **Runtime / package manager:** Bun 1.4
- **Framework:** Next.js 16 (App Router) + React 19
- **UI:** Tailwind CSS v4, shadcn/ui, TanStack Table y Query
- **Datos:** Drizzle ORM + PostgreSQL (Neon)
- **Auth:** Better Auth (email/password, verificación de correo, 2FA TOTP y OTP)
- **Pagos:** Polar.sh (plugin de Better Auth)
- **Email:** Resend

## Scripts

```bash
bun install
bun dev
bun run build
bun test
bun run type-check
bun run lint
bun run db:push
bun run db:seed
```

## Variables de entorno

Copia `.env.example` a `.env.local`:

| Variable | Uso |
| --- | --- |
| `DATABASE_URL` | Neon Postgres |
| `BETTER_AUTH_SECRET` | Secreto de sesión |
| `BETTER_AUTH_URL` | URL pública de la app |
| `RESEND_API_KEY` / `RESEND_FROM` | Correos de verificación y 2FA |
| `POLAR_ACCESS_TOKEN` / `POLAR_WEBHOOK_SECRET` | Checkout Polar |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Semilla del administrador |

Sin `DATABASE_URL` la tienda y la landing usan el catálogo estático. Auth, admin y checkout Polar requieren Neon + claves.

## Rutas

- `/` — Landing con extractor girando, galería y SEO para **Eólicos Gallego**
- `/tienda` — Catálogo y compra
- `/admin` — CRUD de extractores eólicos y pintura (rol `admin`)
- `/login`, `/registro`, `/verificar-email`, `/2fa` — Autenticación

## Producción

1. Crear Neon, Resend y Polar.
2. `bun run db:push && bun run db:seed`
3. Asignar `polarProductId` a cada producto desde `/admin`
4. Configurar `BETTER_AUTH_URL` y `NEXT_PUBLIC_SITE_URL` con el dominio
5. Activar 2FA en `/admin/seguridad`

Deploy en Vercel: install `bun install`, build `bun run build`.
