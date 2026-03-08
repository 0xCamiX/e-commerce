# Especificación de Arquitectura — Eólicos Gallego

**Versión:** 1.0.0  
**Fecha:** Marzo 2026  
**Proyecto:** Landing Page + Catálogo de Productos  
**Rol:** Arquitecto TI

---

## 1. Visión General del Negocio

**Eólicos Gallego** es una empresa colombiana con sede en Cali que ofrece soluciones para la reducción de la sensación térmica en hogares, bodegas y recintos industriales. Su propuesta de valor se centra en productos ecológicos, duraderos y de fabricación local.

### 1.1 Catálogo de Productos

| Producto | Slug | Estado | Descripción |
|---|---|---|---|
| Extractores Eólicos | `/` | Activo | Extractor de ventilación accionado por viento, sin consumo eléctrico |
| Extractores Tipo Hongo | `/extractores-tipo-hongo` | Activo | Extractor premium para ventilación industrial de alta capacidad |
| Pintura Térmica | `/pintura-termica` | **Nuevo** | Pintura + microesferas que rebotan los rayos solares, reduce hasta 20°C en superficie del techo |

### 1.2 Objetivos del Sitio

- Generar **leads y cotizaciones** vía WhatsApp / email
- Posicionar los productos en búsquedas locales (SEO local — Cali, Valle del Cauca, Colombia)
- Comunicar la propuesta diferencial de cada producto con claridad
- Introducir la **Pintura Térmica** como producto nuevo con énfasis especial

---

## 2. Stack Tecnológico

```
Next.js 16.1 (App Router)  ·  React 19  ·  TypeScript 5
Tailwind CSS 4             ·  Shadcn UI  ·  CVA (class-variance-authority)
Framer Motion 12           ·  Lucide React
Bun (runtime + test)       ·  Biome (linter + formatter)
Husky + Commitizen         ·  GitHub Actions (CI)
```

### 2.1 Decisiones de Arquitectura

| Decisión | Elección | Razón |
|---|---|---|
| Rendering | Static Site Generation (SSG) + ISR | Contenido semi-estático, óptimo para SEO y Core Web Vitals |
| Estilos | Tailwind CSS 4 + CSS custom properties | Composición rápida, tokens nativos, zero-runtime |
| Componentes UI | Shadcn UI (headless sobre Radix) | Accesibilidad out-of-the-box, control total sobre estilos |
| Animaciones | Framer Motion | Micro-interacciones y scroll animations de alta calidad |
| Testing | Bun test | Integrado al runtime, sin dependencias extra |
| Linter | Biome | Reemplaza ESLint + Prettier en un solo tool, más rápido |

---

## 3. Arquitectura de Rutas (App Router)

```
src/app/
├── layout.tsx                      # RootLayout: fuentes, metadata global, Navbar, Footer
├── page.tsx                        # Home — Landing principal (Extractores Eólicos)
├── extractores-tipo-hongo/
│   └── page.tsx                    # Página de producto: Extractor Tipo Hongo
├── pintura-termica/                # [POR CREAR]
│   └── page.tsx                    # Página de producto: Pintura Térmica (nuevo)
├── not-found.tsx                   # Página 404 personalizada
├── sitemap.ts                      # Sitemap dinámico para SEO
├── robots.ts                       # robots.txt programático
└── styles/
    └── globals.css                 # Design tokens + Tailwind 4 config
```

### 3.1 Estrategia de Rendering por Ruta

| Ruta | Estrategia | `revalidate` |
|---|---|---|
| `/` | SSG | `false` (build time) |
| `/extractores-tipo-hongo` | SSG | `false` |
| `/pintura-termica` | SSG | `false` |

Todas las páginas son **Server Components** por defecto. Los componentes interactivos (carruseles, formularios de contacto, acordeones) se marcan con `'use client'`.

---

## 4. Estructura de Componentes

### 4.1 Árbol de Componentes (convenciones)

