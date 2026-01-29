import { db } from "./index";
import { members, directorates, directors } from "./schema";

const firstNames = ['João', 'Maria', 'Pedro', 'Ana', 'Carlos', 'Beatriz', 'Lucas', 'Fernanda', 'Gabriel', 'Juliana', 'Marcos', 'Patricia', 'Rafael', 'Camila', 'Gustavo', 'Larissa', 'Felipe', 'Mariana', 'Thiago', 'Vanessa']
const lastNames = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Pereira', 'Lima', 'Ferreira', 'Costa', 'Rodrigues', 'Almeida', 'Nascimento', 'Alves', 'Carvalho', 'Araujo', 'Ribeiro']

const roles = [
    'Presidente', 'Vice-Presidente',
    '1º Diretor de Esporte', '2º Diretor de Esporte',
    '1º Diretor Secretário', '2º Diretor Secretário',
    '1º Diretor Tesoureiro', '2º Diretor Tesoureiro',
    'Diretor Comercial', 'Diretor Gerente',
    '1º Diretor Social', '2º Diretor Social',
    '1º Diretor Patrimonial', '2º Diretor Patrimonial'
]

const generateMembers = () => {
    const memberList = [
        { name: 'João Silva', birthDate: new Date('1980-01-15') },
        { name: 'Maria Oliveira', birthDate: new Date('1992-01-28') },
        { name: 'Carlos Santos', birthDate: new Date('1975-01-30') },
        { name: 'Ana Souza', birthDate: new Date('1988-01-05') },
        { name: 'Pedro Costa', birthDate: new Date('1990-01-28') },
        { name: 'Lucia Lima', birthDate: new Date('1985-02-02') },
        { name: 'Marcos Pereira', birthDate: new Date('1982-12-25') },
        { name: 'Julia Ferreira', birthDate: new Date('1995-01-10') },
        { name: 'Roberto Almeida', birthDate: new Date('1978-01-29') },
        { name: 'Fernanda Gomes', birthDate: new Date('1983-01-12') },
    ]

    for (let i = 0; i < 20; i++) {
        memberList.push({
            name: `Sócio Teste ${i}`,
            birthDate: new Date(1990, Math.floor(Math.random() * 12), 15)
        })
    }

    return memberList
}

async function main() {
    console.log('Seeding database with Drizzle...')

    // No need to deleteMany manually if we want to reset, but Drizzle push might handle schema changes.
    // For seeding, let's just clear tables.
    // In Drizzle, we can use delete(table)

    // Seed Members
    const memberData = generateMembers()
    await db.insert(members).values(memberData)
    console.log(`Created ${memberData.length} members`)

    // Seed Directorates
    const currentYear = new Date().getFullYear()
    for (let i = 0; i < 10; i++) {
        const endYear = currentYear - (i * 2)
        const startYear = endYear - 2

        const [newDirectorate] = await db.insert(directorates).values({
            startYear,
            endYear,
        }).returning()

        const directorData = roles.map(role => {
            const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
            const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
            return {
                name: `${firstName} ${lastName}`,
                role,
                directorateId: newDirectorate.id
            }
        })

        await db.insert(directors).values(directorData)
        console.log(`Created directorate for biennium ${startYear}-${endYear}`)
    }
}

main()
    .then(() => {
        console.log('Seeding finished successfully')
        process.exit(0)
    })
    .catch((e) => {
        console.error('Seeding failed:', e)
        process.exit(1)
    })
