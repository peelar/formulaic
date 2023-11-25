/*
  Warnings:

  - You are about to drop the column `versionedSchemaId` on the `Submission` table. All the data in the column will be lost.
  - Added the required column `schemaId` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_versionedSchemaId_fkey";

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "versionedSchemaId",
ADD COLUMN     "schemaId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_schemaId_fkey" FOREIGN KEY ("schemaId") REFERENCES "Schema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