```
src/components/
├── ui/                             # Primitivos Shadcn UI (botones, cards, inputs...)
│   ├── button.tsx
│   ├── card.tsx
│   ├── badge.tsx                   # [POR AGREGAR]
│   ├── accordion.tsx               # [POR AGREGAR]
│   └── icons.tsx                   # Re-exports de Lucide
│
├── layout/                         # [REFACTOR RECOMENDADO]
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── MaxWidthWrapper.tsx
│
├── sections/                       # Secciones globales reutilizables
│   ├── Hero.tsx
│   ├── Prices.tsx
│   ├── Tutorial.tsx
│   ├── Testimonials.tsx
│   ├── Contact.tsx
│   └── PhotoCarousel.tsx
│
├── extractores-tipo-hongo/         # Secciones específicas del producto
│   ├── HeroExtractoresTipoHongo.tsx
│   ├── CaracteristicasExtractoresTipoHongo.tsx
│   ├── AplicacionesExtractoresTipoHongo.tsx
│   └── EspecificacionesExtractoresTipoHongo.tsx
│
└── pintura-termica/                # [POR CREAR] — Producto nuevo
    ├── HeroPinturaTermica.tsx
    ├── BeneficiosPinturaTermica.tsx
    ├── ComparativaPinturaTermica.tsx   # Antes/después de temperatura
    └── EspecificacionesPinturaTermica.tsx
```

### 4.2 Convención de Nomenclatura

- **Componentes:** `PascalCase` — `HeroExtractoresTipoHongo`
- **Archivos de página:** `page.tsx` (convención Next.js App Router)
- **Hooks:** `use` prefix — `useContactForm`
- **Server Actions:** `actions/` — `sendContactEmail`
- **Utilidades:** `camelCase` — `cn`, `formatPrice`

---

## 5. Sistema de Diseño

### 5.1 Paleta de Color (Design Tokens)

El sistema usa **OKLCH** (perceptualmente uniforme) para garantizar accesibilidad y consistencia. Los tokens están definidos en `globals.css` con CSS custom properties.

#### Tokens Brand (por definir en `globals.css`)

```css
:root {
  /* === BRAND EÓLICOS GALLEGO === */
  /* Azul cielo — transmite aire, ventilación, frescura */
  --brand-sky-400:    oklch(0.72 0.14 220);
  --brand-sky-500:    oklch(0.62 0.17 220);
  --brand-sky-600:    oklch(0.52 0.18 220);

  /* Verde ecológico — sustentabilidad, naturaleza */
  --brand-green-400:  oklch(0.72 0.16 145);
  --brand-green-500:  oklch(0.60 0.18 145);

  /* Naranja térmico — calor, energía solar (contraste) */
  --brand-heat-400:   oklch(0.75 0.19 50);
  --brand-heat-500:   oklch(0.65 0.22 50);

  /* Neutros */
  --brand-slate-50:   oklch(0.985 0.002 250);
  --brand-slate-900:  oklch(0.18 0.012 250);
}
```

#### Semántica de Color

| Token Semántico | Light | Dark | Uso |
|---|---|---|---|
| `--primary` | `--brand-sky-500` | `--brand-sky-400` | CTAs, links, énfasis |
| `--accent` | `--brand-green-500` | `--brand-green-400` | Badges "Ecológico", highlights |
| `--heat` | `--brand-heat-500` | `--brand-heat-400` | Pintura Térmica (producto nuevo) |
| `--destructive` | oklch rojo | oklch rojo | Errores |

### 5.2 Tipografía

| Escala | Clase Tailwind | Uso |
|---|---|---|
| Display XL | `text-5xl font-bold tracking-tight` | Títulos Hero |
| Display L | `text-3xl font-bold` | H2 de sección |
| Heading | `text-xl font-semibold` | Tarjetas, subheadings |
| Body | `text-base` | Párrafos |
| Small | `text-sm` | Captions, badges |
| Mono | `font-mono text-sm` | Especificaciones técnicas |

**Fuente recomendada:** Geist Sans (ya instalada vía `next/font`) + Geist Mono para tablas de especificaciones.

### 5.3 Espaciado y Grid

