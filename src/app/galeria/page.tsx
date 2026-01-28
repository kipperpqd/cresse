import { DirectorateCarousel } from "@/components/gallery/DirectorateCarousel";

export default function GalleryPage() {
    return (
        <div className="min-h-screen bg-gray-950 text-yellow-500 p-8">
            <h1 className="text-4xl font-bold mb-8 text-center border-b-2 border-yellow-600 pb-4 inline-block">Galeria de Ex-Diretorias</h1>
            <p className="text-center mb-12 text-gray-400 max-w-2xl mx-auto">
                Homenagem aos que construíram a nossa história. Navegue pelas placas comemorativas das gestões passadas.
            </p>

            <div className="max-w-6xl mx-auto">
                <DirectorateCarousel />
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-sm text-gray-500">
                <div>
                    <h3 className="text-yellow-600 font-semibold mb-2">Tradição</h3>
                    <p>Respeito à hierarquia e disciplina desde 19XX.</p>
                </div>
                <div>
                    <h3 className="text-yellow-600 font-semibold mb-2">Legado</h3>
                    <p>Cada gestão deixou sua marca de progresso.</p>
                </div>
                <div>
                    <h3 className="text-yellow-600 font-semibold mb-2">Futuro</h3>
                    <p>Construindo juntos o clube que sonhamos.</p>
                </div>
            </div>
        </div>
    )
}
