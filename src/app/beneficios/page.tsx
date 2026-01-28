export default function BenefitsPage() {
    const benefits = [
        { title: "Restaurante Exclusivo", desc: "Desconto de 20% em todas as refeições." },
        { title: "Entrada Gratuita", desc: "Acesso livre em festas e shows promovidos pelo clube." },
        { title: "Academia Fitness", desc: "Mensalidade reduzida para titular e dependentes." },
        { title: "Transporte Escolar", desc: "Subsídio no transporte para escolas da região." },
        { title: "Salão de Festas", desc: "Locação com valores diferenciados." },
        { title: "Convênios", desc: "Parcerias com farmácias e lojas da cidade." }
    ];

    return (
        <div className="min-h-screen p-8 pt-20 bg-yellow-50 dark:bg-stone-950">
            <h1 className="text-4xl font-bold mb-10 text-primary">Benefícios do Sócio</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {benefits.map((b, i) => (
                    <div key={i} className="bg-white dark:bg-black p-6 rounded-lg shadow-lg border-l-4 border-yellow-500 hover:scale-105 transition-transform">
                        <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-yellow-100">{b.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{b.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