```
Contenedor máximo:  max-w-7xl  (1280px)
Padding horizontal: px-4 sm:px-6 lg:px-8
Grid de productos:  grid-cols-1 md:grid-cols-2 lg:grid-cols-3
Gap secciones:      space-y-24 lg:space-y-32
```

### 5.4 Variantes de Componentes con CVA

```typescript
// Ejemplo: Badge de producto
const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
  {
    variants: {
      variant: {
        ecologico:  'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        nuevo:      'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
        premium:    'bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200',
        default:    'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)
```

---

## 6. Estructura de Páginas — Wireframe por Sección

### 6.1 Home (`/`) — Extractores Eólicos

```
┌─────────────────────────────────────────────┐
│  NAVBAR  (sticky, backdrop-blur)            │
│  Logo | Eólicos · Tipo Hongo · Pintura |CTA │
├─────────────────────────────────────────────┤
│  HERO                                       │
│  Headline impactante + propuesta de valor   │
│  [Carrusel de fotos instalaciones reales]   │
│  CTA: "Cotizar ahora" → WhatsApp            │
├─────────────────────────────────────────────┤
│  BAND DE CONFIANZA                          │
│  Logos clientes / sectores atendidos        │
├─────────────────────────────────────────────┤
│  PRODUCTOS (cards de los 3 productos)       │
│  [Eólico] [Tipo Hongo] [Pintura★NUEVO]     │
├─────────────────────────────────────────────┤
│  BENEFICIOS / FEATURES                      │
│  4 pilares: Ecológico · Local · Garantía · Instalación fácil │
├─────────────────────────────────────────────┤
│  PRECIOS / COTIZACIÓN                       │
│  Tabla de precios o rango + CTA WhatsApp    │
├─────────────────────────────────────────────┤
│  TUTORIAL / CÓMO FUNCIONA                   │
│  Steps animados o video embed               │
├─────────────────────────────────────────────┤
│  TESTIMONIOS                                │
│  Cards de clientes reales                   │
├─────────────────────────────────────────────┤
│  CONTACTO                                   │
│  Formulario + WhatsApp directo + mapa       │
├─────────────────────────────────────────────┤
│  FOOTER                                     │
│  Links · Redes · Teléfono · Dirección       │
└─────────────────────────────────────────────┘
```

### 6.2 Extractores Tipo Hongo (`/extractores-tipo-hongo`)

```
┌─────────────────────────────────────────────┐
│  NAVBAR                                     │
├─────────────────────────────────────────────┤
│  HERO PRODUCTO                              │
│  Imagen hero + headline + CTA cotizar       │
├─────────────────────────────────────────────┤
│  CARACTERÍSTICAS                            │
│  Grid de features técnicas                  │
├─────────────────────────────────────────────┤
│  APLICACIONES                               │
│  Bodegas, fábricas, galpones, etc.          │
├─────────────────────────────────────────────┤
│  ESPECIFICACIONES TÉCNICAS                  │
│  Tabla: diámetros, capacidades, materiales  │
├─────────────────────────────────────────────┤
│  CTA FINAL + CONTACTO                       │
└─────────────────────────────────────────────┘
```

### 6.3 Pintura Térmica (`/pintura-termica`) — **Producto Nuevo**

