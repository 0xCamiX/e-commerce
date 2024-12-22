import Link from 'next/link';
import { Icons } from '@/components/Icons';

const FloatingWhatsAppButton = () => {
  return (
    <Link
      href={
        'https://wa.me/3177525559?text=Estuve%20viendo%20tu%20página%20web%20y%20me%20interesan%20los%20extractores%20eólicos.'
      }
      target='_blank'
      rel='noopener noreferrer'
      className='fixed bottom-4 right-4 z-50 p-4 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-colors'
    >
      <Icons.whatsapp className='w-12 h-12 text-white' />
    </Link>
  );
};

export default FloatingWhatsAppButton;
