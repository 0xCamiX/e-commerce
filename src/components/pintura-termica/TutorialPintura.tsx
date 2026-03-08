'use client';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';

export default function TutorialPintura() {
  const videoId = 'A0DJGsd-hDQ';

  return (
    <section className="w-full bg-slate-50 py-20 md:py-28">
      <MaxWidthWrapper>
        <div className="mx-auto max-w-4xl space-y-10">
          <div className="text-center">
            <p className="mb-2 text-sm font-semibold tracking-widest text-amber-600 uppercase">
              Tutorial
            </p>
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
              Mira cómo se aplica
            </h2>
            <p className="mx-auto max-w-2xl text-lg font-medium text-slate-600">
              Aprende el proceso de aplicación de la pintura térmica paso a paso
              en este video demostrativo
            </p>
          </div>

          <div
            className="relative overflow-hidden rounded-2xl shadow-xl"
            style={{ aspectRatio: '16 / 9' }}
          >
            <iframe
              className="absolute top-0 left-0 h-full w-full"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="Tutorial de aplicación de pintura térmica"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