```
┌─────────────────────────────────────────────┐
│  NAVBAR                                     │
├─────────────────────────────────────────────┤
│  HERO — PRODUCTO NUEVO                      │
│  Badge "NUEVO" prominente                   │
│  Headline: "Reduce hasta 20°C en tu techo"  │
│  Imagen: techo antes/después                │
│  CTA: "Cotizar Pintura Térmica"             │
├─────────────────────────────────────────────┤
│  CÓMO FUNCIONA                              │
│  Diagrama: rayos sol → microesferas →       │
│  reflexión → reducción térmica              │
├─────────────────────────────────────────────┤
│  BENEFICIOS                                 │
│  - Hasta 20°C menos en superficie techo     │
│  - Reduce consumo A/C hasta X%              │
│  - Aplicación sobre pintura existente       │
│  - Resistente al agua y rayos UV            │
├─────────────────────────────────────────────┤
│  COMPARATIVA                                │
│  Visual: Sin pintura vs Con pintura         │
│  (temperatura del techo, interior)          │
├─────────────────────────────────────────────┤
│  APLICACIONES / SUPERFICIES                 │
│  Tejas metálicas, eternit, losa plana       │
├─────────────────────────────────────────────┤
│  ESPECIFICACIONES TÉCNICAS                  │
│  Rendimiento m²/galón, colores, garantía    │
├─────────────────────────────────────────────┤
│  TESTIMONIOS / CASOS DE ÉXITO               │
├─────────────────────────────────────────────┤
│  CTA FINAL + FORMULARIO COTIZACIÓN          │
└─────────────────────────────────────────────┘
```

---

## 7. Configuración Centralizada (`siteConfig`)

El archivo `src/config/site.ts` es la **fuente de verdad** para datos del negocio. Se debe extender para incluir los tres productos de forma estructurada:

```typescript
// src/config/site.ts
export const products = [
  {
    id: 'extractores-eolicos',
    name: 'Extractores Eólicos',
    slug: '/',
    tagline: 'Ventilación ecológica sin consumo eléctrico',
    description: 'Sistema de extracción de aire caliente activado 100% por el viento.',
    badge: null,
    features: ['Sin electricidad', 'Fabricado en Cali', 'Garantía 5 años'],
    image: '/products/extractor-eolico.jpg',
    cta: 'Cotizar Extractor Eólico',
  },
  {
    id: 'extractores-tipo-hongo',
    name: 'Extractores Tipo Hongo',
    slug: '/extractores-tipo-hongo',
    tagline: 'Ventilación industrial de alta capacidad',
    description: 'Extractor premium diseñado para bodegas y recintos industriales de gran volumen.',
    badge: null,
    features: ['Alta capacidad', 'Sin mantenimiento', 'Instalación rápida'],
    image: '/products/extractor-hongo.jpg',
    cta: 'Cotizar Extractor Tipo Hongo',
  },
  {
    id: 'pintura-termica',
    name: 'Pintura Térmica',
    slug: '/pintura-termica',
    tagline: 'Reduce hasta 20°C la temperatura de tu techo',
    description: 'Pintura con microesferas que refleja los rayos solares, reduciendo drásticamente la temperatura superficial del techo.',
    badge: 'NUEVO',
    features: ['-20°C en superficie', 'Ahorro en A/C', 'Fácil aplicación'],
    image: '/products/pintura-termica.jpg',
    cta: 'Cotizar Pintura Térmica',
  },
] as const;
```

---

## 8. SEO & Metadata

### 8.1 Estrategia

- **SEO local:** Optimizar para "extractores eólicos Cali", "ventilación industrial Cali", "pintura térmica Colombia"
- **Open Graph:** Imagen personalizada por página (1200×630)
- **Schema.org:** `LocalBusiness` + `Product` para cada producto
- **Sitemap automático:** `app/sitemap.ts`
- **Core Web Vitals:** LCP < 2.5s, FID < 100ms, CLS < 0.1

### 8.2 Metadata por Página

```typescript
// app/layout.tsx — metadata base
export const metadata: Metadata = {
  metadataBase: new URL('https://eolicosgallego.com'),
  title: {
    default: 'Eólicos Gallego — Ventilación Ecológica en Cali',
    template: '%s | Eólicos Gallego',
  },
  description: 'Extractores eólicos, tipo hongo y pintura térmica para reducir la sensación térmica en hogares, bodegas e industrias en Cali, Colombia.',
  keywords: ['extractores eólicos', 'ventilación industrial', 'pintura térmica', 'Cali', 'Colombia'],
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    siteName: 'Eólicos Gallego',
  },
}

// app/pintura-termica/page.tsx — metadata específica
export const metadata: Metadata = {
  title: 'Pintura Térmica — Reduce hasta 20°C',
  description: 'Pintura con microesferas que refleja los rayos solares y reduce hasta 20°C la temperatura del techo. Disponible en Cali, Colombia.',
}
```

