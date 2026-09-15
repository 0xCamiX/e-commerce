'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { landingHeroCopy, landingScrubSteps } from '@/components/landing/copy';
import { ExtractorVisual } from '@/components/landing/ExtractorVisual';
import { Button } from '@/components/ui/button';
import { buildWhatsAppUrl } from '@/config/site';
import { gsap, useGSAP } from '@/lib/gsap-client';

const SIZE_ON = 'rgba(45, 122, 94, 1)';
const SIZE_OFF = 'rgba(28, 25, 22, 0.06)';
const SIZE_ON_FG = '#f7f4ee';
const SIZE_OFF_FG = '#1c1916';

export function LandingHeroScroll() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();
      const pinTarget = root.querySelector<HTMLElement>('[data-pin]');
      const photos = gsap.utils.toArray<HTMLElement>('[data-photo]');
      const overlay = root.querySelector<HTMLElement>('[data-overlay]');
      const extractor = root.querySelector<HTMLElement>('[data-extractor]');
      const sizes = gsap.utils.toArray<HTMLElement>('[data-size]');
      const vanes = root.querySelector<SVGElement>('[data-vanes]');

      const sizeVars = (index: number) => {
        const step = landingScrubSteps[index];
        return sizes.map(el => {
          const on = step?.highlightSizes.includes(Number(el.dataset.size));
          return {
            target: el,
            backgroundColor: on ? SIZE_ON : SIZE_OFF,
            color: on ? SIZE_ON_FG : SIZE_OFF_FG,
          };
        });
      };

      mm.add(
        {
          isDesktop: '(min-width: 1024px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        context => {
          const { isDesktop, reduceMotion } = context.conditions as {
            isDesktop: boolean;
            reduceMotion: boolean;
          };

          const labels = gsap.utils.toArray<HTMLElement>(
            isDesktop ? '[data-scrub-label]' : '[data-scrub-label-mobile]',
          );

          if (reduceMotion) {
            gsap.set(labels, { autoAlpha: 1, y: 0 });
            gsap.set(photos, { autoAlpha: 0 });
            gsap.set(overlay, { autoAlpha: 0 });
            gsap.set(extractor, { autoAlpha: 1 });
            return;
          }

          if (vanes) {
            gsap.to(vanes, {
              rotation: 360,
              transformOrigin: '50% 50%',
              duration: 36,
              repeat: -1,
              ease: 'none',
            });
          }

          if (isDesktop && pinTarget) {
            gsap.set(labels, { autoAlpha: 0, y: 12 });
            gsap.set(photos, { autoAlpha: 0 });
            gsap.set(labels[0], { autoAlpha: 1, y: 0 });
            gsap.set('[data-photo="hogar"]', { autoAlpha: 1 });
            gsap.set(overlay, { autoAlpha: 1 });
            gsap.set(extractor, { autoAlpha: 0.12 });
            sizeVars(0).forEach(({ target, ...vars }) => {
              gsap.set(target, vars);
            });

            const tl = gsap.timeline({
              defaults: { duration: 0.45, ease: 'none' },
              scrollTrigger: {
                trigger: root,
                pin: pinTarget,
                start: 'top 3.5rem',
                end: () =>
                  `+=${Math.round(window.innerHeight * 0.85 * labels.length)}`,
                scrub: 0.65,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });

            landingScrubSteps.forEach((step, i) => {
              tl.addLabel(step.id);
              if (i === 0) {
                tl.to({}, { duration: 0.7 });
                return;
              }

              const prev = landingScrubSteps[i - 1];
              tl.to(labels[i - 1], { autoAlpha: 0, y: -12 });
              tl.to(labels[i], { autoAlpha: 1, y: 0 }, '<');

              const prevPhoto = root.querySelector(`[data-photo="${prev.id}"]`);
              const nextPhoto = root.querySelector(`[data-photo="${step.id}"]`);

              if (prevPhoto) tl.to(prevPhoto, { autoAlpha: 0 }, '<');
              if (nextPhoto) {
                tl.to(nextPhoto, { autoAlpha: 1 }, '<');
                tl.to(overlay, { autoAlpha: 1 }, '<');
                tl.to(extractor, { autoAlpha: 0.12 }, '<');
              } else {
                tl.to(overlay, { autoAlpha: 0 }, '<');
                tl.to(extractor, { autoAlpha: 1 }, '<');
              }

              sizeVars(i).forEach(({ target, ...vars }) => {
                tl.to(target, vars, '<');
              });

              tl.to({}, { duration: 0.7 });
            });
          } else {
            gsap.set(photos, { autoAlpha: 0 });
            gsap.set('[data-photo="hogar"]', { autoAlpha: 1 });
            gsap.set(overlay, { autoAlpha: 1 });
            labels.forEach((label, i) => {
              gsap.from(label, {
                autoAlpha: 0,
                y: 16,
                duration: 0.5,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: label,
                  start: 'top 85%',
                  toggleActions: 'play none none reverse',
                },
              });
              sizeVars(i).forEach(({ target, ...vars }) => {
                gsap.to(target, {
                  ...vars,
                  scrollTrigger: {
                    trigger: label,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                  },
                });
              });
            });
          }

          return undefined;
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      id="experiencia"
      className="relative"
      aria-label="Extractor eólico, experiencia de scroll"
    >
      <div
        data-pin
        className="mx-auto grid min-h-[calc(100svh-3.5rem)] w-full max-w-6xl grid-cols-1 gap-8 px-5 py-10 md:px-8 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-8"
      >
        <div className="order-2 lg:order-1">
          <p className="mb-6 text-[11px] font-medium tracking-[0.22em] text-[#6b6560] uppercase">
            Extractor eólico · Cali
          </p>
          <h1 className="landing-serif max-w-xl text-[2.15rem] leading-[1.08] font-normal text-[#1c1916] sm:text-5xl lg:text-[3.35rem]">
            {landingHeroCopy.h1}
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#5c574f] sm:text-base">
            {landingHeroCopy.sub}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="rounded-full px-7 shadow-none">
              <Link href="/cotizador">Cotizar</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-[#1c1916]/15 bg-transparent px-7 shadow-none"
            >
              <Link
                href={buildWhatsAppUrl('Extractor eólico')}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </Link>
            </Button>
          </div>
        </div>

        <div className="order-1 flex flex-col gap-4 lg:order-2">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#e6e0d4] lg:aspect-auto lg:h-[min(36rem,calc(100svh-8rem))]">
            {landingScrubSteps
              .filter(step => step.photo)
              .map(step => (
                <div
                  key={step.id}
                  data-photo={step.id}
                  className="absolute inset-0"
                >
                  {/* biome-ignore lint/performance/noImgElement: SVG slots until Figma drops PNG/WebP. */}
                  <img
                    src={step.photo ?? ''}
                    alt={step.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}

            <div
              data-overlay
              className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[42%] bg-gradient-to-t from-black/80 via-black/40 to-transparent"
            />

            <div
              data-extractor
              className="relative z-20 mx-auto flex h-full max-w-sm items-center px-6"
            >
              <ExtractorVisual />
            </div>

            <div className="absolute inset-x-0 bottom-0 z-30 hidden lg:block">
              {landingScrubSteps.map(step => (
                <ScrubLabel key={step.id} step={step} attr="data-scrub-label" />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-2">
            {[24, 31, 39].map(size => (
              <span
                key={size}
                data-size={size}
                className="inline-flex min-w-16 items-center justify-center rounded-full bg-[#1c1916]/6 px-3 py-1.5 text-xs font-medium text-[#1c1916]"
              >
                {size}&quot;
              </span>
            ))}
          </div>

          <div className="space-y-8 pb-8 lg:hidden">
            {landingScrubSteps.map(step => (
              <ScrubLabel
                key={step.id}
                step={step}
                attr="data-scrub-label-mobile"
                onPaper
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ScrubLabel({
  step,
  onPaper = false,
  attr,
}: {
  step: (typeof landingScrubSteps)[number];
  onPaper?: boolean;
  attr: 'data-scrub-label' | 'data-scrub-label-mobile';
}) {
  const titleClass = onPaper
    ? 'landing-serif text-xl text-[#1c1916]'
    : 'landing-serif text-xl text-white sm:text-2xl';
  const bodyClass = onPaper
    ? 'mt-1 text-sm leading-relaxed text-[#5c574f]'
    : 'mt-1 text-sm leading-relaxed text-white/80';
  const kickerClass = onPaper
    ? 'mb-1 text-[10px] font-medium tracking-[0.18em] text-[#2d7a5e] uppercase'
    : 'mb-1 text-[10px] font-medium tracking-[0.18em] text-white/70 uppercase';

  return (
    <div
      {...{ [attr]: step.id }}
      className={onPaper ? '' : 'absolute inset-x-0 bottom-0 p-5'}
    >
      {step.isPlaceholder ? (
        <p className={kickerClass}>Placeholder — no es un quote real</p>
      ) : (
        <p className={kickerClass}>{step.kicker}</p>
      )}
      <p className={titleClass}>{step.title}</p>
      <p className={bodyClass}>{step.body}</p>
    </div>
  );
}
