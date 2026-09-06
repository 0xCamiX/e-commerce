import { siteConfig } from '@/config/site';

export function WhatsAppFloat() {
  const href = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
    'Hola, vi la web de Eólicos Gallego y quiero cotizar extractores eólicos.',
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-4 bottom-4 z-40 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-lg"
    >
      WhatsApp
    </a>
  );
}