### 8.3 Structured Data (JSON-LD)

```typescript
// src/components/ProductJsonLd.tsx (Server Component)
export function ProductJsonLd({ product }: { product: Product }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          description: product.description,
          brand: {
            '@type': 'Brand',
            name: 'Eólicos Gallego',
          },
          offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            priceCurrency: 'COP',
            seller: {
              '@type': 'LocalBusiness',
              name: 'Eólicos Gallego',
              address: { '@type': 'PostalAddress', addressLocality: 'Cali', addressCountry: 'CO' },
              telephone: '+573177525559',
            },
          },
        }),
      }}
    />
  )
}
```

---

## 9. Rendimiento y Optimización

### 9.1 Imágenes

- Usar siempre `next/image` con `sizes` prop
- Formatos: WebP por defecto, AVIF como óptimo
- Hero images: `priority` flag activado
- Carrusel: lazy load para imágenes fuera del viewport

```tsx
// Correcto
<Image
  src="/hero-pictures/1.jpeg"
  alt="Instalación extractor eólico en bodega"
  width={1200}
  height={600}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
  priority  // Solo en imágenes above-the-fold
/>
```

### 9.2 Fonts

- Usar `next/font/google` (ya configurado con Geist)
- `display: 'swap'` para evitar FOIT
- Preload solo de la fuente principal

### 9.3 Animaciones

- Usar `framer-motion` con `initial`/`animate`/`whileInView` para scroll animations
- Respetar `prefers-reduced-motion` con la variante `useReducedMotion()`
- Lazy-load componentes pesados con `next/dynamic` + `{ ssr: false }` si usan APIs del browser

```typescript
// Patrón de animación de entrada estándar
const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' },
}
```

---

## 10. Gestión de Contacto y Leads

### 10.1 Canal principal — WhatsApp

El CTA primario debe ser un enlace directo a WhatsApp con mensaje predefinido por producto:

```typescript
// src/lib/whatsapp.ts
export function buildWhatsAppUrl(product: string) {
  const phone = '573177525559'
  const message = encodeURIComponent(
    `Hola, estoy interesado en cotizar: ${product}. ¿Me pueden dar más información?`
  )
  return `https://wa.me/${phone}?text=${message}`
}
```

### 10.2 Formulario de Contacto

- Implementar como **Server Action** en `app/actions/contact.ts`
- Validación con `zod` (por agregar al proyecto)
- Envío de email vía Resend o Nodemailer
- Estado de envío con `useFormState` + `useFormStatus`

```typescript
// app/actions/contact.ts
'use server'

import { z } from 'zod'

const ContactSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(7),
  product: z.enum(['extractores-eolicos', 'extractores-tipo-hongo', 'pintura-termica']),
  message: z.string().min(10),
})

