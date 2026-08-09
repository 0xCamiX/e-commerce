import type { Metadata } from 'next';
import CotizadorApp from '@/components/cotizador/CotizadorApp';

export const metadata: Metadata = {
  title: 'Cotizador de Extractores Eólicos | Eólicos Gallego',
  description:
    'Simula la cantidad de extractores eólicos por volumen, ACH y viento, y genera cotización con precios oficiales e IVA. Envío por WhatsApp.',
  keywords: [
    'cotizar extractores eólicos',
    'simulador extractores',
    'calculadora extractores',
    'ventilación industrial cotización',
    'extractores eólicos Cali precio',
    'Eólicos Gallego cotizador',
  ],
};

export default function CotizadorPage() {
  return <CotizadorApp />;
}
