# Feature Spec — Página Pintura Térmica

**Versión:** 1.0.0  
**Fecha:** Marzo 2026  
**Ruta:** `/pintura-termica`  
**Prioridad:** Alta — Producto nuevo, diferenciador de negocio  
**Dependencia:** `docs/spec-architecture.md`

---

## 1. Objetivo de la Página

Presentar la **Pintura Térmica** como el producto innovador de Eólicos Gallego. La página debe:

1. Comunicar el beneficio principal en los primeros 3 segundos: **"Reduce hasta 20°C la temperatura de tu techo"**
2. Educar al usuario sobre la tecnología de microesferas (diferenciación vs. pintura común)
3. Generar leads calificados mediante WhatsApp y formulario de cotización
4. Posicionar SEO para: `pintura térmica Colombia`, `pintura reflectiva techo Cali`, `cómo bajar temperatura techo`

---

## 2. Especificaciones de la Imagen Hero

### 2.1 Prompt Optimizado para Gemini Imagen

```
PROMPT PARA GEMINI (Imagen Pro / Imagen 3):

Photorealistic commercial photography for a landing page hero section.

Scene: A professional worker in clean white work clothes and a safety helmet applies
white thermal insulating paint on a large flat concrete rooftop under intense Colombian
midday sunlight. The worker is using a professional long-handle roller, mid-action,
with visible white paint coverage on dark concrete. Steam or heat shimmer rises
from the unpainted dark gray side of the roof, while the freshly painted white area
looks cool and crisp.

Composition: Wide-angle shot (35mm equivalent), rule of thirds. Worker positioned
on the RIGHT third of the frame — leave the LEFT two-thirds intentionally empty for
text overlay. Camera height: low angle at ~1.2m looking slightly up toward the worker
to convey scale and importance.

Lighting: Harsh equatorial midday sun casting strong shadows (10am–2pm aesthetic),
creating dramatic contrast between the hot dark unpainted surface (warm amber tones,
heat shimmer) and the cool bright white painted area. Golden-warm sky with a few
wispy clouds.

Mood: Transformation, expertise, relief from heat. Photojournalistic but polished.
Color palette: whites and off-whites (painted surface), charcoal gray (unpainted
concrete), warm amber and orange tones in sky/shadows, clean blue sky.

Technical: Shot on Canon EOS R5, 35mm f/2.8, ISO 200. 8K resolution, ultra-sharp,
no chromatic aberration. No text, no logos, no watermarks. Commercial product
photography quality.

Negative prompt: cartoon, illustration, painting, anime, blurry, low quality, 
text overlays, brand logos, unrealistic colors, studio background.
```

### 2.2 Especificaciones Técnicas de la Imagen

| Parámetro | Valor | Razón |
|---|---|---|
| **Resolución mínima** | 2880 × 1620 px | Cubre pantallas Retina 4K |
| **Relación de aspecto** | 16:9 | Hero full-width estándar |
| **Formato de entrega** | PNG sin comprimir | Fuente de alta calidad |
| **Formato producción** | WebP / AVIF (auto, via `next/image`) | Óptimo para web |
| **Tamaño objetivo web** | < 300 KB (WebP) | Core Web Vitals — LCP < 2.5s |
| **Área libre texto** | 60% izquierda del frame | Para overlay de headline/CTA |
| **Punto focal** | Trabajador tercio derecho | No oculto por texto |
| **Color dominante** | Blancos + grises cálidos | Armonía con brand colors |

### 2.3 Variantes a Generar

Generar **3 variantes** de la misma escena con diferente composición para A/B test:

| Variante | Composición | Uso |
|---|---|---|
| `hero-pintura-v1.jpg` | Trabajador a la derecha, texto a la izquierda | Desktop principal |
| `hero-pintura-v2.jpg` | Trabajador centrado, techo en primer plano | Mobile (portrait crop) |
| `hero-pintura-v3.jpg` | Vista aérea del techo mitad pintado / mitad sin pintar | Alternativa editorial |

### 2.4 Proceso en Next.js

