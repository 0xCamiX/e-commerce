'use client';

import { cn } from '@/lib/utils';

export function SpinningExtractor({
  className,
  size = 420,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div
      className={cn('relative mx-auto grid place-items-center', className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <div className="absolute inset-8 rounded-full bg-primary/15 blur-3xl" />
      <div className="animate-wind absolute top-1/3 left-[8%] h-px w-24 bg-gradient-to-r from-transparent via-primary-foreground/70 to-transparent" />
      <div className="animate-wind absolute top-1/2 left-[2%] h-px w-32 bg-gradient-to-r from-transparent via-primary-foreground/50 to-transparent [animation-delay:700ms]" />
      <div className="animate-wind absolute top-[62%] left-[12%] h-px w-20 bg-gradient-to-r from-transparent via-primary-foreground/40 to-transparent [animation-delay:1.4s]" />

      <svg
        viewBox="0 0 320 360"
        className="relative z-10 size-full drop-shadow-xl"
      >
        <title>Extractor eólico girando</title>
        <defs>
          <linearGradient id="neck" x1="0" x2="1">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="50%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>
          <linearGradient id="vane" x1="0" x2="1">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="55%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>
          <radialGradient id="hub" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#475569" />
          </radialGradient>
        </defs>

        <ellipse
          cx="160"
          cy="328"
          rx="78"
          ry="10"
          fill="#0f172a"
          opacity="0.22"
        />
        <rect x="132" y="236" width="56" height="86" rx="8" fill="url(#neck)" />
        <rect x="118" y="312" width="84" height="16" rx="4" fill="#94a3b8" />

        <g
          className="origin-center animate-turbine"
          style={{ transformOrigin: '160px 150px' }}
        >
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * 360) / 16;
            return (
              <g key={angle} transform={`rotate(${angle} 160 150)`}>
                <path
                  d="M160 42 C188 78 198 118 176 148 C168 156 160 158 160 150 C160 118 156 78 160 42Z"
                  fill="url(#vane)"
                  stroke="#94a3b8"
                  strokeWidth="0.6"
                />
              </g>
            );
          })}
          <circle cx="160" cy="150" r="28" fill="url(#hub)" stroke="#cbd5e1" />
          <circle cx="160" cy="150" r="10" fill="#0ea5e9" opacity="0.85" />
        </g>
      </svg>
    </div>
  );
}
