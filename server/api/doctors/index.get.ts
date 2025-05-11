import { eq } from "drizzle-orm"
import { db } from "~/server/database/db"
import { doctors, users } from "~/server/database/schema"

export default defineEventHandler(async (event) => {
  try {
    const res = await db.select().from(doctors).leftJoin(users, eq(users.id, doctors.userId))

    return {statusCode: 200, data: res}
  } catch {
    return {statusCode: 500, message: 'Неудалось получить врачей'}
  }
})