```tsx
// Uso correcto en HeroPinturaTermica.tsx
<Image
  src="/products/pintura-termica/hero-pintura-v1.jpg"
  alt="Trabajador aplicando pintura térmica en techo plano de concreto en Cali, Colombia"
  width={2880}
  height={1620}
  sizes="100vw"
  quality={90}
  priority          // Above the fold — no lazy load
  className="object-cover object-center"
/>
```

---

## 3. Arquitectura de la Página

### 3.1 Ruta y Archivos

```
src/app/pintura-termica/
├── page.tsx                        # Server Component — composición de secciones
├── layout.tsx                      # Opcional: metadata específica del producto
└── loading.tsx                     # Skeleton mientras cargan datos

src/components/pintura-termica/
├── HeroPinturaTermica.tsx          # Sección hero — Server Component
├── ComoFuncionaPintura.tsx         # Animación tecnología microesferas — Client
├── BeneficiosPintura.tsx           # Grid de beneficios — Server Component
├── ComparativaTermica.tsx          # Slider antes/después — Client Component
├── AplicacionesPintura.tsx         # Superficies compatibles — Server Component
├── EspecificacionesPintura.tsx     # Tabla técnica — Server Component
├── TestimoniosPintura.tsx          # Social proof — Server + Suspense
└── CtaPinturaTermica.tsx           # CTA final + formulario — Client Component
```

### 3.2 Rendering Strategy

```
page.tsx (Server)
│
├── <HeroPinturaTermica />          → SSG (estático)
├── <ComoFuncionaPintura />         → 'use client' (Framer Motion)
├── <BeneficiosPintura />           → SSG (estático)
├── <ComparativaTermica />          → 'use client' (slider interactivo)
├── <AplicacionesPintura />         → SSG (estático)
├── <EspecificacionesPintura />     → SSG (estático)
├── <Suspense fallback={<Skeleton />}>
│   └── <TestimoniosPintura />      → SSG con revalidación cada 24h
└── <CtaPinturaTermica />           → 'use client' (formulario + Server Action)
```

---

## 4. Diseño de Secciones

### 4.1 Sección 1: Hero

**Objetivo:** Impactar en < 3 segundos. El usuario debe entender qué es y cuál es el beneficio principal.

```
┌──────────────────────────────────────────────────────────────┐
│  [NAVBAR]                                                    │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────┐  ┌───────────────────────┐ │
│  │  Badge: ✦ NUEVO PRODUCTO    │  │                       │ │
│  │                             │  │  [Imagen hero:        │ │
│  │  Reduce hasta               │  │   Trabajador          │ │
│  │  20°C la temperatura        │  │   aplicando           │ │
│  │  de tu techo                │  │   pintura en techo]   │ │
│  │                             │  │                       │ │
│  │  Pintura con microesferas   │  │  ┌─────────────────┐  │ │
│  │  que refleja los rayos      │  │  │ ████ ANTES 48°C │  │ │
│  │  solares y transforma       │  │  │ ░░░░ DESPUÉS 28°C│ │ │
│  │  cualquier superficie.      │  │  └─────────────────┘  │ │
│  │                             │  │  Termómetro animado   │ │
│  │  [Cotizar ahora →]          │  └───────────────────────┘ │
│  │  [Ver cómo funciona ↓]      │                            │
│  └─────────────────────────────┘                            │
│                                                              │
│  ──── Aplicable en: Hogares · Bodegas · Fábricas · Galpones ─│
└──────────────────────────────────────────────────────────────┘
```

**Props del componente:**

```tsx
// src/components/pintura-termica/HeroPinturaTermica.tsx
interface HeroPinturaTermicaProps {
  headline?: string         // default: "Reduce hasta 20°C la temperatura de tu techo"
  subheadline?: string      // default: "Pintura con microesferas que refleja..."
  ctaPrimary?: string       // default: "Cotizar ahora"
  ctaSecondary?: string     // default: "Ver cómo funciona"
  heroImage?: string        // default: "/products/pintura-termica/hero-pintura-v1.jpg"
}
```

**Tokens de color del Hero:**

