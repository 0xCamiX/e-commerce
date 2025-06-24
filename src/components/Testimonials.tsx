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
    <section id="testimonials" className="bg-white py-16 md:py-20">
      <MaxWidthWrapper>
        <div className="space-y-12 text-center">
          {/* Título de la sección */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
              Marcas que confían en nosotros
            </h2>
            <p className="mx-auto max-w-2xl text-lg font-medium text-slate-600">
              Empresas líderes en diferentes sectores han elegido nuestros
              extractores eólicos para mejorar la ventilación de sus
              instalaciones.
            </p>
          </div>

          {/* Marcas en fila */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
            {brands.map(brand => (
              <div key={brand.id} className="flex items-center justify-center">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={120}
                  height={60}
                  className="h-12 w-auto object-contain opacity-70 grayscale filter md:h-16"
                />
              </div>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
