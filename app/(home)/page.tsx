import Link from 'next/link';
import Image from 'next/image';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import WindTurbine from '@/components/WindTurbine';
import { Reviews } from '@/components/Reviews';
import { Icons } from '@/components/Icons';
import { Check, Star } from 'lucide-react';

export default function Home() {
  return (
    <div className='bg-slate-50'>
      {/* Hero */}
      <section>
        <MaxWidthWrapper className='pb-12 pt-6 lg:grid lg:grid-cols-3 sm:pb-16 lg:gap-x-0 xl:gap-x-4 lg:pt-8 xl:pt-12 lg:pb-26'>
          <div className='col-span-2 px-6 lg:px-0'>
            <div className='relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start'>
              {/* Hero Title */}
              <h1 className='relative w-fit tracking-tight text-balance mt-8 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl'>
                Extractor Eólico en{' '}
                <span className='bg-blue-600 px-2 text-white rounded-lg'>
                  Colombia
                </span>{' '}
                mejora el confort
              </h1>
              <p className='mt-4 text-lg lg:pr-5 max-w-prose text-center lg:text-left text-balance md:text-wrap'>
                Somos una empresa líder en la fabricación de extractores eólicos
                que ayudan a mejorar la sensación térmica en
                <span className='font-semibold'> recintos cerrados</span>.
                Nuestros productos innovadores y eficientes están diseñados para
                proporcionar un ambiente más cómodo y saludable.
              </p>

              <ul className='mt-4 space-y-2 text-left font-medium flex flex-col items-center sm:items-start'>
                <div className='space-y-2'>
                  <li className='flex gap-1.5 items-center text-left'>
                    <Check className='h-5 w-5 shrink-0 text-blue-600' />
                    Alta-calidad y durabilidad
                  </li>
                  <li className='flex gap-1.5 items-center text-left'>
                    <Check className='h-5 w-5 shrink-0 text-blue-600' />5 años
                    de garantía
                  </li>
                  <li className='flex gap-1.5 items-center text-left'>
                    <Check className='h-5 w-5 shrink-0 text-blue-600' />
                    100% ecológico
                  </li>
                </div>
              </ul>

              <div className='mt-4 flex flex-col items-center lg:items-start'>
                <a
                  href='https://articulo.mercadolibre.com.co/MCO-1447243257-extractor-eolico-31-pulgadas-en-aluminio-_JM#polycard_client=search-nordic&position=10&search_layout=stack&type=item&tracking_id=d5b11873-76f7-4b67-a192-01e80fce6391'
                  className='bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg'
                >
                  Comprar
                </a>
              </div>
            </div>
          </div>

          <div className='col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-16 lg:mx-0 lg:mt-10 h-fit'>
            <div className='relative md:max-w-xl'>
              <WindTurbine
                className='w-full'
                imgSrc='/products/wind-turbine-scaled.png'
              />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
      {/* Value Proposition Section */}
      <section className='bg-slate-100 py-12'>
        <h2 className='order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900 '>
          <span className='relative px-2'>
            Nuestros proyectos
            <Icons.underline className='hidden sm:block pointer-events-none absolute inset-x-0 -bottom-12 text-blue-400' />
          </span>
        </h2>
        <Reviews />
        <MaxWidthWrapper className='flex flex-col items-center gap-16 sm:gap-32'>
          <div className='flex flex-col lg:flex-row items-center gap-4 sm:gap-6'>
            <h2 className='order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900 '>
              ¿Qué dicen{' '}
              <span className='relative px-2'>
                nuestros clientes{' '}
                <Icons.underline className='hidden sm:block pointer-events-none absolute inset-x-0 -bottom-12 text-blue-400' />
              </span>
            </h2>
          </div>
          <div className='mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 gap-y-16'>
            {/* Client No. 1: Sr Wok */}
            <div className='flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20'>
              <div className='flex gap-0.5 mb-2'>
                <Star className='h-5 w-5 text-yellow-400 fill-yellow-400' />
                <Star className='h-5 w-5 text-yellow-400 fill-yellow-400' />
                <Star className='h-5 w-5 text-yellow-400 fill-yellow-400' />
                <Star className='h-5 w-5 text-yellow-400 fill-yellow-400' />
                <Star className='h-5 w-5 text-yellow-400 fill-yellow-400' />
              </div>
              <div className='text-lg leading-8'>
                <p>
                  &quot;Los extractores eólicos han mejorado significativamente
                  la sensación térmica en nuestro edificio. Ahora podemos
                  disfrutar de un ambiente más fresco y cómodo. ¡Recomendado al
                  100%!&quot;
                </p>
              </div>
              <div className='flex flex-col md:flex-row gap-4 mt-2'>
                <Image
                  src={'/clients/srwok.jpg'}
                  alt='Sr Wok'
                  width={248}
                  height={22}
                  className='rounded-full h-22 w-64 object-cover'
                />
                <div className='flex flex-col'>
                  <p className='font-semibold'>Sr. Wok</p>
                  <div className='flex gap-1.5 items-center text-zinc-600'>
                    <Check className='h-4 w-4 stroke-[3px] text-blue-600'></Check>
                    <p className='text-sm'>10 Extractores instalados!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Client No. 2: Industrias Carber */}
            <div className='flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20'>
              <div className='flex gap-0.5 mb-2'>
                <Star className='h-5 w-5 text-yellow-400 fill-yellow-400' />
                <Star className='h-5 w-5 text-yellow-400 fill-yellow-400' />
                <Star className='h-5 w-5 text-yellow-400 fill-yellow-400' />
                <Star className='h-5 w-5 text-yellow-400 fill-yellow-400' />
                <Star className='h-5 w-5 text-yellow-400 fill-yellow-400' />
              </div>
              <div className='text-lg leading-8'>
                <p>
                  &quot;Desde que instalamos los extractores eólicos, hemos
                  notado una gran diferencia en la calidad del aire de nuestra
                  fábrica. La reducción de calor ha mejorado las condiciones de
                  trabajo, lo que se refleja en un aumento de la productividad.
                  Sin duda, una inversión que vale la pena.&quot;
                </p>
              </div>
              <div className='flex gap-4 mt-2'>
                <Image
                  src={'/clients/ind-carber.png'}
                  alt='Industrias Carber'
                  width={128}
                  height={128}
                  className='rounded-full h-16 w-16 object-cover'
                />
                <div className='flex flex-col'>
                  <p className='font-semibold'>Industrias Cárbel</p>
                  <div className='flex gap-1.5 items-center text-zinc-600'>
                    <Check className='h-4 w-4 stroke-[3px] text-blue-600'></Check>
                    <p className='text-sm'>24 Extractores instalados!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Client No. 3: Carpas Mundial */}
            <div className='flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20'>
              <div className='flex gap-0.5 mb-2'>
                <Star className='h-5 w-5 text-yellow-400 fill-yellow-400' />
                <Star className='h-5 w-5 text-yellow-400 fill-yellow-400' />
                <Star className='h-5 w-5 text-yellow-400 fill-yellow-400' />
                <Star className='h-5 w-5 text-yellow-400 fill-yellow-400' />
                <Star className='h-5 w-5 text-yellow-400 fill-yellow-400' />
              </div>
              <div className='text-lg leading-8'>
                <p>
                  &quot;El servicio y la calidad de los extractores eólicos de
                  GreenFlow Cali superaron nuestras expectativas. Nuestro
                  almacén ya no sufre de sobrecalentamiento, y hemos mejorado la
                  conservación de nuestros productos. Excelente solución para el
                  clima cálido de Cali.&quot;
                </p>
              </div>
              <div className='flex flex-col md:flex-row gap-4 mt-2'>
                <Image
                  src={'/clients/carpas-mundial.png'}
                  alt='Carpas Mundial'
                  width={258}
                  height={64}
                  className='rounded-full h-[64px] w-[258px] object-cover'
                />
                <div className='flex flex-col'>
                  <p className='font-semibold'>Carpas Mundial</p>
                  <div className='flex gap-1.5 items-center text-zinc-600'>
                    <Check className='h-4 w-4 stroke-[3px] text-blue-600'></Check>
                    <p className='text-sm'>34 Extractores instalados!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Client No. 4: Papeles del Cuaca  */}
            <div className='flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20'>
              <div className='flex gap-0.5 mb-2'>
                <Star className='h-5 w-5 text-yellow-400 fill-yellow-400' />
                <Star className='h-5 w-5 text-yellow-400 fill-yellow-400' />
                <Star className='h-5 w-5 text-yellow-400 fill-yellow-400' />
                <Star className='h-5 w-5 text-yellow-400 fill-yellow-400' />
                <Star className='h-5 w-5 text-yellow-400 fill-yellow-400' />
              </div>
              <div className='text-lg leading-8'>
                <p>
                  &quot;La instalación de extractores eólicos fue rápida y sin
                  complicaciones. Notamos de inmediato una disminución en el uso
                  de aire acondicionado, lo que nos ha permitido ahorrar en
                  costos de energía. ¡Totalmente satisfechos con los
                  resultados!&quot;
                </p>
              </div>
              <div className='flex gap-4 mt-2'>
                <Image
                  src={'/clients/papeles-cauca.png'}
                  alt='Papeles del Valle'
                  width={128}
                  height={128}
                  className='rounded-full h-[64px] w-[70px] object-cover'
                />
                <div className='flex flex-col'>
                  <p className='font-semibold'>Papeles del Valle</p>
                  <div className='flex gap-1.5 items-center text-zinc-600'>
                    <Check className='h-4 w-4 stroke-[3px] text-blue-600'></Check>
                    <p className='text-sm'>36 Extractores instalados!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Contact Section */}
      <section>
        <MaxWidthWrapper className='py-24'>
          <div className='mb-12 px-6 lg:px-8'>
            <div className='mx-auto max-w-2xl sm:text-center'>
              <h2 className='order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900'>
                Cotizamos a nivel nacional 🇨🇴{''}
                <span className='relative px-2 text-gray-900'>
                  contacta con nosotros
                </span>
              </h2>
            </div>
          </div>

          <div className='flex flex-col items-center gap-8 sm:gap-16'>
            <div className='flex flex-col items-center gap-4 sm:gap-6'>
              <p className='text-center text-balance max-w-prose'>
                Contáctanos para recibir una cotización personalizada y sin
                compromiso. Nuestro equipo de expertos te asesorará en la mejor
                solución para tu proyecto.
              </p>
            </div>

            <div className='flex flex-col items-center gap-4 sm:gap-6'>
              <div className='flex flex-col items-center gap-2'>
                <p className='text-center text-balance font-semibold'>
                  Llama a nuestro equipo de ventas
                </p>
                <a
                  href='tel:+573177525559'
                  className='text-center text-blue-600 font-semibold'
                >
                  +57 317 752 5559
                </a>
                <div className='flex items-center gap-4 sm:gap-6'>
                  <Link
                    href={
                      'https://wa.me/3177525559?text=Me%20interesa%20el%20extractor%20eólico'
                    }
                  >
                    <Icons.whatsapp className='w-16 h-16' />
                  </Link>
                  <Link href='/'>
                    <Icons.instagram className='w-16 h-16' />
                  </Link>
                  <Link href={'https://www.facebook.com/juancarlosgallego32'}>
                    <Icons.facebook className='w-14 h-14' />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
