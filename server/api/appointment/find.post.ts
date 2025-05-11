import { eq } from "drizzle-orm";
import { db } from "~/server/database/db";
import { appointments, users, doctors } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {

    if (body.type === 'doctor') {
      const [doctorId] = await db.select().from(doctors).where(eq(doctors.userId, body.id));

      const withDoctorTable = await db
      .select()
      .from(appointments)
      .where(eq(appointments.doctorId, doctorId.id))
      .innerJoin(users, eq(users.id, appointments.userId))

    const res = await Promise.all(withDoctorTable.map(async (value) => {
      const [doctorInfo] = await db.select().from(users).where(eq(users.id, value.users.id));

      return {...value, doctorInfo}
      }))

      return {statusCode: 200, data: res}
    }

    else {
      const withDoctorTable = await db
        .select()
        .from(appointments)
        .where(eq(appointments.userId, body.id))
        .innerJoin(doctors, eq(doctors.id, appointments.doctorId))
      
      const res = await Promise.all(withDoctorTable.map(async (value) => {
        const [doctorInfo] = await db.select().from(users).where(eq(users.id, value.doctors.userId));
  
        return {...value, doctorInfo}
    }))
      return {statusCode: 200, data: res}

    }
  } catch {
    return {statusCode: 500, message: 'Не удалось получить записи'}
  }
})