```css
/* Gradiente de temperatura: naranja calor → blanco fresco */
--hero-heat-gradient: linear-gradient(135deg,
  oklch(0.75 0.19 50) 0%,   /* naranja cálido */
  oklch(0.85 0.08 60) 50%,  /* amarillo suave */
  oklch(0.98 0.01 0) 100%   /* blanco */
);

/* Overlay del hero para legibilidad del texto */
--hero-text-overlay: linear-gradient(
  to right,
  oklch(0.08 0.005 250 / 0.75) 0%,
  oklch(0.08 0.005 250 / 0.40) 60%,
  transparent 100%
);
```

---

### 4.2 Sección 2: Cómo Funciona (Tecnología de Microesferas)

**Objetivo:** Educar y diferenciarse de pintura regular. Usar una animación visual del proceso físico.

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│   La ciencia detrás de la frescura                          │
│                                                              │
│   ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌────────┐  │
│   │ ☀️ Rayos │ → │ 🔵 Micro │ → │ ↩ Refle │ → │ ❄️ -20°│  │
│   │  solares │   │esferas   │   │  xión    │   │  C     │  │
│   └──────────┘   └──────────┘   └──────────┘   └────────┘  │
│                                                              │
│   Diagrama cross-section del techo:                         │
│   [Animación: rayo entra → choca microesfera → rebota]      │
│                                                              │
│   Sin pintura térmica      Con pintura térmica              │
│   Absorción: 85%           Absorción: 15%                   │
│   Reflexión: 15%           Reflexión: 85%                   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Implementación:** Framer Motion con `useInView` para activar la animación al hacer scroll.

```tsx
// Flujo de animación (4 pasos secuenciales)
const steps = [
  { icon: '☀️', title: 'Rayos solares', desc: 'Inciden sobre la superficie del techo' },
  { icon: '🔬', title: 'Microesferas cerámicas', desc: 'Capa de microesferas huecas en la pintura' },
  { icon: '↩️', title: 'Reflexión solar', desc: 'El 85% de la radiación es rebotada' },
  { icon: '🌡️', title: 'Reducción térmica', desc: 'Hasta 20°C menos en la superficie' },
]
```

---

### 4.3 Sección 3: Beneficios

**Objetivo:** 4 tarjetas de beneficios cuantificables. Datos concretos generan confianza.

| # | Ícono | Título | Descripción | Dato |
|---|---|---|---|---|
| 1 | `Thermometer` | Hasta 20°C menos | Reducción en temperatura superficial del techo | `−20°C` |
| 2 | `Zap` | Ahorro en climatización | Menor carga calorífica = menor uso de A/C | `hasta 30%` |
| 3 | `Droplets` | Resistente al agua | Fórmula impermeabilizante integrada | `IP65` |
| 4 | `Shield` | Garantía de durabilidad | Resistente a rayos UV y ciclos de lluvia | `5 años` |

```tsx
interface BeneficioItem {
  icon: LucideIcon
  stat: string          // "−20°C"
  title: string         // "Reducción térmica"
  description: string   // "Hasta 20 grados menos..."
  color: 'heat' | 'sky' | 'green' | 'slate'
}
```

---

### 4.4 Sección 4: Comparativa Visual (Antes / Después)

**Objetivo:** Evidencia visual del impacto. Un slider interactivo es más efectivo que texto.

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│   Mira la diferencia                                        │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  ANTES                  ┃│┃   DESPUÉS                 │  │
│  │  Sin pintura térmica    ┃│┃   Con pintura térmica     │  │
│  │  🌡️ Techo: 65°C        ┃│┃   🌡️ Techo: 45°C         │  │
│  │  🏠 Interior: 38°C      ┃│┃   🏠 Interior: 28°C      │  │
│  │  [foto techo oscuro     ┃│┃   [foto techo pintado     │  │
│  │   absorbiendo calor]    ┃│┃   blanco/gris claro]      │  │
│  │                         ┃│┃                           │  │
│  └───────────────────────────────────────────────────────┘  │
│                       ◁──●──▷                               │
│                  [Arrastra para comparar]                    │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Implementación:** React Image Comparison Slider con Framer Motion.

