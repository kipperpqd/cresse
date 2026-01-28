import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const firstNames = ['João', 'Maria', 'Pedro', 'Ana', 'Carlos', 'Beatriz', 'Lucas', 'Fernanda', 'Gabriel', 'Juliana', 'Marcos', 'Patricia', 'Rafael', 'Camila', 'Gustavo', 'Larissa', 'Felipe', 'Mariana', 'Thiago', 'Vanessa']
const lastNames = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Pereira', 'Lima', 'Ferreira', 'Costa', 'Rodrigues', 'Almeida', 'Nascimento', 'Alves', 'Carvalho', 'Araujo', 'Ribeiro']

// Helper to generate random date
function randomDate(start: Date, end: Date) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Generate 50 members
// Generate members with focus on Jan 2026
const generateMembers = () => {
    const members = [
        // Testing Jan 2026 logic
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

    // Add some random fillers
    for (let i = 0; i < 20; i++) {
        members.push({
            name: `Sócio Teste ${i}`,
            birthDate: new Date(1990, Math.floor(Math.random() * 12), 15)
        })
    }

    return members
}

const roles = [
    'Presidente', 'Vice-Presidente',
    '1º Diretor de Esporte', '2º Diretor de Esporte',
    '1º Diretor Secretário', '2º Diretor Secretário',
    '1º Diretor Tesoureiro', '2º Diretor Tesoureiro',
    'Diretor Comercial', 'Diretor Gerente',
    '1º Diretor Social', '2º Diretor Social',
    '1º Diretor Patrimonial', '2º Diretor Patrimonial'
]

async function main() {
    console.log('Seeding database...')

    // Clear existing
    await prisma.director.deleteMany()
    await prisma.directorate.deleteMany()
    await prisma.member.deleteMany()

    // Seed Members
    const members = generateMembers()
    for (const member of members) {
        await prisma.member.create({ data: member })
    }
    console.log(`Created ${members.length} members`)

    // Seed Directorates (10 biennia)
    const currentYear = new Date().getFullYear()
    for (let i = 0; i < 10; i++) {
        const endYear = currentYear - (i * 2)
        const startYear = endYear - 2

        const directors = roles.map(role => {
            const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
            const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
            return {
                name: `${firstName} ${lastName}`,
                role
            }
        })

        await prisma.directorate.create({
            data: {
                startYear,
                endYear,
                directors: {
                    create: directors
                }
            }
        })
        console.log(`Created directorate for biennium ${startYear}-${endYear}`)
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
