'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getBirthdays } from '@/app/actions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface BirthdayMember {
    name: string
    birthDate: Date
}

export function BirthdayCard() {
    const [data, setData] = useState<{ today: any[], upcoming: any[], recent: any[] } | null>(null)

    useEffect(() => {
        getBirthdays().then(setData)
    }, [])

    if (!data) return <div className="p-4 text-center">Carregando aniversariantes...</div>

    return (
        <Card className="w-full max-w-md mx-auto bg-white/90 dark:bg-black/80 backdrop-blur-md shadow-xl border-primary/50">
            <CardHeader className="bg-primary text-primary-foreground py-3 rounded-t-lg">
                <CardTitle className="text-center text-lg flex items-center justify-center gap-2">
                    🎉 Aniversariantes 🎉
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
                {/* 5 Last */}
                <div className="space-y-1 opacity-70 text-sm">
                    <p className="font-semibold text-xs uppercase tracking-wider text-muted-foreground text-center">Passados</p>
                    {data.recent.length === 0 && <p className="text-center text-xs">-</p>}
                    {/* Placeholder Logic: if seed failed, this is empty */}
                    {data.recent.map((m: any, i: number) => (
                        <div key={i} className="flex justify-between">
                            <span>{m.name}</span>
                            <span>{new Date(m.birthDate).getDate()}/{new Date(m.birthDate).getMonth() + 1}</span>
                        </div>
                    ))}
                </div>

                {/* Today */}
                <div className="py-2 border-y-2 border-primary/20 bg-primary/5 rounded-lg px-2 shadow-inner">
                    <p className="font-bold text-center text-primary mb-1">HOJE</p>
                    {data.today.length === 0 ? (
                        <p className="text-center text-sm italic py-1">Nenhum aniversariante hoje</p>
                    ) : (
                        data.today.map((m: any, i: number) => (
                            <motion.div
                                key={i}
                                initial={{ scale: 0.9 }} animate={{ scale: 1 }}
                                className="flex justify-between font-bold text-lg"
                            >
                                <span>{m.name}</span>
                                <span>🎈</span>
                            </motion.div>
                        ))
                    )}
                </div>

                {/* 5 Next */}
                <div className="space-y-1 text-sm">
                    <p className="font-semibold text-xs uppercase tracking-wider text-muted-foreground text-center">Próximos</p>
                    {data.upcoming.length === 0 && <p className="text-center text-xs">-</p>}
                    {data.upcoming.map((m: any, i: number) => (
                        <div key={i} className="flex justify-between">
                            <span>{m.name}</span>
                            <span>{new Date(m.birthDate).getDate()}/{new Date(m.birthDate).getMonth() + 1}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
