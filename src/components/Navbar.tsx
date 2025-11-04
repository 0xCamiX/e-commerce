'use client';

import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="sticky inset-x-0 top-0 z-[100] h-14 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          {/* Logo */}
          <Link href="/" className="z-40 flex items-center font-semibold">
            <Image
              src="/logo.png"
              width={40}
              height={25}
              alt={siteConfig.name}
              className="mr-2"
            />
            <span className="flex items-center">{siteConfig.name}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden h-full items-center space-x-4 md:flex">
            {siteConfig.navigation.main.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={buttonVariants({
                  size: 'sm',
                  variant: 'ghost',
                })}
              >
                {item.title}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={toggleMenu}
            className="rounded-md p-2 transition-colors hover:bg-gray-100 md:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-14 right-0 left-0 border-b border-gray-200 bg-white shadow-lg md:hidden">
            <div className="flex flex-col space-y-2 p-4">
              {siteConfig.navigation.main.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                    className: 'w-full justify-start',
                  })}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
