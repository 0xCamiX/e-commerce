import Image from 'next/image';

const shots = [
  {
    src: '/products/extractor-hero-roof.png',
    alt: 'Extractor eólico Eólicos Gallego instalado en cubierta industrial en Cali',
    className: 'md:col-span-2 md:row-span-2',
  },
  {
    src: '/products/extractor-31-studio.png',
    alt: 'Extractor eólico 31 pulgadas de aluminio Eólicos Gallego',
  },
  {
    src: '/products/extractor-warehouse-row.png',
    alt: 'Fila de extractores eólicos en bodega industrial',
  },
  {
    src: '/products/extractor-home-roof.png',
    alt: 'Extractor eólico residencial en techo de Cali',
  },
  {
    src: '/products/extractor-galpon.png',
    alt: 'Extractores eólicos en galpón agroindustrial',
  },
  {
    src: '/products/pintura-termica-techo.png',
    alt: 'Pintura térmica Eólicos Gallego aplicada en techo metálico',
  },
  {
    src: '/products/extractor-closeup-vanes.png',
    alt: 'Detalle de álabes de aluminio del extractor eólico',
  },
];

export function ProductGallery() {
  return (
    <section
      id="galeria"
      className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mb-10 max-w-2xl">
        <p className="text-sm font-medium text-primary">
          El producto, de cerca
        </p>
        <h2 className="mt-2">
          Así se ve un extractor eólico Gallego instalado
        </h2>
        <p className="mt-3 text-muted-foreground">
          Turbina de aluminio, cubiertas reales y pintura térmica. Queremos que
          veas el producto antes de cotizar o comprar.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2">
        {shots.map(shot => (
          <figure
            key={shot.src}
            className={`relative min-h-44 overflow-hidden rounded-2xl bg-secondary md:min-h-52 ${shot.className ?? ''}`}
          >
            <Image
              src={shot.src}
              alt={shot.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </figure>
        ))}
      </div>
    </section>
  );
}
