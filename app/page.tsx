import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import WindTurbine from "@/components/WindTurbine";
import { Reviews } from "@/components/Reviews";
import { Icons } from "@/components/Icons";
import { Check, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-slate-50">
      <section>
        <MaxWidthWrapper className="pb-24 pt-12 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-16 xl:pt-24 lg:pb-52">
          <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
            <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
              {/* Image */}
              <div className="absolute w-28 left-0 -top-20 hidden lg:block">
                <img src="image 1.svg" alt="" className="w-full" />
              </div>
              {/* Hero Title */}
              <h1 className="relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl">
                Extractor Eólico en{" "}
                <span className="bg-blue-600 px-2 text-white rounded-lg">
                  Colombia
                </span>{" "}
                mejora el confort
              </h1>
              <p className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap">
                Somos una empresa líder en la fabricación de extractores eólicos
                que ayudan a mejorar la sensación térmica en
                <span className="font-semibold"> recintos cerrados</span>.
                Nuestros productos innovadores y eficientes están diseñados para
                proporcionar un ambiente más cómodo y saludable.
              </p>

              <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
                <div className="space-y-2">
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-blue-600" />
                    Alta-calidad y durabilidad
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-blue-600" />5 años
                    de garantía
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-blue-600" />
                    100% ecológico
                  </li>
                </div>
              </ul>

              <div className="mt-8 flex flex-col items-center lg:items-start">
                <a
                  href="#buy"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg"
                >
                  Comprar
                </a>
              </div>
            </div>
          </div>

          <div className="col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 h-fit">
            <div className="relative md:max-w-xl">
              <WindTurbine
                className="w-full"
                imgSrc="products/wind-turbine-scaled.png"
              />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Value Proposition Section */}
      <section className="bg-slate-100 py-24">
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-32">
          <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
            <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900 ">
              ¿Qué dicen{" "}
              <span className="relative px-2">
                nuestros clientes{" "}
                <Icons.underline className="hidden sm:block pointer-events-none absolute inset-x-0 -bottom-12 text-blue-400" />
              </span>
            </h2>
          </div>
          <div className="mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 gap-y-16">
            {/* Client No. 1: Sr Wok */}
            <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="flex gap-0.5 mb-2">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              </div>
              <div className="text-lg leading-8">
                <p>
                  "Los extractores eólicos han mejorado significativamente la
                  sensación térmica en nuestro edificio. Ahora podemos disfrutar
                  de un ambiente más fresco y cómodo. ¡Recomendado!"
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-4 mt-2">
                <img
                  src="clients/srwok.jpg"
                  alt="client"
                  className="rounded-full h-22 w-64 object-cover"
                />
                <div className="flex flex-col">
                  <p className="font-semibold">Sr. Wok</p>
                  <div className="flex gap-1.5 items-center text-zinc-600">
                    <Check className="h-4 w-4 stroke-[3px] text-blue-600"></Check>
                    <p className="text-sm">10 Extractores instalados!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Client No. 2: Industrias Carber */}
            <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="flex gap-0.5 mb-2">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              </div>
              <div className="text-lg leading-8">
                <p>
                  "Desde que instalamos los extractores eólicos, hemos notado
                  una gran diferencia en la calidad del aire de nuestra fábrica.
                  La reducción de calor ha mejorado las condiciones de trabajo,
                  lo que se refleja en un aumento de la productividad. Sin duda,
                  una inversión que vale la pena."
                </p>
              </div>
              <div className="flex gap-4 mt-2">
                <img
                  src="clients/ind-carber.png"
                  alt="client"
                  className="rounded-full h-[64px] w-[64px] object-cover"
                />
                <div className="flex flex-col">
                  <p className="font-semibold">Industrias Cárbel</p>
                  <div className="flex gap-1.5 items-center text-zinc-600">
                    <Check className="h-4 w-4 stroke-[3px] text-blue-600"></Check>
                    <p className="text-sm">24 Extractores instalados!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Client No. 3: Carpas Mundial */}
            <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="flex gap-0.5 mb-2">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              </div>
              <div className="text-lg leading-8">
                <p>
                  "El servicio y la calidad de los extractores eólicos de
                  GreenFlow Cali superaron nuestras expectativas. Nuestro
                  almacén ya no sufre de sobrecalentamiento, y hemos mejorado la
                  conservación de nuestros productos. Excelente solución para el
                  clima cálido de Cali."
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-4 mt-2">
                <img
                  src="clients/carpas-mundial.png"
                  alt="client"
                  className="rounded-full h-[64px] w-[258px] object-cover"
                />
                <div className="flex flex-col">
                  <p className="font-semibold">Carpas Mundial</p>
                  <div className="flex gap-1.5 items-center text-zinc-600">
                    <Check className="h-4 w-4 stroke-[3px] text-blue-600"></Check>
                    <p className="text-sm">34 Extractores instalados!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Client No. 4: Papeles del Cuaca  */}
            <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="flex gap-0.5 mb-2">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              </div>
              <div className="text-lg leading-8">
                <p>
                  "La instalación de extractores eólicos fue rápida y sin
                  complicaciones. Notamos de inmediato una disminución en el uso
                  de aire acondicionado, lo que nos ha permitido ahorrar en
                  costos de energía. ¡Totalmente satisfechos con los
                  resultados!"
                </p>
              </div>
              <div className="flex gap-4 mt-2">
                <img
                  src="clients/papeles-cauca.png"
                  alt="client"
                  className="rounded-full h-[64px] w-[64px] object-cover"
                />
                <div className="flex flex-col">
                  <p className="font-semibold">Papeles del Valle</p>
                  <div className="flex gap-1.5 items-center text-zinc-600">
                    <Check className="h-4 w-4 stroke-[3px] text-blue-600"></Check>
                    <p className="text-sm">36 Extractores instalados!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
        <div className="pt-16">
          <Reviews />
        </div>
      </section>

      <section>
        <MaxWidthWrapper className="py-24">
          <div className="mb-12 px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900">
                Cotizamos a nivel nacional 🇨🇴{" "}
                <span className="relative px-2 text-gray-900">
                  contacta con nosotros
                </span>
              </h2>
            </div>
          </div>

          <div className="flex flex-col items-center gap-8 sm:gap-16">
            <div className="flex flex-col items-center gap-4 sm:gap-6">
              <p className="text-center text-balance max-w-prose">
                Contáctanos para recibir una cotización personalizada y sin
                compromiso. Nuestro equipo de expertos te asesorará en la mejor
                solución para tu proyecto.
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 sm:gap-6">
              <div className="flex flex-col items-center gap-2">
                <p className="text-center text-balance font-semibold">
                  Llama a nuestro equipo de ventas
                </p>
                <a
                  href="tel:+573177525559"
                  className="text-center text-blue-600 font-semibold"
                >
                  +57 317 752 5559
                </a>
                <Icons.whatsapp className="h-15 w-15" />
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
