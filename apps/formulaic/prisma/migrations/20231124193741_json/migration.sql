/*
  Warnings:

  - You are about to drop the column `formId` on the `Submission` table. All the data in the column will be lost.
  - Added the required column `name` to the `Form` table without a default value. This is not possible if the table is not empty.
  - Made the column `authorId` on table `Form` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Theme" AS ENUM ('MUI', 'ANTD', 'CHAKRA', 'SEMANTIC');

-- DropForeignKey
ALTER TABLE "Form" DROP CONSTRAINT "Form_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Schema" DROP CONSTRAINT "Schema_formId_fkey";

-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_formId_fkey";

-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "theme" "Theme" NOT NULL DEFAULT 'MUI',
ALTER COLUMN "authorId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "formId",
ADD COLUMN     "schemaId" TEXT,
ALTER COLUMN "content" SET DATA TYPE JSON;

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_schemaId_fkey" FOREIGN KEY ("schemaId") REFERENCES "Schema"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schema" ADD CONSTRAINT "Schema_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE CASCADE ON UPDATE CASCADE;
