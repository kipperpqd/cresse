export default function StructurePage() {
    const items = [
        { title: "Campo Futebol Society", desc: "Gramado sintético de alta qualidade." },
        { title: "Futsal", desc: "Quadra poliesportiva coberta." },
        { title: "Beach Tennis", desc: "3 quadras de areia para Beach Tennis e Vôlei." },
        { title: "Piscina Adulto e Infantil", desc: "Área de lazer aquática com segurança." },
        { title: "Jogos Infantis", desc: "Playground moderno e seguro." },
        { title: "Churrasqueiras", desc: "Área gourmet para confraternizações." },
        { title: "Restaurante", desc: "Cardápio variado com almoço e petiscos." },
        { title: "Música ao Vivo", desc: "Palco para shows e eventos nos fins de semana." }
    ];

    return (
        <div className="min-h-screen bg-background p-8 pt-20 md:pt-8 bg-yellow-50/50 dark:bg-zinc-900">
            <h1 className="text-4xl font-bold mb-8 text-primary">Nossa Estrutura</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item, i) => (
                    <div key={i} className="bg-white dark:bg-black border border-primary/20 p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
                        <div className="h-40 bg-gray-200 dark:bg-stone-800 rounded-lg mb-4 flex items-center justify-center text-muted-foreground">
                            [Foto: {item.title}]
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-yellow-600">{item.title}</h3>
                        <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
