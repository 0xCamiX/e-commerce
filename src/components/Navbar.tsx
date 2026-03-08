'use client';

import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { siteConfig } from '@/config/site';

function getActiveProduct(pathname: string): string {
  if (pathname.startsWith('/extractores-tipo-hongo'))
    return '/extractores-tipo-hongo';
  if (pathname.startsWith('/pintura-termica')) return '/pintura-termica';
  if (pathname.startsWith('/cotizador')) return '/cotizador';
  return '/';
}

export default function Navbar() {
  const pathname = usePathname();
  const activeProduct = getActiveProduct(pathname);
  const subNavItems = siteConfig.navigation.subNav[activeProduct] ?? [];

  return (
    <header className="sticky top-0 z-[100] w-full bg-white shadow-sm">
      {/* Level 1: Main navigation */}
      <div className="border-b border-border">
        <MaxWidthWrapper>
          <div className="flex h-12 items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-semibold text-foreground"
            >
              <Image
                src="/logo.png"
                width={32}
                height={20}
                alt={siteConfig.name}
              />
              <span>{siteConfig.name}</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-1 md:flex">
              {siteConfig.navigation.main.map(item => {
                const isActive = activeProduct === item.href;
                const isNew = 'isNew' in item && item.isNew;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative inline-flex h-8 items-center rounded-md px-3 text-[13px] font-medium transition-colors ${
                      isActive
                        ? 'bg-muted text-foreground'
                        : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
                    }`}
                  >
                    {item.title}
                    {isNew && (
                      <Badge className="ml-1.5 px-1 py-0 text-[9px] leading-tight">
                        NEW
                      </Badge>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile hamburger */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    aria-label="Abrir menú"
                  >
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64">
                  <SheetHeader>
                    <SheetTitle className="text-left text-sm">
                      {siteConfig.name}
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="mt-4 flex flex-col gap-0.5">
                    {siteConfig.navigation.main.map(item => {
                      const isActive = activeProduct === item.href;
                      const isNew = 'isNew' in item && item.isNew;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`${buttonVariants({
                            size: 'sm',
                            variant: isActive ? 'secondary' : 'ghost',
                            className: 'w-full justify-start',
                          })} text-[13px] font-medium`}
                        >
                          {item.title}
                          {isNew && (
                            <Badge className="ml-1.5 px-1 py-0 text-[9px]">
                              NEW
                            </Badge>
                          )}
                        </Link>
                      );
                    })}

                    {subNavItems.length > 0 && (
                      <>
                        <div className="my-2 border-t border-border" />
                        <p className="px-3 pb-1 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                          Secciones
                        </p>
                        {subNavItems.map(sub => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className={`${buttonVariants({
                              size: 'sm',
                              variant: 'ghost',
                              className: 'w-full justify-start',
                            })} text-[13px] font-normal text-muted-foreground`}
                          >
                            {sub.title}
                          </Link>
                        ))}
                      </>
                    )}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>

      {/* Level 2: Product sub-navigation */}
      {subNavItems.length > 0 && (
        <div className="border-b border-border bg-white/90 backdrop-blur-sm">
          <MaxWidthWrapper>
            <nav className="hidden items-center gap-0.5 overflow-x-auto md:flex">
              {subNavItems.map(sub => (
                <Link
                  key={sub.href}
                  href={sub.href}
                  className="inline-flex h-9 items-center rounded-md px-3 text-[12px] font-medium text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
                >
                  {sub.title}
                </Link>
              ))}
            </nav>
          </MaxWidthWrapper>
        </div>
      )}
    </header>
  );
}
