import { eq } from "drizzle-orm";
import { db } from "~/server/database/db";
import { appointments } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')!;
  const body = await readBody(event);
  const parsedDateTime = new Date(body.date)

  try {
    const app = await db.select().from(appointments).where(eq(appointments.doctorId, id));
    let same = false;

    app.forEach((val) => {
      const time = +val.time.split(':')[0] - +body.time.split(':')[0]
      if (val.date.getTime() === parsedDateTime.getTime() && val.time === body.time) {
        return same = true
      }
      else if (val.date.getTime() === parsedDateTime.getTime() && time === 0) {
        return same = true
      }
    })

    if (same) {
        return {
        statusCode: 500,
        message: 'Запись с такой датой и временем уже существует'
      }
    }

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