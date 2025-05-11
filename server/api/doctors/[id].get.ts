import { eq } from "drizzle-orm";
import { db } from "~/server/database/db";
import { doctors, users } from "~/server/database/schema";
import { defineEventHandler, getRouterParam } from "#imports";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')!;

  try {
      const [res] = await db.select().from(doctors).where(eq(doctors.id, id!)).leftJoin(users, eq(users.id, doctors.userId));
  
      return {statusCode: 200,
        data: res}
    } catch (e) {
      console.log(e)
      return {
        statusCode: 500,
        message: 'Не удалось найти врача'
      }
    }
});
