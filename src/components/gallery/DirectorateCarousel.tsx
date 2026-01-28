'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

// Generating Static Data as requested
const generateDirectorates = () => {
    return Array.from({ length: 10 }).map((_, i) => {
        const startYear = 2024 - (i * 2)
        return {
            id: i,
            biennium: `${startYear} - ${startYear + 2}`,
            president: "Nome do Presidente",
            vicePresident: "Nome do Vice-Presidente",
            directors: Array.from({ length: 12 }).map((_, j) => `Diretor ${j + 1}: Fulano de Tal`)
        }
    })
}

const directorates = generateDirectorates()

export function DirectorateCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState(0) // -1 for left, 1 for right

    const handleNext = () => {
        setDirection(1)
        setCurrentIndex((prev) => (prev + 1) % directorates.length)
    }

    const handlePrev = () => {
        setDirection(-1)
        setCurrentIndex((prev) => (prev - 1 + directorates.length) % directorates.length)
    }

    const currentPlate = directorates[currentIndex]

    return (
        <div className="relative w-full max-w-5xl mx-auto px-4 py-12">
            <div className="flex items-center justify-center gap-4 md:gap-12">
                {/* Prev Button */}
                <button
                    onClick={handlePrev}
                    className="p-3 bg-gray-600/20 hover:bg-gray-600 text-gray-400 hover:text-white rounded-full transition-all border border-gray-600 backdrop-blur-sm z-10 shadow-lg"
                    aria-label="Anterior"
                >
                    <ChevronLeft size={32} />
                </button>

                {/* Carousel Viewport */}
                <div className="relative w-full max-w-3xl overflow-hidden min-h-[600px] perspective-1000">
                    <AnimatePresence initial={false} mode="wait" custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            initial={{ x: direction > 0 ? 300 : -300, opacity: 0, rotateY: direction > 0 ? 45 : -45 }}
                            animate={{ x: 0, opacity: 1, rotateY: 0 }}
                            exit={{ x: direction > 0 ? -300 : 300, opacity: 0, rotateY: direction > 0 ? -45 : 45 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="bg-gradient-to-br from-gray-300 via-gray-100 to-gray-400 p-1.5 rounded-lg shadow-2xl mx-auto w-full relative overflow-hidden"
                        >
                            {/* Inner Plate Content (Premium Inox Styling) */}
                            <div className="h-full w-full rounded p-8 border-[6px] border-gray-400/50 flex flex-col items-center text-center shadow-[inset_0_0_40px_rgba(0,0,0,0.2)] relative z-10 overflow-hidden"
                                style={{
                                    background: 'linear-gradient(135deg, #e0e0e0 0%, #cfcfcf 40%, #a0a0a0 50%, #e0e0e0 60%, #b0b0b0 100%)'
                                }}
                            >

                                {/* Shine Effect Overlay - Sharper and Frequent */}
                                <div className="absolute inset-0 z-20 pointer-events-none">
                                    <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white/80 to-transparent rotate-45 animate-[shine_4s_infinite_ease-in-out]"
                                        style={{ width: '50px', filter: 'blur(5px)' }}
                                    />
                                    <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white/40 to-transparent rotate-45 animate-[shine_4s_infinite_ease-in-out] delay-75"
                                        style={{ width: '150px' }}
                                    />
                                </div>

                                {/* Screws with realistic shading */}
                                {[
                                    "top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"
                                ].map((pos, i) => (
                                    <div key={i} className={`absolute ${pos} w-5 h-5 rounded-full bg-gradient-to-br from-gray-100 to-gray-600 shadow-md border border-gray-500 flex items-center justify-center`}>
                                        <div className="w-2.5 h-0.5 bg-gray-700/80 rotate-45 transform active:rotate-90 transition-transform"></div>
                                    </div>
                                ))}

                                <div className="mb-6 border-b-2 border-gray-800/20 pb-4 w-3/4 relative z-30">
                                    <h2 className="text-5xl font-black text-gray-900 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] font-serif tracking-widest">{currentPlate.biennium}</h2>
                                    <p className="text-gray-700 font-bold uppercase tracking-[0.3em] text-xs mt-2 shadow-white drop-shadow-sm">Gestão</p>
                                </div>

                                <div className="space-y-8 flex-1 w-full max-w-lg relative z-30">
                                    {/* President & Vice */}
                                    <div className="space-y-4">
                                        <div className="bg-gradient-to-r from-transparent via-gray-300/40 to-transparent p-4 rounded-lg border border-gray-500/10 shadow-sm backdrop-blur-sm">
                                            <p className="text-xs uppercase font-extrabold text-gray-600 tracking-wider mb-1">Presidente</p>
                                            <p className="text-2xl font-black text-gray-800 font-serif tracking-wide">{currentPlate.president}</p>
                                        </div>
                                        <div className="px-4">
                                            <p className="text-[10px] uppercase font-bold text-gray-600 tracking-wider">Vice-Presidente</p>
                                            <p className="text-xl font-bold text-gray-800 font-serif">{currentPlate.vicePresident}</p>
                                        </div>
                                    </div>

                                    {/* Directors Grid */}
                                    <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-left mt-6 border-t border-gray-600/20 pt-6">
                                        {currentPlate.directors.map((dir, i) => (
                                            <div key={i} className="flex items-center gap-3 text-gray-900">
                                                <div className="w-2 h-2 bg-gray-800 rounded-full shadow-sm" />
                                                <span className="text-sm font-bold font-serif">{dir}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-8 text-gray-600/60 text-xs font-mono uppercase relative z-30 font-bold tracking-widest">
                                    Patrimônio Histórico CRESSE
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Next Button */}
                <button
                    onClick={handleNext}
                    className="p-3 bg-gray-600/20 hover:bg-gray-600 text-gray-400 hover:text-white rounded-full transition-all border border-gray-600 backdrop-blur-sm z-10 shadow-lg"
                    aria-label="Próximo"
                >
                    <ChevronRight size={32} />
                </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-8">
                {directorates.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            setDirection(i > currentIndex ? 1 : -1)
                            setCurrentIndex(i)
                        }}
                        className={cn(
                            "w-3 h-3 rounded-full transition-all shadow-sm",
                            i === currentIndex ? "bg-gray-300 w-8" : "bg-gray-700 hover:bg-gray-500"
                        )}
                        aria-label={`Ir para gestão ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}