export async function sendContactForm(formData: FormData) {
  const validated = ContactSchema.safeParse(Object.fromEntries(formData))
  if (!validated.success) return { error: 'Datos inválidos' }
  // ... enviar email
  return { success: true }
}
```

---

## 11. Testing

### 11.1 Estrategia

| Nivel | Herramienta | Qué probar |
|---|---|---|
| Unitario | `bun test` | Utilidades (`cn`, `buildWhatsAppUrl`, validaciones) |
| Componentes | Próximamente | Render correcto de props, variantes |
| E2E | Próximamente (Playwright) | Flujo de cotización end-to-end |

### 11.2 Estructura

```
src/tests/
├── utils/          # Tests de funciones utilitarias
├── components/     # Tests de componentes (por implementar)
├── lib/            # Tests de lógica de negocio
└── integration/    # Tests de integración (por implementar)
```

---

## 12. CI/CD

```yaml
# .github/workflows/ci.yml (existente)
# Pipeline:
# 1. bun install
# 2. biome check (lint + format)
# 3. tsc --noEmit (type check)
# 4. bun test
# 5. next build
```

**Deploy recomendado:** Vercel (integración nativa con Next.js, Edge Network, Analytics).

---

## 13. Roadmap de Implementación

### Sprint 1 — Fundamentos (Prioridad Alta)

- [ ] Refactorizar colores del design system a paleta brand de Eólicos Gallego
- [ ] Agregar página `/pintura-termica` con todas sus secciones
- [ ] Actualizar `siteConfig` con estructura de 3 productos
- [ ] Agregar `pintura-termica` al Navbar y navegación

### Sprint 2 — Contenido y SEO (Prioridad Alta)

- [ ] Implementar `sitemap.ts` y `robots.ts`
- [ ] Agregar metadata específica por página con Open Graph
- [ ] Agregar JSON-LD (`LocalBusiness` + `Product`) en cada página
- [ ] Optimizar imágenes del carrusel con `next/image`

### Sprint 3 — Conversión (Prioridad Media)

- [ ] Integrar botón flotante de WhatsApp con mensaje por producto
- [ ] Implementar Server Action para formulario de contacto
- [ ] Agregar `zod` para validación de formulario
- [ ] A/B test de CTAs (WhatsApp vs formulario)

### Sprint 4 — Calidad (Prioridad Media)

- [ ] Agregar tests unitarios para utilidades
- [ ] Implementar `loading.tsx` con Skeleton en páginas de producto
- [ ] Agregar `error.tsx` con fallback amigable
- [ ] Auditoría Lighthouse (target: ≥ 95 en Performance, SEO, Accessibility)

### Sprint 5 — Expansión (Prioridad Baja / Futuro)

- [ ] Blog / artículos SEO ("Cómo reducir temperatura en bodega")
- [ ] Galería de proyectos instalados
- [ ] Calculadora de ahorro en A/C con pintura térmica
- [ ] Integración con CRM para gestión de leads

---

## 14. Convenciones del Proyecto

### Commits

Seguir **Conventional Commits** (via Commitizen):

```
feat(pintura-termica): agregar página de producto nuevo
fix(hero): corregir responsividad en mobile
chore(deps): actualizar framer-motion a 12.x
```

### Importaciones

```typescript
// 1. Librerías externas
import { Suspense } from 'react'
import Image from 'next/image'

// 2. Componentes internos (path alias @/)
import { Button } from '@/components/ui/button'
import { MaxWidthWrapper } from '@/components/layout/MaxWidthWrapper'

// 3. Config / utils
import { siteConfig, products } from '@/config/site'
import { cn, buildWhatsAppUrl } from '@/lib/utils'
```

### Variables de Entorno

```bash
# .env.local
NEXT_PUBLIC_WHATSAPP_PHONE=573177525559   # Público, ok en client components
RESEND_API_KEY=re_xxx                      # Privado, solo Server Actions
NEXT_PUBLIC_SITE_URL=https://eolicosgallego.com
```

---

## 15. Diagrama de Componentes — Pintura Térmica (Producto Nuevo)

```
/pintura-termica (page.tsx — Server Component)
│
├── <HeroPinturaTermica />           [Server] — headline, badge NUEVO, imagen, CTA
│   └── <Badge variant="nuevo" />    [UI primitive]
│   └── <Button asChild />           [WhatsApp link]
│
├── <ComoFuncionaPintura />          [Server] — animación rayos → microesferas
│   └── <DiagramaReflexion />        [Client — Framer Motion]
│
├── <BeneficiosPinturaTermica />     [Server] — grid de 4 beneficios
│   └── <FeatureCard />[]            [Server]
│
├── <ComparativaTermica />           [Client] — slider antes/después visual
│
├── <AplicacionesPintura />          [Server] — tipos de techo compatibles
│
├── <EspecificacionesPintura />      [Server] — tabla técnica
│
├── <TestimoniosPintura />           [Server + Suspense]
│
└── <ContactoPintura />              [Client — Server Action]
    └── useFormState / useFormStatus
```

---

*Documento generado por el Arquitecto TI del proyecto — Eólicos Gallego, Cali, Colombia.*  
*Revisión programada: al finalizar cada sprint.*
