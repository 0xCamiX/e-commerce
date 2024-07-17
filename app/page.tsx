import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import WindTurbine from "@/components/WindTurbine";
import { Check } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-slate-50">
      <section>
        <MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52">
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

              
            </div>
          </div>

          <div className='col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 h-fit'>
            <div className='relative md:max-w-xl'>
              <WindTurbine className='w-full' imgSrc='image 1.svg' />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
