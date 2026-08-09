import Link from 'next/link';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';

export default function Contact() {
  return (
    <section id="contact" className="bg-background py-12 md:py-16">
      <MaxWidthWrapper>
        <div className="mb-8 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-center text-2xl !leading-tight font-bold tracking-tight text-balance text-foreground md:text-3xl">
              Cotizamos a nivel nacional 🇨🇴{' '}
              <span className="text-primary">contacta con nosotros</span>
            </h2>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 sm:gap-10">
          <p className="max-w-prose text-center text-sm text-balance text-muted-foreground">
            Contáctanos para recibir una cotización personalizada. Nuestro
            equipo de expertos te asesorará en la mejor solución para tu
            proyecto.
          </p>

          <div className="flex flex-col items-center gap-3">
            <p className="text-center text-sm font-semibold text-balance text-foreground">
              Llama a nuestro equipo de ventas
            </p>
            <Button asChild variant="link" className="text-base">
              <a href="tel:+573177525559">+57 317 752 5559</a>
            </Button>
            <div className="flex items-center gap-4 sm:gap-6">
              <Link
                href="https://wa.me/3177525559?text=Estuve%20viendo%20tu%20página%20web%20y%20me%20interesan%20los%20extractores%20eólicos."
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Icons.whatsapp className="h-12 w-12" />
              </Link>
              <Link
                href="https://www.instagram.com/eolicosgallego_/profilecard/?igsh=MTFzYWxyeDc3ZnJqeQ=="
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Icons.instagram className="h-12 w-12" />
              </Link>
              <Link
                href="https://www.tiktok.com/@eolicosgallego?_t=ZS-8sRHsIiYjiy&_r=1"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Icons.tiktok className="h-12 w-12" />
              </Link>
              <Link
                href="https://www.facebook.com/juancarlosgallego32"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Icons.facebook className="h-10 w-10" />
              </Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
