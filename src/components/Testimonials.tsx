import Image from 'next/image';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

const brands = [
  { id: 1, name: 'Marca 1', image: '/brands/1.jpeg' },
  { id: 3, name: 'Marca 3', image: '/brands/3.jpeg' },
  { id: 4, name: 'Marca 4', image: '/brands/4.jpeg' },
  { id: 5, name: 'Marca 5', image: '/brands/5.jpeg' },
  { id: 6, name: 'Marca 6', image: '/brands/6.jpeg' },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-muted/50 py-12 md:py-16">
      <MaxWidthWrapper>
        <div className="space-y-10 text-center">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">
              Marcas que confían en nosotros
            </h2>
            <p className="mx-auto max-w-xl text-sm text-muted-foreground">
              Empresas líderes en diferentes sectores han elegido nuestros
              extractores eólicos para mejorar la ventilación de sus
              instalaciones.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
            {brands.map(brand => (
              <div key={brand.id} className="flex items-center justify-center">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={120}
                  height={60}
                  className="h-10 w-auto object-contain opacity-70 grayscale filter transition-all hover:opacity-100 hover:grayscale-0 md:h-14"
                />
              </div>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
