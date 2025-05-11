import { eq } from "drizzle-orm";
import { db } from "~/server/database/db";
import { doctors } from "~/server/database/schema";
import { defineEventHandler, getRouterParam } from "#imports";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')!;

  try {
    await db.delete(doctors).where(eq(doctors.id, id));

    return {
      statusCode: 200,
      message: 'Заявка удалена'
    }
  }
  catch {
    return {
      statusCode: 500,
      message: 'Не удалось удалить заявку'
    }
  }
});
