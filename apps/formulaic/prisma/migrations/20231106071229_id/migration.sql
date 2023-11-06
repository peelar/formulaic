/*
  Warnings:

  - The primary key for the `Schema` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Submission` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Schema" DROP CONSTRAINT "Schema_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Schema_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Schema_id_seq";

-- AlterTable
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Submission_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Submission_id_seq";
