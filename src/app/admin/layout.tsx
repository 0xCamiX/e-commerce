import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { requireAdmin } from '@/lib/require-admin';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdmin();

  return (
    <div className="grid min-h-dvh lg:grid-cols-[240px_1fr]">
      <aside className="border-b border-border bg-sidebar p-6 text-sidebar-foreground lg:border-r lg:border-b-0">
        <p className="font-semibold">Admin</p>
        <p className="mt-1 truncate text-xs text-sidebar-foreground/70">
          {session.user.email}
        </p>
        <nav className="mt-6 flex flex-col gap-2">
          <Button
            asChild
            variant="ghost"
            className="justify-start text-sidebar-foreground"
          >
            <Link href="/admin">Resumen</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="justify-start text-sidebar-foreground"
          >
            <Link href="/admin/productos">Productos</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="justify-start text-sidebar-foreground"
          >
            <Link href="/admin/seguridad">2FA</Link>
          </Button>
        </nav>
        <Separator className="my-6" />
        <Button asChild variant="outline" size="sm">
          <Link href="/">Ver sitio</Link>
        </Button>
      </aside>
      <div className="p-6 lg:p-10">{children}</div>
    </div>
  );
}
