'use server'

import { db } from "@/db"
import { members, directorates } from "@/db/schema"
import { desc } from "drizzle-orm"

export async function getBirthdays() {
    try {
        const today = new Date()
        // Drizzle fetches are fast. Fetching all to maintain the existing complex logic.
        const allMembers = await db.select({ name: members.name, birthDate: members.birthDate }).from(members)

        const membersWithNextBday = allMembers.map(m => {
            const bday = new Date(m.birthDate)
            // Birthday in current year
            const currentYearBday = new Date(today.getFullYear(), bday.getMonth(), bday.getDate())

            // Calculate next birthday (future)
            let nextBday = new Date(currentYearBday)
            if (nextBday < today) {
                // If passed this year, next is next year
                nextBday.setFullYear(today.getFullYear() + 1)
            }

            return { ...m, nextBday, currentYearBday, bdayOriginal: bday }
        })

        // Sort by next birthday
        membersWithNextBday.sort((a, b) => a.nextBday.getTime() - b.nextBday.getTime())

        // Find "today" matches
        const todaysBirthdays = membersWithNextBday.filter(m =>
            m.currentYearBday.getDate() === today.getDate() &&
            m.currentYearBday.getMonth() === today.getMonth()
        )

        // Upcoming: truly in future
        const upcoming = membersWithNextBday.filter(m => m.nextBday > today).slice(0, 5)

        // Recent: passed this year (or late last year)
        const recent = allMembers
            .map(m => {
                const bday = new Date(m.birthDate)
                const currentYearBday = new Date(today.getFullYear(), bday.getMonth(), bday.getDate())
                const lastYearBday = new Date(today.getFullYear() - 1, bday.getMonth(), bday.getDate())

                // If currentYearBday is in future, use last year's. If in past, use current.
                const mostRecentBday = currentYearBday > today ? lastYearBday : currentYearBday
                return { ...m, recentBday: mostRecentBday }
            })
            .sort((a, b) => b.recentBday.getTime() - a.recentBday.getTime()) // Descending (closest past first)
            .filter(m => m.recentBday < today) // strictly past
            .slice(0, 5)

        return {
            today: todaysBirthdays,
            upcoming: upcoming,
            recent: recent
        }
    } catch (error) {
        console.error("Failed to fetch birthdays", error)
        return { today: [], upcoming: [], recent: [] }
    }
}

export async function getDirectorates() {
    try {
        return await db.query.directorates.findMany({
            with: { directors: true },
            orderBy: [desc(directorates.startYear)]
        })
    } catch (error) {
        console.error("Failed to fetch directorates", error)
        return []
    }
}
