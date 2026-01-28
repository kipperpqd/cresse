import { BirthdayCard } from "@/components/home/BirthdayCard";
import { ParallaxSection } from "@/components/home/ParallaxSection";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-0 pb-20">
      {/* Hero Section */}
      <ParallaxSection
        backgroundImage="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2070&auto=format&fit=crop"
        className="h-screen"
      >
        <div className="text-center text-white p-8 bg-black/30 backdrop-blur-sm rounded-xl border border-white/20 shadow-2xl animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-lg text-primary">CRESSE</h1>
          <p className="text-xl md:text-2xl font-light mb-8 max-w-lg mx-auto">Lazer, Esporte e Tradição para a Família Militar.</p>
          <Link href="/estrutura" className="bg-primary hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-full transition-all hover:scale-105 inline-flex items-center gap-2">
            Conheça Nossa Estrutura <ArrowRight size={20} />
          </Link>
        </div>
      </ParallaxSection>

      {/* Main Content Info Grid */}
      <ParallaxSection backgroundImage="https://images.unsplash.com/photo-1540497077202-0c89652d572c?q=80&w=2070&auto=format&fit=crop">
        {/* Adjusted spacing: wider container, flexible side columns */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_1.5fr] gap-4 w-full max-w-[95%] mx-auto px-4 items-start relative z-20 pt-16">

          {/* Left: Benefits */}
          <div className="bg-white/95 dark:bg-black/95 p-8 rounded-2xl shadow-xl hover:-translate-y-2 transition-transform duration-300 border-l-8 border-primary h-full flex flex-col justify-center">
            <h2 className="text-2xl font-light mb-4 text-primary">Benefícios Exclusivos</h2>
            <ul className="space-y-3 font-light text-gray-700 dark:text-gray-300">
              {[
                "Desconto no Restaurante",
                "Entrada Gratuita em Eventos",
                "Academia com Desconto",
                "Ônibus Escolar para Filhos"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm md:text-base">
                  <span className="text-green-500 font-bold">✓</span> {item}
                </li>
              ))}
            </ul>
            <Link href="/beneficios" className="block mt-6 text-primary font-bold hover:underline text-sm">Saiba mais &rarr;</Link>
          </div>

          {/* Center: Birthday Card (Floating higher) */}
          <div className="lg:-mt-12 order-first lg:order-none z-30">
            <BirthdayCard />
          </div>

          {/* Right: Sports */}
          <div className="bg-white/95 dark:bg-black/95 p-8 rounded-2xl shadow-xl hover:-translate-y-2 transition-transform duration-300 border-r-8 border-primary h-full flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4 text-primary">Esportes & Lazer</h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300 text-sm md:text-base">
              Estrutura completa com Piscina, Campo Society, Beach Tennis e Churrasqueiras para o seu final de semana.
            </p>
            <Link href="/estrutura" className="bg-secondary text-secondary-foreground py-2 px-6 rounded-lg font-semibold hover:bg-black/80 transition-colors inline-block w-full text-center">
              Ver Fotos e Reservas
            </Link>
          </div>

        </div>
      </ParallaxSection>

      {/* Call to Action Gallery */}
      <div className="bg-primary text-primary-foreground py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Nossa História</h2>
          <p className="text-xl mb-8">Conheça as diretorias que construíram o legado do nosso clube.</p>
          <Link href="/galeria" className="bg-black text-white font-bold py-4 px-10 rounded-full hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl">
            Visitar Galeria Virtual 3D
          </Link>
        </div>
      </div>
    </div>
  );
}
