'use client';

import { Menu, X, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Determinar la URL correcta para anchors según la página actual
  const getHref = (href: string) => {
    if (href.startsWith('#')) {
      // Si estamos en /extractores-tipo-hongo, los anchors van a la página principal
      return pathname === '/extractores-tipo-hongo' ? `/${href}` : href;
    }
    return href;
  };

  // Filtrar navlinks según la página actual
  const currentPageNavLinks = siteConfig.navigation.main;

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
          <div className="hidden h-full items-center space-x-2 md:flex">
            {currentPageNavLinks.map(item => {
              const isActive = pathname === item.href || 
                (item.href === '/' && pathname === '/');
              const isPrimary = 'isPrimary' in item && item.isPrimary;
              const isAnchor = item.href.startsWith('#');

              return (
                <Link
                  key={item.href}
                  href={getHref(item.href)}
                  className={`group relative ${buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })} ${isPrimary ? 'px-3 font-semibold' : ''} ${isActive && !isAnchor ? 'text-sky-600' : ''} transition-all duration-200 hover:scale-105`}
                >
                  {isPrimary && (
                    <span className="absolute -top-1 -right-1 flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500"></span>
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    {item.title}
                    {isPrimary && (
                      <Sparkles className="h-3 w-3 text-sky-500 transition-transform group-hover:scale-110 group-hover:rotate-12" />
                    )}
                  </span>
                  {isPrimary && (
                    <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-sky-400 to-sky-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                  )}
                </Link>
              );
            })}
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
              {currentPageNavLinks.map(item => {
                const isActive = pathname === item.href || 
                  (item.href === '/' && pathname === '/');
                const isPrimary = 'isPrimary' in item && item.isPrimary;
                const isAnchor = item.href.startsWith('#');

                return (
                  <Link
                    key={item.href}
                    href={getHref(item.href)}
                    className={`group relative ${buttonVariants({
                      size: 'sm',
                      variant: 'ghost',
                      className: 'w-full justify-start',
                    })} ${isPrimary ? 'font-semibold' : ''} ${isActive && !isAnchor ? 'text-sky-600' : ''} transition-all duration-200`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="flex items-center gap-2">
                      {item.title}
                      {isPrimary && (
                        <Sparkles className="h-3.5 w-3.5 text-sky-500 transition-transform group-hover:rotate-12" />
                      )}
                    </span>
                    {isPrimary && (
                      <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-sky-400 to-sky-600 scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
