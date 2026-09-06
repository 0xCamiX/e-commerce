import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { siteConfig } from '@/config/site';

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <p className="text-lg font-semibold">{siteConfig.name}</p>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            Fabricamos extractores eólicos en Cali, Colombia. Ventilación 100%
            ecológica, sin consumo eléctrico, con 5 años de garantía.
          </p>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold">Navegación</p>
          <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/tienda">Tienda</Link>
            </li>
            <li>
              <Link href="/cotizador">Cotizador</Link>
            </li>
            <li>
              <Link href="/pintura-termica">Pintura térmica</Link>
            </li>
            <li>
              <Link href="/login">Cuenta</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold">Contacto</p>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <a href={`tel:${siteConfig.contact.phone}`}>
              {siteConfig.contact.phone}
            </a>
            <a href={`mailto:${siteConfig.contact.email}`}>
              {siteConfig.contact.email}
            </a>
            <p>{siteConfig.contact.address}</p>
          </div>
        </div>
      </div>
      <Separator />
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. Todos los derechos
          reservados.
        </p>
        <p>Fabricado en Cali, Colombia</p>
      </div>
    </footer>
  );
}
