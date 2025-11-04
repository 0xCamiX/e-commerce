import Contact from '@/components/Contact';
import Hero from '@/components/Hero';
import Prices from '@/components/Prices';
import Testimonials from '@/components/Testimonials';
import Tutorial from '@/components/Tutorial';

export default function Home() {
  return (
    <>
      <Hero />
      <Prices />
      <Tutorial />
      <Testimonials />
      <Contact />
    </>
  );
}
