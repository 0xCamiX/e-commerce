import type { Metadata } from 'next';
import CotizadorApp from '@/components/cotizador/CotizadorApp';

export const metadata: Metadata = {
  title: 'Cotizador de Extractores Eólicos | Eólicos Gallego',
  description:
    'Calcula la cantidad exacta de extractores eólicos que necesitas según las dimensiones de tu techo. Cotización instantánea con envío por WhatsApp.',
  keywords: [
    'cotizar extractores eólicos',
    'calculadora extractores',
    'ventilación industrial cotización',
    'extractores eólicos Cali precio',
    'Eólicos Gallego cotizador',
  ],
};

export default function CotizadorPage() {
  return <CotizadorApp />;
}
