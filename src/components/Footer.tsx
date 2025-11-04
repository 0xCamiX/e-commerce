import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Icons } from '@/components/ui/icons';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

export default function Footer() {
  return (
    <footer className="bg-slate-950 py-12 text-white">
      <MaxWidthWrapper>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo y descripción */}
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-xl font-bold">{siteConfig.name}</span>
            </div>
            <p className="mb-6 max-w-md text-blue-100">
              Empresa líder en la fabricación de extractores eólicos y
              comercialización de extractores tipo hongo en Cali, Colombia.
              Mejoramos la ventilación de forma 100% ecológica con garantía de 5
              años y ayudamos a las industrias a mejorar su confort térmico en
              sus recintos cerrados.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://wa.me/3177525559"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-200 hover:scale-110"
              >
                <Icons.whatsapp className="h-6 w-6 text-blue-200 hover:text-green-400" />
              </Link>
              <Link
                href="https://www.instagram.com/eolicosgallego_/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-200 hover:scale-110"
              >
                <Icons.instagram className="h-6 w-6 text-blue-200 hover:text-pink-400" />
              </Link>
              <Link
                href="https://www.tiktok.com/@eolicosgallego"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-200 hover:scale-110"
              >
                <Icons.tiktok className="h-6 w-6 text-blue-200 hover:text-white" />
              </Link>
              <Link
                href="https://www.facebook.com/juancarlosgallego32"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-200 hover:scale-110"
              >
                <Icons.facebook className="h-6 w-6 text-blue-200 hover:text-blue-400" />
              </Link>
            </div>
          </div>

          {/* Navegación rápida */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Navegación</h3>
            <ul className="space-y-2">
              {siteConfig.navigation.main.map(item => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-blue-200 transition-colors duration-200 hover:text-white"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Información de contacto */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Contacto</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-blue-300">Teléfono:</p>
                <Link
                  href={`tel:${siteConfig.contact.phone}`}
                  className="text-blue-200 transition-colors duration-200 hover:text-white"
                >
                  {siteConfig.contact.phone}
                </Link>
              </div>
              <div>
                <p className="text-sm text-blue-300">Email:</p>
                <Link
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-blue-200 transition-colors duration-200 hover:text-white"
                >
                  {siteConfig.contact.email}
                </Link>
              </div>
              <div>
                <p className="text-sm text-blue-300">Ubicación:</p>
                <p className="text-blue-200">{siteConfig.contact.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Línea divisoria y copyright */}
        <div className="mt-8 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between text-sm text-blue-200 md:flex-row">
            <p>
              © {new Date().getFullYear()} {siteConfig.name}. Todos los
              derechos reservados.
            </p>
            <div className="mt-4 flex space-x-6 md:mt-0">
              <p>Fabricado en Cali, Colombia 🇨🇴</p>
              <p>Garantía de 5 años</p>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}
