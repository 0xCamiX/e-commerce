'use client';

export default function Tutorial() {
  const videoId = 'XlNISZIxEdI';

  return (
    <section id="tutorial" className="w-full bg-background py-12 md:py-16">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="mb-8 text-center text-2xl font-bold text-foreground md:text-3xl">
          Tutorial de Instalación
        </h2>
        <div
          className="relative overflow-hidden rounded-xl border border-border shadow-lg"
          style={{ aspectRatio: '16 / 9' }}
        >
          <iframe
            className="absolute top-0 left-0 h-full w-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
