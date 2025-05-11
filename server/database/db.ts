import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in environment variables')
}

const connectionString = process.env.DATABASE_URL
const client = postgres(connectionString, {
  prepare: false,
  ssl: {
    rejectUnauthorized: false
  }
})

export const db = drizzle(client, { schema })
