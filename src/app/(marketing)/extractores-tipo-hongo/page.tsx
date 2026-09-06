import type { Metadata } from 'next';
import Contact from '@/components/Contact';
import AplicacionesExtractoresTipoHongo from '@/components/extractores-tipo-hongo/AplicacionesExtractoresTipoHongo';
import CaracteristicasExtractoresTipoHongo from '@/components/extractores-tipo-hongo/CaracteristicasExtractoresTipoHongo';
import EspecificacionesExtractoresTipoHongo from '@/components/extractores-tipo-hongo/EspecificacionesExtractoresTipoHongo';
import HeroExtractoresTipoHongo from '@/components/extractores-tipo-hongo/HeroExtractoresTipoHongo';

export const metadata: Metadata = {
  title: 'Extractores Tipo Hongo | Eólicos Gallego',
  description:
    'Extractores tipo hongo de alta eficiencia para ventilación industrial. Extracción de humos, vapores, grasas y olores en cocinas industriales, panaderías y fábricas. Fabricados en Cali, Colombia.',
  keywords: [
    'extractores tipo hongo',
    'ventilación industrial',
    'extractores de humos',
    'ventilación cocinas industriales',
    'extractores Colombia',
    'Eólicos Gallego',
  ],
};

export default function ExtractoresTipoHongoPage() {
  return (
    <>
      <HeroExtractoresTipoHongo />
      <CaracteristicasExtractoresTipoHongo />
      <AplicacionesExtractoresTipoHongo />
      <EspecificacionesExtractoresTipoHongo />
      <Contact />
    </>
  );
}