```tsx
'use client'
// src/components/pintura-termica/ComparativaTermica.tsx

interface ComparativaTermicaProps {
  beforeImage: string   // "/products/pintura-termica/techo-antes.jpg"
  afterImage: string    // "/products/pintura-termica/techo-despues.jpg"
  beforeTemp?: string   // "65°C"
  afterTemp?: string    // "45°C"
}
```

---

### 4.5 Sección 5: Superficies Compatibles

**Objetivo:** Resolver la objeción "¿funciona en mi techo?". Grid visual de tipos de superficie.

| Superficie | Imagen | Nota |
|---|---|---|
| Losa de concreto plana | Ilustración/foto | Más común, máximo beneficio |
| Teja metálica (zinc/galvanizada) | Ilustración/foto | Alta ganancia térmica, ideal |
| Eternit / fibrocemento | Ilustración/foto | Muy común en Colombia |
| Teja de barro | Ilustración/foto | Con imprimante previo |
| Techos de PVC | Ilustración/foto | Compatible directo |

---

### 4.6 Sección 6: Especificaciones Técnicas

**Objetivo:** Credibilidad con compradores técnicos (ingenieros, arquitectos, contratistas).

```
┌─────────────────────────────────────────────────────┐
│  Especificaciones del Producto                      │
├────────────────────────┬────────────────────────────┤
│  Reflectancia solar     │  ≥ 85% (ASTM E903)        │
│  Emisividad térmica     │  ≥ 0.90                   │
│  Índice de reflectancia │  SRI ≥ 104                │
│  Rendimiento            │  4–6 m² por litro         │
│  Capas recomendadas     │  2 manos                  │
│  Tiempo de secado       │  2–4 horas por mano       │
│  Temperatura aplicación │  10°C – 40°C              │
│  Resistencia UV         │  Clase A (10 años)        │
│  Base                   │  Al agua / acrílica       │
│  Colores disponibles    │  Blanco, Gris Claro, Beige│
│  Garantía               │  5 años                  │
└────────────────────────┴────────────────────────────┘
```

---

### 4.7 Sección 7: Testimonios

**Objetivo:** Prueba social. Reducir fricción antes del CTA final.

```tsx
interface TestimonioPinturaTermica {
  name: string
  role: string          // "Dueño de bodega industrial"
  location: string      // "Yumbo, Valle del Cauca"
  quote: string
  tempReduction?: string  // "Reduje 18°C en mi bodega"
  avatar?: string
  stars: 1 | 2 | 3 | 4 | 5
}
```

---

### 4.8 Sección 8: CTA Final

**Objetivo:** Convertir el interés en acción. Dos canales: WhatsApp (inmediato) + formulario (formal).

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│   ¿Listo para enfriar tu espacio?                           │
│                                                              │
│   Cotización sin compromiso · Respuesta en < 2 horas        │
│                                                              │
│   ┌─────────────────────────┐  ┌─────────────────────────┐  │
│   │  📱 Cotizar por         │  │  📧 Formulario de       │  │
│   │     WhatsApp            │  │     Contacto            │  │
│   │  [Abrir WhatsApp →]     │  │  [Nombre] [Teléfono]    │  │
│   │  Respuesta inmediata    │  │  [Ciudad] [Mensaje]     │  │
│   └─────────────────────────┘  │  [Enviar Cotización →]  │  │
│                                └─────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

---

## 5. Design Tokens — Pintura Térmica

La página de Pintura Térmica introduce el **tema cálido** del producto, diferenciándose visualmente de los extractores (azul/verde).

### 5.1 Tokens de Producto

```css
/* globals.css — extender la sección :root */
:root {
  /* === Pintura Térmica — Heat Palette === */
  --heat-50:   oklch(0.98 0.02 55);   /* casi blanco cálido */
  --heat-100:  oklch(0.95 0.05 52);
  --heat-200:  oklch(0.88 0.10 50);
  --heat-400:  oklch(0.75 0.18 50);   /* naranja cálido primario */
  --heat-500:  oklch(0.65 0.22 48);   /* naranja intenso */
  --heat-600:  oklch(0.55 0.22 45);
  --heat-900:  oklch(0.25 0.10 40);   /* marrón oscuro */

  /* Thermal gradient — usado en hero y sección comparativa */
  --gradient-thermal:
    linear-gradient(135deg,
      oklch(0.65 0.22 48) 0%,
      oklch(0.85 0.12 55) 50%,
      oklch(0.98 0.02 55) 100%
    );

  /* Cool/Painted side gradient */
  --gradient-cool:
    linear-gradient(135deg,
      oklch(0.62 0.17 220) 0%,
      oklch(0.82 0.10 210) 50%,
      oklch(0.97 0.02 220) 100%
    );
}
```

