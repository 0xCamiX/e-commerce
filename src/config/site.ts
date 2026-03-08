export const siteConfig = {
  name: 'Eólicos Gallego',
  description:
    'Sistemas de ventilación ecológica y soluciones térmicas para industrias y edificaciones en Cali, Colombia',
  url: 'https://eolicosgallego.com',
  ogImage: 'og/logo.png',
  links: {
    twitter: 'https://twitter.com/eolicosgallego',
    github: 'https://github.com/eolicosgallego',
  },
  contact: {
    phone: '+57 317 752 5559',
    email: 'carlosgallego32@hotmail.es',
    address: 'Cali, Colombia',
    whatsapp: '573177525559',
  },
  navigation: {
    main: [
      {
        title: 'Eólicos',
        href: '/',
        description: 'Extractores eólicos ecológicos',
        isPrimary: true,
      },
      {
        title: 'Extractores Tipo Hongo',
        href: '/extractores-tipo-hongo',
        description: 'Extractores de ventilación industrial premium',
        isPrimary: true,
      },
      {
        title: 'Pintura Térmica',
        href: '/pintura-termica',
        description: 'Pintura reflectiva que reduce hasta 20°C',
        isPrimary: true,
        isNew: true,
      },
      {
        title: 'Cotizador',
        href: '/cotizador',
        description: 'Cotiza extractores eólicos según tu proyecto',
        isPrimary: true,
      },
    ],
  },
  features: [
    {
      title: 'Ventilación 100% Ecológica',
      description: 'Sin consumo de energía eléctrica',
      icon: '🌱',
    },
    {
      title: 'Fabricación Local',
      description: 'Hecho en Cali con materiales resistentes',
      icon: '🏭',
    },
    {
      title: 'Garantía de 5 Años',
      description: 'Alta durabilidad y confianza',
      icon: '🛡️',
    },
    {
      title: 'Instalación Sencilla',
      description: 'Rápida instalación en cubiertas',
      icon: '⚡',
    },
  ],
} as const;

export type SiteConfig = typeof siteConfig;

export function buildWhatsAppUrl(product: string) {
  const phone = siteConfig.contact.whatsapp;
  const message = encodeURIComponent(
    `Hola, estoy interesado en cotizar: ${product}. ¿Me pueden dar más información?`,
  );
  return `https://wa.me/${phone}?text=${message}`;
}
