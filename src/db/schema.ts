import { sql, relations } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const members = sqliteTable("members", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    birthDate: integer("birth_date", { mode: "timestamp" }).notNull(),
    category: text("category").notNull().default("Sócio"),
    createdAt: integer("created_at", { mode: "timestamp" })
        .notNull()
        .default(sql`(unixepoch())`),
});

export const directorates = sqliteTable("directorates", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    startYear: integer("start_year").notNull(),
    endYear: integer("end_year").notNull(),
});

export const directors = sqliteTable("directors", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    role: text("role").notNull(),
    directorateId: integer("directorate_id")
        .notNull()
        .references(() => directorates.id, { onDelete: "cascade" }),
});

export const directoratesRelations = relations(directorates, ({ many }) => ({
    directors: many(directors),
}));

export const directorsRelations = relations(directors, ({ one }) => ({
    directorate: one(directorates, {
        fields: [directors.directorateId],
        references: [directorates.id],
    }),
}));
