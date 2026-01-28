export default function EventsPage() {
    const events = [
        { date: "12 AGO", title: "Dia dos Pais no Clube", desc: "Churrasco e música ao vivo a partir das 11h." },
        { date: "07 SET", title: "Independência", desc: "Torneio de Futebol Society e almoço especial." },
        { date: "12 OUT", title: "Dia das Crianças", desc: "Brinquedos infláveis, pipoca e algodão doce liberados." },
        { date: "25 DEZ", title: "Almoço de Natal", desc: "Buffet especial para as famílias (reserva necessária)." }
    ];

    return (
        <div className="min-h-screen p-8 pt-20 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-zinc-950 dark:to-black">
            <h1 className="text-4xl font-bold mb-10 text-primary">Próximos Eventos</h1>
            <div className="space-y-6 max-w-4xl mx-auto">
                {events.map((evt, i) => (
                    <div key={i} className="flex flex-col md:flex-row bg-white dark:bg-zinc-900 rounded-xl shadow-lg overflow-hidden transition-transform hover:-translate-x-2">
                        <div className="bg-primary text-primary-foreground p-6 flex flex-col items-center justify-center min-w-[120px]">
                            <span className="text-lg font-bold uppercase">{evt.date.split(" ")[1]}</span>
                            <span className="text-4xl font-black">{evt.date.split(" ")[0]}</span>
                        </div>
                        <div className="p-6 flex-1">
                            <h3 className="text-2xl font-bold mb-2 hover:text-yellow-600 transition-colors cursor-pointer">{evt.title}</h3>
                            <p className="text-muted-foreground">{evt.desc}</p>
                            <button className="mt-4 text-sm font-semibold text-primary uppercase tracking-wide hover:underline">Saiba Mais</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
