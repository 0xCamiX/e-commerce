import Link from 'next/link';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Icons } from '@/components/ui/icons';
import { Separator } from '@/components/ui/separator';
import { siteConfig } from '@/config/site';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white py-10 text-foreground">
      <MaxWidthWrapper>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-3 flex items-center gap-3">
              <span className="text-base font-bold">{siteConfig.name}</span>
            </div>
            <p className="mb-4 max-w-md text-xs text-muted-foreground">
              Empresa líder en la fabricación de extractores eólicos y
              comercialización de extractores tipo hongo en Cali, Colombia.
              Mejoramos la ventilación de forma 100% ecológica con garantía de 5
              años y ayudamos a las industrias a mejorar su confort térmico en
              sus recintos cerrados.
            </p>
            <div className="flex space-x-3">
              <Link
                href="https://wa.me/3177525559"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Icons.whatsapp className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.instagram.com/eolicosgallego_/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Icons.instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.tiktok.com/@eolicosgallego"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Icons.tiktok className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.facebook.com/juancarlosgallego32"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Icons.facebook className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-bold">Navegación</h3>
            <ul className="space-y-1.5">
              {siteConfig.navigation.main.map(item => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-bold">Contacto</h3>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-muted-foreground">Teléfono:</p>
                <Link
                  href={`tel:${siteConfig.contact.phone}`}
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  {siteConfig.contact.phone}
                </Link>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email:</p>
                <Link
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  {siteConfig.contact.email}
                </Link>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Ubicación:</p>
                <p className="text-xs text-muted-foreground">
                  {siteConfig.contact.address}
                </p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col items-center justify-between text-xs text-muted-foreground md:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Todos los derechos
            reservados.
          </p>
          <div className="mt-3 flex space-x-6 md:mt-0">
            <p>Fabricado en Cali, Colombia 🇨🇴</p>
            <p>Garantía de 5 años</p>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}
