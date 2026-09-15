import { cn } from '@/lib/utils';

type ExtractorVisualProps = {
  className?: string;
};

export function ExtractorVisual({ className }: ExtractorVisualProps) {
  return (
    <svg
      viewBox="0 0 400 480"
      role="img"
      aria-label="Extractor eólico de aspas esféricas en aluminio"
      className={cn('h-auto w-full', className)}
    >
      <defs>
        <radialGradient id="eg-sphere" cx="38%" cy="32%" r="68%">
          <stop offset="0%" stopColor="#f7f4ee" />
          <stop offset="35%" stopColor="#c9c6bf" />
          <stop offset="70%" stopColor="#8d8b86" />
          <stop offset="100%" stopColor="#4a4946" />
        </radialGradient>
        <linearGradient id="eg-blade" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f4f1ea" />
          <stop offset="45%" stopColor="#b8b5ae" />
          <stop offset="100%" stopColor="#6f6d68" />
        </linearGradient>
        <linearGradient id="eg-blade-dark" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#d8d5ce" />
          <stop offset="55%" stopColor="#7a7873" />
          <stop offset="100%" stopColor="#3f3e3b" />
        </linearGradient>
        <linearGradient id="eg-throat" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#d2cfc8" />
          <stop offset="100%" stopColor="#6a6863" />
        </linearGradient>
        <linearGradient id="eg-flash" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ece9e1" />
          <stop offset="100%" stopColor="#9a978f" />
        </linearGradient>
        <filter id="eg-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="8" result="b" />
          <feOffset dy="10" result="o" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.28" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <ellipse
        cx="200"
        cy="428"
        rx="118"
        ry="18"
        fill="#1c1916"
        opacity="0.12"
      />

      <g filter="url(#eg-soft)">
        <ellipse
          cx="200"
          cy="402"
          rx="96"
          ry="16"
          fill="url(#eg-flash)"
          stroke="#6f6d68"
          strokeWidth="1.2"
        />
        <path
          d="M128 402 C128 388 154 378 200 378 C246 378 272 388 272 402"
          fill="url(#eg-flash)"
        />
        <rect
          x="168"
          y="286"
          width="64"
          height="96"
          rx="8"
          fill="url(#eg-throat)"
          stroke="#5c5a56"
          strokeWidth="1"
        />
        <path
          d="M176 286 C176 272 186 264 200 264 C214 264 224 272 224 286"
          fill="#b7b4ad"
        />
      </g>

      <g data-vanes transform="translate(200 196)">
        {Array.from({ length: 16 }, (_, i) => {
          const angle = (i * 360) / 16;
          const dark = i % 2 === 1;
          return (
            <g key={angle} transform={`rotate(${angle})`}>
              <path
                d="M8 -8 C42 -70 78 -78 96 -36 C72 -8 40 18 8 28 C2 8 2 -2 8 -8 Z"
                fill={dark ? 'url(#eg-blade-dark)' : 'url(#eg-blade)'}
                stroke="#5a5854"
                strokeWidth="0.6"
                opacity={dark ? 0.92 : 1}
              />
            </g>
          );
        })}
        <circle
          r="132"
          fill="none"
          stroke="#f7f4ee"
          strokeWidth="1.4"
          opacity="0.35"
        />
        <circle r="118" fill="url(#eg-sphere)" opacity="0.22" />
        <circle
          r="34"
          fill="url(#eg-sphere)"
          stroke="#ece9e1"
          strokeWidth="2"
        />
        <circle r="14" fill="#3f3e3b" />
        <circle cx="-6" cy="-6" r="5" fill="#f7f4ee" opacity="0.7" />
      </g>
    </svg>
  );
}
