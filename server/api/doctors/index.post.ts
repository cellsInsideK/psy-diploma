import { db } from "~/server/database/db";
import { doctors } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const res = await db.insert(doctors).values(body);
  } catch (e) {
    console.log(e)
    return {
      statusCode: 500,
      message: 'Не удалось создать врача'
    }
  }
})