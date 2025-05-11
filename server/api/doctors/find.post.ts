import { and, eq } from "drizzle-orm";
import { db } from "~/server/database/db";
import { doctors, users } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const res = await db.select().from(doctors).where(and(
      eq(doctors.method, body.type),
      eq(doctors.sex, body.sex),
      eq(doctors.workFormat, body.format)
    )).leftJoin(users, eq(users.id, doctors.userId));

    return {statusCode: 200,
      data: res}
  } catch (e) {
    console.log(e)
    return {
      statusCode: 500,
      message: 'Не удалось найти врача'
    }
  }
})