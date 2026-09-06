import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-dvh place-items-center bg-secondary/40 px-4">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-lg">
        <Link
          href="/"
          className="mb-6 inline-block text-sm text-muted-foreground"
        >
          ← Eólicos Gallego
        </Link>
        {children}
      </div>
    </div>
  );
}