### 5.2 Tailwind Clases Utilitarias Nuevas

Agregar en `globals.css` con `@layer utilities`:

```css
@layer utilities {
  .heat-gradient {
    background: var(--gradient-thermal);
  }

  .cool-gradient {
    background: var(--gradient-cool);
  }

  .text-heat {
    color: oklch(0.65 0.22 48);
  }

  .bg-heat-50 {
    background-color: oklch(0.98 0.02 55);
  }

  .badge-nuevo {
    @apply inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold
           bg-amber-100 text-amber-800 border border-amber-200
           dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800;
  }
}
```

---

## 6. Metadata y SEO

```typescript
// src/app/pintura-termica/page.tsx

export const metadata: Metadata = {
  title: 'Pintura Térmica — Reduce hasta 20°C la Temperatura de tu Techo',
  description:
    'Pintura con microesferas cerámicas que refleja los rayos solares y reduce hasta 20°C la temperatura superficial del techo. Disponible en Cali y todo el Valle del Cauca, Colombia.',
  keywords: [
    'pintura térmica Colombia',
    'pintura reflectiva techo',
    'cómo bajar temperatura techo',
    'pintura aislante térmica Cali',
    'reducir calor bodega',
    'microesferas cerámicas techo',
    'pintura solar reflective Cali',
    'Eólicos Gallego pintura',
  ],
  openGraph: {
    title: 'Pintura Térmica — Reduce hasta 20°C | Eólicos Gallego',
    description: 'Pintura con microesferas que refleja el sol. Hasta 20°C menos en tu techo. Disponible en Cali, Colombia.',
    images: [
      {
        url: '/og/pintura-termica-og.jpg',  // 1200×630px
        width: 1200,
        height: 630,
        alt: 'Pintura Térmica Eólicos Gallego — Antes y Después',
      },
    ],
    type: 'website',
    locale: 'es_CO',
  },
  alternates: {
    canonical: 'https://eolicosgallego.com/pintura-termica',
  },
}
```

### 6.1 Open Graph Image (`/og/pintura-termica-og.jpg`)

Especificaciones para la imagen OG (diferente al hero):

| Parámetro | Valor |
|---|---|
| Dimensiones | 1200 × 630 px |
| Formato | JPEG, calidad 85 |
| Composición | Logo izquierda + "−20°C" centrado grande + techo dividido antes/después |
| Texto en imagen | "Pintura Térmica · Eólicos Gallego · Reduce hasta 20°C" |

---

## 7. Animaciones (Framer Motion)

### 7.1 Variantes Globales del Producto

```typescript
// src/lib/animations.ts — agregar variantes de pintura térmica

export const heatReveal = {
  hidden: { opacity: 0, scale: 0.95, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export const slideFromLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export const staggerChildren = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

export const thermometerFill = {
  hidden: { scaleY: 0, originY: 1 },
  visible: {
    scaleY: 1,
    transition: { duration: 1.2, ease: 'easeInOut', delay: 0.3 },
  },
}
```

### 7.2 Microinteracciones

| Elemento | Animación | Trigger |
|---|---|---|
| Badge "NUEVO" | Pulse suave (ring) | Siempre activo |
| Stat cards (`−20°C`) | Count-up al entrar al viewport | `whileInView` |
| Diagrama microesferas | Rayo animado rebotando | `whileInView` |
| Slider comparativa | Drag con inercia | Interacción usuario |
| CTA WhatsApp | Bounce + shake suave | `whileHover` |

---

## 8. Implementación del Formulario de Cotización

