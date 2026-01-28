import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

// Manually parse .env because tsx/prisma might not be loading it correctly in this context
const envPath = path.resolve(__dirname, '../.env')
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf-8')
    envConfig.split('\n').forEach(line => {
        const [key, value] = line.split('=')
        if (key && value) {
            process.env[key.trim()] = value.trim()
        }
    })
}

// Ensure we have a URL
const databaseUrl = process.env.DATABASE_URL || "file:./dev.db"

console.log("Using Database URL:", databaseUrl)

const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL || "file:./dev.db"
})

async function main() {
    console.log('Starting manual seed...')

    // Cleanup
    try {
        await prisma.director.deleteMany()
        await prisma.directorate.deleteMany()
        await prisma.member.deleteMany()
        console.log("Cleaned up existing data.")
    } catch (e) {
        console.log("Cleanup failed (might be first run):", e)
    }

    // CREATE BIRTHDAYS - JAN 2026 FOCUS
    const members = [
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

    // Fillers
    for (let i = 0; i < 20; i++) {
        members.push({
            name: `Sócio Teste ${i}`,
            birthDate: new Date(1990, Math.floor(Math.random() * 12), 15)
        })
    }

    for (const member of members) {
        await prisma.member.create({ data: member })
    }
    console.log(`Created ${members.length} members.`)

    // CREATE DIRECTORATES (Just placeholders for the carousel to be valid)
    const directorate = await prisma.directorate.create({
        data: {
            startYear: 2024,
            endYear: 2026,
            directors: {
                create: [
                    { name: 'Presidente Exemplo', role: 'Presidente' },
                    { name: 'Vice Exemplo', role: 'Vice-Presidente' }
                ]
            }
        }
    })
    console.log("Created sample directorate.")
}

main()
    .then(async () => {
        await prisma.$disconnect()
        console.log("Seed completed successfully.")
    })
    .catch(async (e) => {
        console.error("Seed failed:", e)
        await prisma.$disconnect()
        process.exit(1)
    })
