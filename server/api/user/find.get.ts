import { and, eq, notInArray,  } from "drizzle-orm";
import { db } from "~/server/database/db"
import { doctors, users } from "~/server/database/schema"

export default defineEventHandler(async () => {
  try {
    const doctorsArr = await db.select({ id: doctors.userId }).from(doctors)

    const doctorIds = doctorsArr.map(d => d.id)

    const res = await db.select()
      .from(users)
      .where(
        and(
          eq(users.type, 'doctor'),
          notInArray(users.id, doctorIds)
        )
      )

    return {
      statusCode: 200,
      data: res,
    }
  } catch {
    return {
      statusCode: 500,
      message: 'Не удалось найти пользователей'
    }
  }
})