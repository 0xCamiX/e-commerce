# SDD — Eólicos Gallego Redesign + Commerce Platform

**Orchestrator:** Gentle AI methodology (explore → design → apply → verify)  
**Branch:** `cursor/redesign-bun-stack-d412`  
**Priority:** Landing redesign first, then auth/commerce/admin.

## Intent

Rediseñar Eólicos Gallego como una web moderna lista para producción, con Bun como runtime/package manager, SEO para “Eólicos Gallego”, extractor eólico girando en la landing, galería de producto, ecommerce, y `/admin` seguro.

## Stack (user-specified)

Bun · Next.js latest (App Router) · Drizzle · PostgreSQL (Neon) · shadcn/ui · TanStack Table · TanStack Query · Better Auth · Polar.sh plugins · Resend

## Constraints

- Email + verificación de correo + 2FA (TOTP y OTP email)
- Autorización por rol (`admin` vs `customer`)
- Polar checkout for products; WhatsApp fallback if Polar is not configured
- Lazy DB init so `next build` does not crash without `DATABASE_URL`
- Semantic tokens only (shadcn styling rules)
- `proxy.ts` for Next.js 16 (not `middleware.ts`)

## Phases

1. **Explore** — current landing is static marketing; missing images; Bun not on PATH; no auth/db/shop
2. **Design** — route groups `(marketing)`, `(auth)`, `admin`; catalog schema; spinning turbine as LCP visual
3. **Apply** — landing first, then data/auth/shop/admin
4. **Verify** — lint, types, tests, build, browser walkthrough
