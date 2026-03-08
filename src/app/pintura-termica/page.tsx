import type { Metadata } from 'next';
import AplicacionesPintura from '@/components/pintura-termica/AplicacionesPintura';
import BeneficiosPintura from '@/components/pintura-termica/BeneficiosPintura';
import ComoFuncionaPintura from '@/components/pintura-termica/ComoFuncionaPintura';
import CtaPinturaTermica from '@/components/pintura-termica/CtaPinturaTermica';
import EspecificacionesPintura from '@/components/pintura-termica/EspecificacionesPintura';
import HeroPinturaTermica from '@/components/pintura-termica/HeroPinturaTermica';
import TutorialPintura from '@/components/pintura-termica/TutorialPintura';

export const metadata: Metadata = {
  title: 'Pintura Térmica — Reduce hasta 20°C | Eólicos Gallego',
  description:
    'Pintura con microesferas cerámicas que refleja los rayos solares y reduce hasta 20°C la temperatura superficial del techo. Disponible en Cali y todo el Valle del Cauca, Colombia.',
  keywords: [
    'pintura térmica Colombia',
    'pintura reflectiva techo',
    'cómo bajar temperatura techo',
    'pintura aislante térmica Cali',
    'reducir calor bodega',
    'microesferas cerámicas techo',
    'Eólicos Gallego pintura',
  ],
  openGraph: {
    title: 'Pintura Térmica — Reduce hasta 20°C | Eólicos Gallego',
    description:
      'Pintura con microesferas que refleja el sol. Hasta 20°C menos en tu techo/terraza. Disponible en Cali, Colombia.',
    images: [
      {
        url: '/products/pintura-termica/hero.png',
        width: 1200,
        height: 630,
        alt: 'Pintura Térmica Eólicos Gallego — Aplicación en techo',
      },
    ],
    type: 'website',
    locale: 'es_CO',
  },
  alternates: {
    canonical: 'https://eolicosgallego.com/pintura-termica',
  },
};

export default function PinturaTermicaPage() {
  return (
    <>
      <HeroPinturaTermica />
      <ComoFuncionaPintura />
      <BeneficiosPintura />
      <TutorialPintura />
      <AplicacionesPintura />
      <EspecificacionesPintura />
      <CtaPinturaTermica />
    </>
  );
}
