import { db } from "~/server/database/db"
import { defineEventHandler } from "#imports";

export default defineEventHandler(async (event) => {
  try {
    const res = await db.query.feedback.findMany();

    return {
      statusCode: 200,
      data: res
    }
  } catch {
    return {
      statusCode: 500,
      message: 'Не удалось получить данные'
    }
  }
})