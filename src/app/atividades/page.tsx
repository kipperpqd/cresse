export default function ActivitiesPage() {
    const activities = [
        { name: "Escolinha de Futebol", schedule: "Ter e Qui, 09h e 15h", age: "5 a 15 anos" },
        { name: "Natação Adulto", schedule: "Seg, Qua e Sex, 19h", age: "A partir de 16 anos" },
        { name: "Natação Infantil", schedule: "Qua e Sex, 10h e 16h", age: "3 a 10 anos" },
        { name: "Beach Tennis", schedule: "Todos os dias (Agendamento)", age: "Livre" },
        { name: "Hidroginástica", schedule: "Ter e Qui, 08h", age: "Melhor idade" },
        { name: "Pilates", schedule: "Seg e Qua, 18h", age: "Adultos" }
    ];

    return (
        <div className="min-h-screen p-8 pt-20 bg-background">
            <h1 className="text-4xl font-bold mb-10 text-primary">Atividades Esportivas</h1>
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl overflow-hidden max-w-4xl mx-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-primary text-primary-foreground">
                            <th className="p-4">Atividade</th>
                            <th className="p-4">Horário</th>
                            <th className="p-4">Público</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activities.map((act, i) => (
                            <tr key={i} className="border-b border-gray-100 dark:border-gray-800 hover:bg-yellow-50 dark:hover:bg-zinc-800 transition-colors">
                                <td className="p-4 font-semibold">{act.name}</td>
                                <td className="p-4">{act.schedule}</td>
                                <td className="p-4 text-sm text-gray-500">{act.age}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
