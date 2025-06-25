import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import PhotoCarousel from '@/components/PhotoCarousel';

const benefits = [
  'Alta-calidad y durabilidad',
  '5 años de garantía',
  '100% ecológico',
];

export default function Hero() {
  return (
    <section className="w-full bg-white py-16 md:py-20">
      <MaxWidthWrapper>
        <div className="flex flex-col-reverse items-center md:flex-row md:justify-between md:gap-8">
          {/* Texto principal */}
          <div className="flex w-full flex-col items-start md:w-1/2">
            <h1 className="mb-6 text-4xl leading-tight font-bold text-slate-900 sm:text-5xl md:text-6xl">
              Extractor Eólico en{' '}
              <span className="relative inline-block">
                <span className="rounded-md bg-sky-600 px-2 py-0.5 font-medium text-white">
                  Colombia
                </span>
              </span>
              <br className="hidden sm:block" />
              mejora el confort
            </h1>
            <p className="mb-6 max-w-md text-lg font-medium text-slate-600 sm:text-xl">
              Somos una empresa líder en la fabricación de extractores eólicos
              en Cali - Colombia, que ayudan a mejorar la sensación térmica en{' '}
              <b>recintos cerrados</b>. Nuestros productos innovadores y
              eficientes están diseñados para proporcionar un ambiente más
              cómodo y saludable.
            </p>
            <ul className="mb-6 space-y-1">
              {benefits.map(b => (
                <li
                  key={b}
                  className="flex items-center text-sm font-medium text-slate-700"
                >
                  <CheckCircle className="mr-2 h-4 w-4 text-sky-500" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                href="https://wa.me/573177525559"
                target="_blank"
                className="w-full rounded-lg bg-sky-500 px-4 py-1.5 text-center text-base font-medium text-white transition-colors hover:bg-sky-600 sm:w-auto"
              >
                Compra directa
              </Link>
              <Link
                href="https://articulo.mercadolibre.com.co/MCO-1447243257-extractor-eolico-31-pulgadas-en-aluminio-_JM#polycard_client=search-nordic&position=10&search_layout=stack&type=item&tracking_id=d5b11873-76f7-4b67-a192-01e80fce6391"
                target="_blank"
                className="w-full rounded-lg border border-amber-400 bg-amber-400 px-4 py-1.5 text-center text-base font-medium text-amber-900 transition-colors hover:bg-amber-500 sm:w-auto"
              >
                Comprar en MercadoLibre
              </Link>
            </div>
          </div>
          {/* Carrusel animado del extractor */}
          <div className="mb-6 flex w-full justify-center md:mb-0 md:w-1/2">
            <PhotoCarousel />
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
