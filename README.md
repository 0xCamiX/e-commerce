# 🌀 Eólicos Gallego - Landing Page

> **Sistema de ventilación ecológica para industrias y edificaciones en Colombia**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Bun](https://img.shields.io/badge/Bun-1.0+-black?style=flat-square&logo=bun)](https://bun.sh/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com/)

## 🏢 Acerca de Eólicos Gallego

**Eólicos Gallego** es una empresa especializada en la fabricación y comercialización de extractores eólicos tipo turbina 100% ecológicos en Cali, Colombia. Ofrecemos soluciones de ventilación natural para espacios industriales, comerciales y residenciales.

### 🌟 Nuestro Producto

- **Extractores tipo turbina** fabricados localmente en Cali
- **100% ecológicos** - Sin consumo de energía eléctrica  
- **5 años de garantía** y materiales resistentes
- **Instalación profesional** y asesoría personalizada
- **Mejora del confort térmico** en recintos cerrados

---

## 🚀 Características del Proyecto

### 📱 Landing Page Moderna
- Diseño **mobile-first** completamente responsive
- Paleta de colores **sky** (azul) y **slate** (gris) profesional
- Animaciones y transiciones suaves
- **SEO optimizada** con metadata completa

### 🎨 Componentes Implementados

#### 🧭 **Navbar**
- Navegación responsive con menú hamburguesa
- Logo con texto "Eólicos Gallego"
- Enlaces de navegación con scroll suave a secciones

#### 🎯 **Hero Section**
- Título impactante con "Colombia" resaltado en azul
- Lista de beneficios con iconos de check
- Botones CTA: WhatsApp y MercadoLibre
- **PhotoCarousel**: Carrusel automático con 6 imágenes superpuestas

#### 💰 **Prices Section**
- **3 planes de precios**: Hogar, Bodegas (Recomendado), Empresarial
- Cards con gradientes superiores y malla de iconos SVG
- Badge "Recomendado" en la opción de Bodegas
- Efectos hover y animaciones de escalado
- Tipografía consistente y profesional

#### 🎥 **Tutorial Section**
- Video de YouTube embebido responsive (16:9)
- Iframe optimizado con ID `tutorial`

#### 🏢 **Testimonials Section**
- 5 marcas mostradas en fila horizontal
- Imágenes en escala de grises con efectos hover
- Layout simple y efectivo

#### 📞 **Contact Section**
- Información de contacto con bandera colombiana 🇨🇴
- Botón de teléfono clickeable
- 4 iconos de redes sociales con colores originales
- Efectos hover personalizados

#### 🔗 **Footer**
- Diseño moderno de 4 columnas responsive
- Logo invertido para fondo oscuro
- Navegación rápida e información completa
- Copyright automático

---

## 🛠️ Stack Tecnológico

### Core Technologies
```json
{
  "runtime": "Bun 1.0+",
  "framework": "Next.js 15",
  "language": "TypeScript",
  "styling": "Tailwind CSS",
  "components": "shadcn/ui + Radix UI",
  "testing": "Vitest",
  "linting": "ESLint + Prettier"
}
```

### 📦 Dependencias Principales

```json
{
  "next": "^15.0.0",
  "react": "^18.0.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^3.4.0",
  "@radix-ui/react-*": "^1.0.0",
  "lucide-react": "^0.400.0"
}
```

### ⚡ Ventajas de Bun

- **🚀 Velocidad**: Instalación de dependencias hasta 25x más rápida que npm
- **🔧 All-in-one**: Runtime, bundler, test runner y package manager integrados
- **📦 Compatibilidad**: Compatible con Node.js y ecosistema npm
- **🎯 TypeScript nativo**: Soporte TypeScript sin configuración adicional
- **⚡ Hot reloading**: Desarrollo más rápido con recarga instantánea

---

## 📁 Estructura del Proyecto

```
store-v2/
├── 📁 src/
│   ├── 📁 app/                     # App Router de Next.js
│   │   ├── favicon.ico
│   │   ├── layout.tsx              # Layout principal
│   │   ├── page.tsx               # Página de inicio
│   │   └── 📁 styles/
│   │       └── globals.css        # Estilos globales
│   ├── 📁 components/             # Componentes reutilizables
│   │   ├── Contact.tsx           # Sección de contacto
│   │   ├── Footer.tsx            # Pie de página
│   │   ├── Hero.tsx              # Sección hero principal
│   │   ├── MaxWidthWrapper.tsx   # Contenedor responsive
│   │   ├── Navbar.tsx            # Barra de navegación
│   │   ├── PhotoCarousel.tsx     # Carrusel de fotos
│   │   ├── Prices.tsx            # Sección de precios
│   │   ├── Testimonials.tsx      # Testimonios/marcas
│   │   ├── Tutorial.tsx          # Video tutorial
│   │   └── 📁 ui/                # Componentes base UI
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       └── icons.tsx         # Iconos personalizados
│   ├── 📁 config/                # Configuraciones
│   │   └── site.ts              # Configuración del sitio
│   ├── 📁 lib/                   # Utilidades
│   │   └── utils.ts             # Funciones helper
│   └── 📁 tests/                 # Testing setup
│       ├── react-test-utils.tsx
│       └── setup-test-environments.ts
├── 📁 public/                    # Assets estáticos
│   ├── 📁 brands/               # Logos de marcas (1-6.jpeg)
│   ├── 📁 hero-pictures/        # Imágenes del carrusel (1-6.jpeg)
│   └── logo.png                 # Logo principal
├── 📄 next.config.ts            # Configuración de Next.js
├── 📄 tailwind.config.ts        # Configuración de Tailwind
├── 📄 components.json           # Configuración de shadcn/ui
├── 📄 package.json              # Dependencias del proyecto
└── 📄 bun.lock                  # Lock file de Bun
```

---

## 🎨 Guía de Diseño

### 🎨 Paleta de Colores
```css
/* Colores principales */
--sky-500: #0ea5e9;     /* Azul principal */
--sky-600: #0284c7;     /* Azul hover */
--slate-900: #0f172a;   /* Texto principal */
--slate-600: #475569;   /* Texto secundario */
--green-500: #22c55e;   /* Verde favorito */
--amber-500: #f59e0b;   /* Dorado empresarial */
```

### 📐 Tipografía Estándar
```css
/* Títulos H2 */
.section-title {
  @apply text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900;
}

/* Espaciado de secciones */
.section-spacing {
  @apply py-16 md:py-20;
}

/* Texto descriptivo */
.description-text {
  @apply font-medium text-slate-600;
}
```

### 🔄 Fondos Alternados
- **Hero**: `bg-white`
- **Prices**: `bg-slate-50` 
- **Tutorial**: `bg-white`
- **Testimonials**: `bg-white`
- **Contact**: `bg-white`
- **Footer**: `bg-slate-900`

---

## 📞 Información de Contacto

### 🏢 Datos de la Empresa
```typescript
export const siteConfig = {
  name: "Eólicos Gallego",
  description: "Extractores eólicos 100% ecológicos en Cali, Colombia",
  phone: "+57 317 752 5559",
  email: "carlosgallego32@hotmail.es",
  location: "Cali, Colombia",
  whatsapp: "https://wa.me/573177525559",
  mercadolibre: "https://articulo.mercadolibre.com.co/MCO-1447243257-extractor-eolico-31-pulgadas-en-aluminio-_JM"
}
```

---

## 🚀 Desarrollo y Deployment

### 🛠️ Comandos de Desarrollo

```bash
# Instalar dependencias
bun install

# Desarrollo local
bun dev

# Build para producción
bun run build

# Ejecutar tests
bun test

# Linting
bun run lint

# Format código (si está configurado)
bun run format
```

### 🌐 Deployment en Vercel

1. **Conectar repositorio**:
   ```bash
   vercel --prod
   ```

2. **Variables de entorno** (si aplica):
   ```env
   NEXT_PUBLIC_SITE_URL=https://eolicosgallego.com
   ```

3. **Configuración automática**:
   - Build Command: `bun run build`
   - Output Directory: `.next`
   - Install Command: `bun install`

---

## 🧪 Testing

### 🔧 Setup de Testing
- **Framework**: Vitest
- **Testing Library**: React Testing Library
- **Cobertura**: Componentes críticos

```bash
# Ejecutar tests
bun test

# Tests en modo watch
bun test --watch

# Cobertura (si está configurado)
bun test --coverage
```

---

## 📈 Performance y SEO

### ⚡ Optimizaciones Implementadas
- **Next.js Image**: Optimización automática de imágenes
- **Code Splitting**: Carga lazy de componentes
- **CSS-in-JS**: Tailwind con purge automático
- **Fonts**: Optimización de Google Fonts

### 🔍 SEO Features
- **Metadata**: Títulos y descripciones optimizadas
- **Open Graph**: Cards para redes sociales
- **Schema.org**: Structured data para negocios
- **Sitemap**: Generación automática

---

## 🤝 Contribución y Desarrollo

### 📋 Estándares de Código
- **ESLint**: Configuración estricta con TypeScript
- **Prettier**: Formateo automático
- **Husky**: Git hooks para calidad
- **Conventional Commits**: Formato de commits

### 🔄 Flujo de Trabajo
1. Fork del repositorio
2. Crear branch: `feature/nueva-funcionalidad`
3. Commits con formato convencional
4. Tests pasando: `bun test`
5. Linting limpio: `bun run lint`
6. Pull Request con descripción detallada

---

## 📊 Roadmap y Próximas Funcionalidades

### 🎯 Fase 1 - Completada ✅
- [x] Landing page responsive
- [x] Secciones principales implementadas
- [x] Integración de contacto
- [x] SEO básico

### 🎯 Fase 2 - En Planificación
- [ ] Sistema de cotizaciones online
- [ ] Panel de administración
- [ ] Blog de contenidos
- [ ] Carrito de compras básico

### 🎯 Fase 3 - Futuro
- [ ] E-commerce completo
- [ ] Sistema de inventario
- [ ] Integración con pasarelas de pago
- [ ] App móvil

---

## 📄 Licencia

Este proyecto está desarrollado para **Eólicos Gallego** y es propiedad de la empresa.

---

## 👨‍💻 Desarrollado por

**0xCamix** - Desarrollo Full Stack con ❤️ para Eólicos Gallego

### 📞 Contacto del Desarrollador
- **GitHub**: [@0xcamix](https://github.com/0xcamix)
- **Email**: [contacto disponible via GitHub]

---

---

*"Mejorando el confort en Colombia con tecnología ecológica"* 🇨🇴