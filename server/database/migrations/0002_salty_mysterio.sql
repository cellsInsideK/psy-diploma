CREATE TYPE "public"."methodType" AS ENUM('КПТ', 'Гештальт-терапия', 'Психоаналитическая терапия');--> statement-breakpoint
CREATE TYPE "public"."sexType" AS ENUM('Мужчина', 'Женщина');--> statement-breakpoint
CREATE TYPE "public"."workFormatType" AS ENUM('Онлайн', 'Очно');--> statement-breakpoint
CREATE TABLE "doctors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"specialization" varchar(255) NOT NULL,
	"experience" integer NOT NULL,
	"work_format" "workFormatType" NOT NULL,
	"method" "methodType" NOT NULL,
	"bio" text,
	"sex" "sexType" NOT NULL,
	"photo_url" varchar(512),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;