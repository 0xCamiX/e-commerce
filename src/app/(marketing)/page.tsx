import Contact from '@/components/Contact';
import { FeaturedProducts } from '@/components/landing/FeaturedProducts';
import { faqs, LandingFaq } from '@/components/landing/LandingFaq';
import { LandingHero } from '@/components/landing/LandingHero';
import { ProductGallery } from '@/components/landing/ProductGallery';
import Prices from '@/components/Prices';
import { FaqJsonLd, LocalBusinessJsonLd } from '@/components/seo/JsonLd';
import Tutorial from '@/components/Tutorial';
import { listStoreProducts } from '@/lib/products';

export default async function Home() {
  const products = await listStoreProducts();

  return (
    <>
      <LocalBusinessJsonLd />
      <FaqJsonLd items={faqs} />
      <LandingHero />
      <ProductGallery />
      <FeaturedProducts products={products} />
      <Prices />
      <Tutorial />
      <LandingFaq />
      <Contact />
    </>
  );
}
