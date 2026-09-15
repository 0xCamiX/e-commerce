'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { landingCallouts, landingChapters } from '@/components/landing/copy';
import { ExtractorVisual } from '@/components/landing/ExtractorVisual';
import { Button } from '@/components/ui/button';
import { buildWhatsAppUrl } from '@/config/site';
import { gsap, useGSAP } from '@/lib/gsap-client';
import { cn } from '@/lib/utils';

export function LandingHeroScroll() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();
      const pinTarget = root.querySelector<HTMLElement>('[data-pin]');
      const product = root.querySelector<HTMLElement>('[data-product]');
      const vanes = root.querySelector<SVGElement>('[data-vanes]');
      const chapters = gsap.utils.toArray<HTMLElement>('[data-chapter]');
      const callouts = gsap.utils.toArray<HTMLElement>('[data-callout]');
      const sizes = gsap.utils.toArray<HTMLElement>('[data-size]');
      const progress = root.querySelector<HTMLElement>('[data-progress]');

      let lastChapter = -1;

      const applyChapterChrome = (index: number) => {
        if (index === lastChapter) return;
        lastChapter = index;
        const chapter = landingChapters[index];
        if (!chapter) return;

        callouts.forEach(el => {
          const on = chapter.calloutIds.includes(el.dataset.callout ?? '');
          gsap.to(el, {
            autoAlpha: on ? 1 : 0,
            y: on ? 0 : 10,
            duration: 0.35,
            overwrite: 'auto',
          });
        });

        sizes.forEach(el => {
          const n = Number(el.dataset.size);
          const on = chapter.highlightSizes.includes(n);
          gsap.to(el, {
            backgroundColor: on
              ? 'rgba(45, 122, 94, 1)'
              : 'rgba(28, 25, 22, 0.06)',
            color: on ? '#f7f4ee' : '#1c1916',
            scale: on ? 1.04 : 1,
            duration: 0.3,
            overwrite: 'auto',
          });
        });

        if (product) {
          gsap.to(product, {
            scale: chapter.productScale,
            duration: 0.5,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        }

        if (progress) {
          progress.style.width = `${((index + 1) / chapters.length) * 100}%`;
        }
      };

      mm.add(
        {
          isDesktop: '(min-width: 1024px)',
          isMobile: '(max-width: 1023px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        context => {
          const { isDesktop, reduceMotion } = context.conditions as {
            isDesktop: boolean;
            reduceMotion: boolean;
          };

          applyChapterChrome(0);

          if (reduceMotion) {
            gsap.set(chapters, {
              autoAlpha: 1,
              y: 0,
              position: 'relative',
            });
            gsap.set(callouts, { autoAlpha: 1, y: 0 });
            gsap.set(sizes, { clearProps: 'transform' });
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
            gsap.set(chapters, { autoAlpha: 0, y: 28 });
            gsap.set(chapters[0], { autoAlpha: 1, y: 0 });
            gsap.set(callouts, { autoAlpha: 0, y: 12 });
            applyChapterChrome(0);

            const tl = gsap.timeline({
              defaults: { ease: 'none' },
              scrollTrigger: {
                trigger: root,
                pin: pinTarget,
                start: 'top 5.5rem',
                end: () =>
                  `+=${Math.round(window.innerHeight * 0.92 * (chapters.length - 1))}`,
                scrub: 0.65,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: self => {
                  const i = Math.min(
                    chapters.length - 1,
                    Math.round(self.progress * (chapters.length - 1)),
                  );
                  applyChapterChrome(i);
                },
              },
            });

            chapters.forEach((chapter, i) => {
              if (i === 0) return;
              tl.to(
                chapters[i - 1],
                { autoAlpha: 0, y: -24, duration: 0.45 },
                i,
              );
              tl.to(chapter, { autoAlpha: 1, y: 0, duration: 0.45 }, i);
            });
          } else {
            chapters.forEach((chapter, i) => {
              gsap.from(chapter, {
                autoAlpha: 0,
                y: 24,
                duration: 0.6,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: chapter,
                  start: 'top 82%',
                  toggleActions: 'play none none reverse',
                  onEnter: () => applyChapterChrome(i),
                  onEnterBack: () => applyChapterChrome(i),
                },
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
        className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-12 md:px-8 lg:min-h-[calc(100svh-5.5rem)] lg:flex-row lg:items-center lg:gap-16 lg:py-8"
      >
        <div className="order-2 w-full lg:order-1 lg:w-[46%]">
          <p className="mb-6 text-[11px] font-medium tracking-[0.22em] text-[#6b6560] uppercase">
            Extractor eólico · Cali
          </p>
          <div
            data-chapter-stack
            className="landing-chapter-stack relative space-y-16 lg:min-h-[28rem] lg:space-y-0"
          >
            {landingChapters.map((chapter, index) => {
              const Heading = index === 0 ? 'h1' : 'h2';
              return (
                <article
                  key={chapter.id}
                  data-chapter={chapter.id}
                  className="landing-chapter lg:absolute lg:inset-0 lg:flex lg:flex-col lg:justify-center"
                >
                  <p className="mb-3 text-sm font-medium tracking-wide text-[#2d7a5e]">
                    {chapter.kicker}
                  </p>
                  <Heading className="landing-serif max-w-xl text-[2.15rem] leading-[1.08] font-normal text-[#1c1916] sm:text-5xl lg:text-[3.35rem]">
                    {chapter.title}
                  </Heading>
                  <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#5c574f] sm:text-base">
                    {chapter.body}
                  </p>
                </article>
              );
            })}
          </div>

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

        <div className="order-1 w-full lg:order-2 lg:w-[54%]">
          <div className="relative mx-auto max-w-lg">
            {landingCallouts.map(callout => (
              <div
                key={callout.id}
                data-callout={callout.id}
                className={cn(
                  'pointer-events-none absolute z-10 hidden max-w-[10.5rem] rounded-2xl border border-[#1c1916]/8 bg-[#f7f4ee]/90 px-3 py-2 shadow-sm backdrop-blur-sm lg:block',
                  callout.position,
                )}
              >
                <p className="text-[11px] font-semibold tracking-wide text-[#1c1916] uppercase">
                  {callout.label}
                </p>
                <p className="mt-0.5 text-[11px] leading-snug text-[#6b6560]">
                  {callout.detail}
                </p>
              </div>
            ))}

            <div data-product className="origin-center will-change-transform">
              <ExtractorVisual />
            </div>

            <div className="mt-2 flex items-center justify-center gap-2">
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
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#1c1916]/10"
        aria-hidden
      >
        <span
          data-progress
          className="block h-px bg-[#2d7a5e] transition-[width] duration-300"
          style={{ width: `${100 / landingChapters.length}%` }}
        />
      </div>
    </section>
  );
}
