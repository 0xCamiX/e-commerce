import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import PhotoCarousel from '@/components/PhotoCarousel';
import { Button } from '@/components/ui/button';

const benefits = [
  'Alta-calidad y durabilidad',
  '5 años de garantía',
  '100% ecológico',
];

export default function Hero() {
  return (
    <section id="hero" className="w-full bg-background py-12 md:py-16">
      <MaxWidthWrapper>
        <div className="flex flex-col-reverse items-center md:flex-row md:justify-between md:gap-8">
          <div className="flex w-full flex-col items-start md:w-1/2">
            <h1 className="mb-4 text-2xl leading-tight font-bold text-foreground sm:text-3xl md:text-4xl">
              Extractor Eólico en{' '}
              <span className="inline-block rounded-md bg-primary px-2 py-0.5 font-medium text-primary-foreground">
                Colombia
              </span>
              <br className="hidden sm:block" />
              mejora el confort
            </h1>
            <p className="mb-4 max-w-md text-sm font-medium text-muted-foreground sm:text-base">
              Somos una empresa líder en la fabricación de extractores eólicos
              en Cali - Colombia, que ayudan a mejorar la sensación térmica en{' '}
              <b className="text-foreground">recintos cerrados</b>. Nuestros
              productos innovadores y eficientes están diseñados para
              proporcionar un ambiente más cómodo y saludable.
            </p>
            <ul className="mb-6 space-y-1">
              {benefits.map(b => (
                <li
                  key={b}
                  className="flex items-center text-sm font-medium text-foreground"
                >
                  <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button asChild size="lg">
                <Link href="https://wa.me/573177525559" target="_blank">
                  Compra directa
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link
                  href="https://articulo.mercadolibre.com.co/MCO-1447243257-extractor-eolico-31-pulgadas-en-aluminio-_JM#polycard_client=search-nordic&position=10&search_layout=stack&type=item&tracking_id=d5b11873-76f7-4b67-a192-01e80fce6391"
                  target="_blank"
                >
                  Comprar en MercadoLibre
                </Link>
              </Button>
            </div>
          </div>
          <div className="mb-6 flex w-full justify-center md:mb-0 md:w-1/2">
            <PhotoCarousel />
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
