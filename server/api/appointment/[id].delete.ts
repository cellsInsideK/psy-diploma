import { eq } from "drizzle-orm";
import { db } from "~/server/database/db";
import { appointments } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')!;

  try {
    await db.delete(appointments).where(eq(appointments.id, id));

    return {statusCode: 200, message: 'Запись удалена'}
  } catch (e) {
    console.log(e)
    return {statusCode: 500, message: 'Не удалось удалить запись'}
  }
})