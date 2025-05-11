import { eq } from "drizzle-orm"
import { db } from "~/server/database/db"
import { users, appointments, doctors } from "~/server/database/schema"

export default defineEventHandler(async () => {

  try {
    const withDoctorTable = await db
      .select()
      .from(appointments)
      .innerJoin(users, eq(users.id, appointments.userId))
      .innerJoin(doctors, eq(doctors.id, appointments.doctorId))

    const res = await Promise.all(withDoctorTable.map(async (value) => {
      const [doctorInfo] = await db.select().from(users).where(eq(users.id, value.doctors.userId));

      return {...value, doctorInfo}
    }))

    return {statusCode: 200, data: res}
  } catch (e) {
    return {statusCode: 500, message: 'Не удалось получить записи'}
  }
  
})