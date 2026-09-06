const faqs = [
  {
    question: '¿Qué es Eólicos Gallego?',
    answer:
      'Eólicos Gallego es una empresa de Cali, Colombia, fabricante de extractores eólicos de aluminio y comercializadora de extractores tipo hongo y pintura térmica.',
  },
  {
    question: '¿Cómo funciona un extractor eólico?',
    answer:
      'La turbina gira con el viento y extrae aire caliente del recinto sin electricidad. Mejora el confort térmico en bodegas, hogares y galpones.',
  },
  {
    question: '¿Cuánto cuesta un extractor eólico 31 pulgadas?',
    answer:
      'El extractor eólico 31" es el más solicitado para bodegas. El precio vigente aparece en la tienda, más IVA, con instalación y cotización a medida.',
  },
  {
    question: '¿La pintura térmica realmente baja la temperatura?',
    answer:
      'Las microesferas reflejan radiación solar y pueden reducir hasta 20°C en la superficie del techo, disminuyendo la carga térmica interior.',
  },
];

export function LandingFaq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <h2 className="mb-8 text-center">
        Preguntas frecuentes sobre Eólicos Gallego
      </h2>
      <div className="flex flex-col gap-4">
        {faqs.map(faq => (
          <details
            key={faq.question}
            className="rounded-2xl border border-border bg-card p-5"
          >
            <summary className="cursor-pointer font-medium">
              {faq.question}
            </summary>
            <p className="mt-3 text-sm text-muted-foreground">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export { faqs };
