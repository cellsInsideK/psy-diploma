import { eq } from "drizzle-orm";
import { db } from "~/server/database/db";
import { appointments } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')!;

  try {
    await db.delete(appointments).where(eq(appointments.id, id));
  } catch (e) {
    return {statusCode: 500, message: 'Не удалось удалить запись'}
  }
})