import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { siteConfig } from '@/config/site';

const socials = [
  {
    href: `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
      'Estuve viendo tu página web y me interesan los extractores eólicos Gallego.',
    )}`,
    label: 'WhatsApp Eólicos Gallego',
    icon: Icons.whatsapp,
  },
  {
    href: 'https://www.instagram.com/eolicosgallego_/profilecard/?igsh=MTFzYWxyeDc3ZnJqeQ==',
    label: 'Instagram Eólicos Gallego',
    icon: Icons.instagram,
  },
  {
    href: 'https://www.tiktok.com/@eolicosgallego?_t=ZS-8sRHsIiYjiy&_r=1',
    label: 'TikTok Eólicos Gallego',
    icon: Icons.tiktok,
  },
  {
    href: 'https://www.facebook.com/juancarlosgallego32',
    label: 'Facebook Eólicos Gallego',
    icon: Icons.facebook,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="bg-secondary/40 py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-medium text-primary">Contacto</p>
        <h2 className="mt-2">
          Cotizamos a nivel nacional. Habla con Eólicos Gallego
        </h2>
        <p className="mx-auto mt-4 max-w-prose text-muted-foreground">
          Asesoría para extractores eólicos, tipo hongo y pintura térmica.
          Instalación y envíos desde Cali a todo Colombia.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3">
          <p className="text-sm font-semibold">Llama a ventas</p>
          <Button asChild size="lg">
            <a href={`tel:${siteConfig.contact.phone}`}>
              {siteConfig.contact.phone}
            </a>
          </Button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-5">
          {socials.map(social => (
            <Link
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <social.icon className="size-10" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