```typescript
// src/app/actions/contact-pintura.ts
'use server'

import { z } from 'zod'
import { revalidateTag } from 'next/cache'

const CotizacionPinturaSchema = z.object({
  nombre: z.string().min(2, 'Nombre muy corto'),
  telefono: z.string().min(7, 'Teléfono inválido'),
  ciudad: z.string().min(2, 'Ciudad requerida'),
  tipoSuperficie: z.enum([
    'losa-concreto',
    'teja-metalica',
    'eternit',
    'teja-barro',
    'pvc',
    'otro',
  ]),
  areaMts2: z.coerce.number().min(1).optional(),
  mensaje: z.string().optional(),
})

export type CotizacionPinturaState = {
  success?: boolean
  error?: string
  fieldErrors?: Record<string, string[]>
}

export async function enviarCotizacionPintura(
  prevState: CotizacionPinturaState,
  formData: FormData
): Promise<CotizacionPinturaState> {
  const validated = CotizacionPinturaSchema.safeParse(
    Object.fromEntries(formData)
  )

  if (!validated.success) {
    return {
      error: 'Por favor revisa los campos marcados',
      fieldErrors: validated.error.flatten().fieldErrors,
    }
  }

  // TODO: Integrar con Resend / Nodemailer
  // await sendEmail({ to: 'carlosgallego32@hotmail.es', ... })

  return { success: true }
}
```

---

## 9. Plan de Implementación (Sprints)

### Sprint 1 — Estructura base (2–3 días)

- [ ] Crear directorio `src/app/pintura-termica/` con `page.tsx` y `loading.tsx`
- [ ] Crear directorio `src/components/pintura-termica/`
- [ ] Agregar ruta al `siteConfig.navigation` y productos
- [ ] Agregar tokens de color `--heat-*` en `globals.css`
- [ ] Crear `HeroPinturaTermica.tsx` con imagen generada + texto + badge NUEVO
- [ ] Agregar metadata SEO completa en la página

### Sprint 2 — Secciones informativas (2–3 días)

- [ ] Implementar `ComoFuncionaPintura.tsx` con animación de microesferas (Framer Motion)
- [ ] Implementar `BeneficiosPintura.tsx` con 4 tarjetas y animación count-up
- [ ] Implementar `AplicacionesPintura.tsx` con grid de superficies
- [ ] Implementar `EspecificacionesPintura.tsx` con tabla técnica

### Sprint 3 — Conversión (1–2 días)

- [ ] Implementar `ComparativaTermica.tsx` (slider antes/después)
- [ ] Implementar `CtaPinturaTermica.tsx` con Server Action y validación Zod
- [ ] Añadir botón flotante WhatsApp con mensaje específico del producto
- [ ] Agregar JSON-LD de producto en `page.tsx`

### Sprint 4 — Pulido (1 día)

- [ ] Generar imagen OG (`/og/pintura-termica-og.jpg`) con especificaciones de sección 6.1
- [ ] Agregar `TestimoniosPintura.tsx` con datos reales
- [ ] Auditoría Lighthouse (objetivo: ≥ 95 todos los scores)
- [ ] Test visual en mobile, tablet y desktop

---

## 10. Checklist Pre-Launch

- [ ] Hero image optimizada: WebP < 300 KB, con `priority` flag
- [ ] Metadata completa: title, description, OG, canonical
- [ ] JSON-LD válido (verificar con Google Rich Results Test)
- [ ] CTA WhatsApp funciona con mensaje predefinido
- [ ] Formulario envía email y muestra estado de éxito/error
- [ ] `loading.tsx` skeleton visible en conexiones lentas
- [ ] `prefers-reduced-motion` respetado en todas las animaciones
- [ ] Score Lighthouse: Performance ≥ 95, SEO ≥ 100, Accessibility ≥ 95
- [ ] Texto hero legible en mobile (overlay correcto)
- [ ] Badge "NUEVO" visible en navbar en todas las resoluciones

---

*Feature spec aprobada como parte del roadmap Sprint 1–4 de Eólicos Gallego.*  
*Referencia: `docs/spec-architecture.md` — Sección 6.3 y Sección 13.*
