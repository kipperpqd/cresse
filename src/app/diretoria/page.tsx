export default function DirectoratePage() {
    const directors = [
        { role: "Presidente", name: "Subtenente Silva" },
        { role: "Vice-Presidente", name: "Sargento Costa" },
        // ... add more as per requirement "12 diretorias abaixo"
    ];

    return (
        <div className="min-h-screen p-8 bg-yellow-50 dark:bg-neutral-950">
            <h1 className="text-4xl font-bold mb-10 text-center text-primary">Diretoria Atual (Biênio 2024-2025)</h1>

            <div className="flex flex-col items-center space-y-8 max-w-4xl mx-auto">
                {/* President */}
                <div className="bg-primary text-primary-foreground p-6 rounded-xl shadow-xl w-64 text-center transform scale-110 border-4 border-yellow-600">
                    <h2 className="font-bold text-xl">Presidente</h2>
                    <p className="text-lg">Subtenente Exemplo</p>
                </div>

                <div className="w-1 h-8 bg-gray-400"></div>

                {/* Vice */}
                <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-md w-64 text-center border-2 border-primary">
                    <h2 className="font-bold text-lg text-yellow-600">Vice-Presidente</h2>
                    <p>Sargento Modelo</p>
                </div>

                <div className="w-1 h-8 bg-gray-400"></div>
                <div className="w-full h-1 bg-gray-400 rounded-full"></div>

                {/* Directors Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full pt-4">
                    {Array(12).fill("Diretor").map((d, i) => (
                        <div key={i} className="bg-white dark:bg-zinc-900 p-3 rounded shadow text-center text-sm border hover:border-primary transition-colors">
                            <h3 className="font-bold text-yellow-600">Diretor {i + 1}</h3>
                            <p className="text-muted-foreground">Nome Sobrenome</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
