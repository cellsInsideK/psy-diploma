ALTER TABLE "appointments" DROP CONSTRAINT "appointments_doctorId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_doctorId_doctors_id_fk" FOREIGN KEY ("doctorId") REFERENCES "public"."doctors"("id") ON DELETE cascade ON UPDATE no action;