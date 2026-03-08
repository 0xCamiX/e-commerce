'use client';

import { Menu, X } from 'lucide-react';
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

  return (
    <nav className="sticky inset-x-0 top-0 z-[100] h-14 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
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
          <div className="hidden h-full items-center space-x-1 md:flex">
            {siteConfig.navigation.main.map(item => {
              const isActive = pathname === item.href;
              const isNew = 'isNew' in item && item.isNew;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative ${buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })} px-3 font-medium ${isActive ? 'text-sky-600' : ''} transition-all duration-200 hover:scale-105`}
                >
                  {isNew && (
                    <span className="absolute -top-2 -right-3 rounded-full bg-amber-500 px-1.5 py-0.5 text-[10px] font-bold leading-none text-white shadow-sm">
                      NEW
                    </span>
                  )}
                  <span>{item.title}</span>
                  <span
                    className={`absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r ${isNew ? 'from-amber-400 to-orange-500' : 'from-sky-400 to-sky-600'} ${isActive ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100 transition-transform duration-300`}
                  />
                </Link>
              );
            })}
          </div>

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
            <div className="flex flex-col space-y-1 p-4">
              {siteConfig.navigation.main.map(item => {
                const isActive = pathname === item.href;
                const isNew = 'isNew' in item && item.isNew;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`${buttonVariants({
                      size: 'sm',
                      variant: 'ghost',
                      className: 'w-full justify-start',
                    })} font-medium ${isActive ? 'text-sky-600' : ''} transition-all duration-200`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="flex items-center gap-2">
                      {item.title}
                      {isNew && (
                        <span className="rounded-full bg-amber-500 px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">
                          NEW
                        </span>
                      )}
                    </span>
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
