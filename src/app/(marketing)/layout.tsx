import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="min-h-[calc(100dvh-4rem)]">{children}</main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  );
}
