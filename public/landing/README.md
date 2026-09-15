# Landing assets — Eólicos Gallego

Drop production stills here. The `/landing` preview reads these filenames.
Until then, the SVG placeholders keep layout and overlay captions working.

## Hero product (chrome / aluminum spherical-blade extractor)

| File | Use | Source |
| --- | --- | --- |
| `extractor-hero.svg` | Fallback 2D object (also inlined as `ExtractorVisual`) | Keep as fallback |
| `extractor-hero.png` or `.webp` | **Juan:** Higgsfield 3D turntable still, studio lighting, no collage. 1600×1600, transparent or paper `#F3EFE6` background | Replace when ready |

The scroll section currently uses the inline SVG (`ExtractorVisual`) so GSAP can rotate vanes. To swap in a 3D still:

1. Export `extractor-hero.webp` into this folder.
2. Point `landingAssets.hero` in `src/components/landing/copy.ts`.
3. Optionally replace `<ExtractorVisual />` with `next/image` in `LandingHeroScroll.tsx`.

## Installation shots

Photo with **dark blur / gradient overlay at the bottom** for caption text. Prefer 4:5, ≥ 1200px on the short side, exported from Google Photos (original, not compressed chat dumps).

| File | Shot | Notes |
| --- | --- | --- |
| `hogar-teja.svg` → `.jpg` | Teja, hogar | Extractor on residential clay/concrete tile roof |
| `bodega-fibrocemento.svg` → `.jpg` | Fibrocemento, bodega | Medium shot of the roof plane, not a collage |
| `losa-plana.svg` → `.jpg` | Losa plana / terraza | Object against sky, flashing visible |
| `cubierta-metalica.svg` → `.jpg` | Cubierta metálica | Row on ridge if it exists; otherwise a single unit |
| `before-after.svg` → `.jpg` | Antes / después | Only with a real thermography or authorized pair. Do **not** invent numbers |
| `detalle-instalado.svg` → `.jpg` | Close-up instalado | Higgsfield 3D or studio photo of the spherical blades |

Keep the same basename so `copy.ts` paths stay stable, or update `landingAssets` / `landingGallery`.

## What not to drop here

- Checkout, inventory, or MercadoLibre screenshots
- Fake customer quotes presented as real
- Collages, watermarks, or screenshots of other vendors’ catalogs

## Overlay recipe (already in the gallery component)

```
absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent
caption sits in the bottom padding
```

Do not bake the caption into the photo. Leave sky / roof at the bottom third a bit darker so white type holds.

## Higgsfield 3D brief (for Juan)

- Object: spherical-blade turbine ventilator, aluminum / chrome
- Camera: 3/4, slight top-down, product as a premium object
- Lighting: soft studio, one highlight on the vanes
- Background: paper off-white `#F3EFE6` or transparent
- No logos, no people, no warehouse collage
