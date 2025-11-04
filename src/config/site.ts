export const siteConfig = {
  name: 'Eólicos Gallego',
  description:
    'Sistemas de ventilación ecológica para industrias y edificaciones en Cali, Colombia',
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
        title: 'Tutorial',
        href: '#tutorial',
        description: 'Guía de instalación y uso',
        isPrimary: false,
      },
      {
        title: 'Testimonios',
        href: '#testimonials',
        description: 'Experiencias de nuestros clientes',
        isPrimary: false,
      },
      {
        title: 'Contacto',
        href: '#contact',
        description: 'Contáctanos para cotización',
        isPrimary: false,
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
