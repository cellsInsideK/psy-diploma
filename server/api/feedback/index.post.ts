import { db } from "~/server/database/db"
import { feedback } from "~/server/database/schema"

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const res = await db.insert(feedback).values(body);

    return {
      statusCode: 200,
      message: 'Заявка создана!'
    }
  } catch {
    return {
      statusCode: 500,
      message: 'Не удалось создать заявку'
    }
  }
})