export default function Tutorial() {
  const videoId = 'XlNISZIxEdI';

  return (
    <section id="tutorial" className="bg-background py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-medium text-primary">Instalación</p>
          <h2 className="mt-2">Cómo se instala un extractor eólico Gallego</h2>
          <p className="mt-3 text-muted-foreground">
            Tutorial de montaje en cubierta. Fabricamos en Cali y asesoramos la
            instalación en hogares, bodegas y galpones.
          </p>
        </div>
        <div className="relative aspect-video overflow-hidden rounded-2xl border border-border shadow-lg">
          <iframe
            className="absolute inset-0 size-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="Tutorial de instalación de extractores eólicos Gallego"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
