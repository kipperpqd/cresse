'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Home, Info, Heart, Users, Calendar, Image as ImageIcon, Award } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

const menuItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Estrutura', href: '/estrutura', icon: ImageIcon },
    { name: 'Benefícios', href: '/beneficios', icon: Heart },
    { name: 'Atividades', href: '/atividades', icon: Award },
    { name: 'Diretoria', href: '/diretoria', icon: Users },
    { name: 'Eventos', href: '/eventos', icon: Calendar },
    { name: 'Galeria', href: '/galeria', icon: Award }, // Icon placeholder
]

export function VerticalMenu() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {/* Mobile Trigger */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 left-4 z-50 p-2 bg-primary text-primary-foreground rounded-full md:hidden shadow-lg"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar Container */}
            <aside
                className={cn(
                    "fixed top-0 left-0 h-full w-64 bg-secondary text-secondary-foreground shadow-xl z-40 transition-transform duration-300 md:translate-x-0 border-r-4 border-primary",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex flex-col h-full p-6">
                    <div className="mb-10 text-center">
                        <h1 className="text-2xl font-bold text-primary">CRESSE</h1>
                        <p className="text-xs text-secondary-foreground/70">Clube dos Subtenentes e Sargentos do Exército</p>
                    </div>

                    <nav className="flex-1 space-y-4">
                        {menuItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors group"
                            >
                                <item.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        ))}
                    </nav>

                    <footer className="mt-auto text-center text-xs text-secondary-foreground/50">
                        &copy; {new Date().getFullYear()} | 2º Sgt Kipper | Diretor TI
                    </footer>
                </div>
            </aside>

            {/* Overlay for mobile */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
                    />
                )}
            </AnimatePresence>
        </>
    )
}
