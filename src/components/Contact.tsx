import Link from 'next/link';
import { Icons } from '@/components/ui/icons';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

export default function Contact() {
  return (
    <section id="contact" className="bg-white py-16 md:py-20">
      <MaxWidthWrapper>
        <div className="mb-12 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="order-1 mt-2 text-center text-3xl !leading-tight font-bold tracking-tight text-balance text-slate-900 md:text-4xl lg:text-5xl">
              Cotizamos a nivel nacional 🇨🇴{''}
              <span className="relative px-2 text-slate-900">
                contacta con nosotros
              </span>
            </h2>
          </div>
        </div>

        <div className="flex flex-col items-center gap-8 sm:gap-16">
          <div className="flex flex-col items-center gap-4 sm:gap-6">
            <p className="max-w-prose text-center text-lg font-medium text-balance text-slate-600">
              Contáctanos para recibir una cotización personalizada. Nuestro
              equipo de expertos te asesorará en la mejor solución para tu
              proyecto.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 sm:gap-6">
            <div className="flex flex-col items-center gap-2">
              <p className="text-center font-semibold text-balance text-slate-800">
                Llama a nuestro equipo de ventas
              </p>
              <a
                href="tel:+573177525559"
                className="text-center font-semibold text-blue-600"
              >
                +57 317 752 5559
              </a>
              <div className="flex items-center gap-4 sm:gap-6">
                <Link
                  href={
                    'https://wa.me/3177525559?text=Estuve%20viendo%20tu%20página%20web%20y%20me%20interesan%20los%20extractores%20eólicos.'
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icons.whatsapp className="h-16 w-16" />
                </Link>
                <Link href="https://www.instagram.com/eolicosgallego_/profilecard/?igsh=MTFzYWxyeDc3ZnJqeQ==">
                  <Icons.instagram className="h-16 w-16" />
                </Link>
                <Link href="https://www.tiktok.com/@eolicosgallego?_t=ZS-8sRHsIiYjiy&_r=1">
                  <Icons.tiktok className="h-16 w-16" />
                </Link>
                <Link href={'https://www.facebook.com/juancarlosgallego32'}>
                  <Icons.facebook className="h-14 w-14" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
