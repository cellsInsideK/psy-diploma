import { index, integer, pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const userType = pgEnum('userType', ['admin', 'user', 'doctor'])

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  login: varchar('login').notNull(),
  email: varchar('email', {length: 50}).unique().notNull(),
  passwordHash: varchar('passwordHash', {length: 255}).notNull(),
  type: userType('type').default('user'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type SelectUsers = typeof users.$inferSelect;

export const sessions = pgTable('sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  userIdx: index('user_idx').on(table.userId),
}));

export type SelectSessions = typeof sessions.$inferSelect;

export const workFormatType = pgEnum('workFormatType', ['Онлайн', 'Очно']);
export const methodType = pgEnum('methodType', ['КПТ', 'Гештальт-терапия', 'Психоаналитическая терапия'])
export const sexType = pgEnum('sexType', ['Мужчина', 'Женщина']);

export const doctors = pgTable('doctors', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('userId').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  specialization: varchar('specialization', { length: 255 }).notNull(),
  experience: integer('experience').notNull(),
  workFormat: workFormatType('work_format').notNull(),
  method: methodType('method').notNull(),
  bio: text('bio'),
  sex: sexType('sex').notNull(),
  photoUrl: varchar('photo_url', { length: 512 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export type SelectDoctors = typeof doctors.$inferSelect;

export const feedback = pgTable('feedback', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name').notNull(),
  email: varchar('email').notNull(),
  comment: varchar('comment').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

export type SelectFeedback = typeof feedback.$inferSelect;