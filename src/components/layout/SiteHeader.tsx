'use client';

import { Menu, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { siteConfig } from '@/config/site';
import { useCartCount } from '@/hooks/use-cart';
import { cn } from '@/lib/utils';

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/tienda', label: 'Tienda' },
  { href: '/extractores-tipo-hongo', label: 'Tipo hongo' },
  { href: '/pintura-termica', label: 'Pintura térmica', isNew: true },
  { href: '/cotizador', label: 'Cotizador' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const cartCount = useCartCount();

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image
            src="/logo.png"
            alt="Eólicos Gallego"
            width={36}
            height={36}
            className="size-9 rounded-full object-cover"
            priority
          />
          <span className="hidden sm:inline">{siteConfig.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
                pathname === link.href
                  ? 'bg-secondary text-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {link.label}
              {link.isNew ? (
                <Badge className="ml-2 px-1.5 py-0 text-[10px]">Nuevo</Badge>
              ) : null}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="icon" className="relative">
            <Link href="/carrito" aria-label="Carrito">
              <ShoppingBag />
              {cartCount > 0 ? (
                <span className="absolute -top-1 -right-1 grid size-4 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  {cartCount}
                </span>
              ) : null}
            </Link>
          </Button>
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link href="/login">Cuenta</Link>
          </Button>
          <Button asChild className="hidden sm:inline-flex">
            <Link href="/tienda">Comprar</Link>
          </Button>
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Abrir menú">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>{siteConfig.name}</SheetTitle>
                </SheetHeader>
                <nav className="mt-6 flex flex-col gap-2">
                  {links.map(link => (
                    <Button
                      key={link.href}
                      asChild
                      variant={pathname === link.href ? 'secondary' : 'ghost'}
                      className="justify-start"
                    >
                      <Link href={link.href}>{link.label}</Link>
                    </Button>
                  ))}
                  <Button asChild variant="ghost" className="justify-start">
                    <Link href="/login">Cuenta</Link>
                  </Button>
                  <Button asChild className="justify-start">
                    <Link href="/tienda">Comprar</Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
