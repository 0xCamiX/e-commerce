'use client';

export default function Tutorial() {
  const videoId = 'XlNISZIxEdI';

  return (
    <section id="tutorial" className="w-full bg-white py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
          Tutorial de Instalación
        </h2>
        <div
          className="relative overflow-hidden rounded-xl shadow-lg"
          style={{
            aspectRatio: '16 / 9',
          }}
        >
          <iframe
            className="absolute top-0 left-0 h-full w-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}
