import { db } from "~/server/database/db";
import { appointments } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')!;
  const body = await readBody(event);
  const parsedDateTime = new Date(body.date)

  try {
    const res = await db.insert(appointments).values({
      userId: body.userId,
      doctorId: id,
      themes: body.themes,
      date: parsedDateTime,
      time: body.time
    });

    return {
      statusCode: 200,
      message: 'Запись создана!'
    }
  } catch (e) {
    console.log(e)
    return {
      statusCode: 500,
      message: 'Не удалось записаться на прием'
    }
  }
})