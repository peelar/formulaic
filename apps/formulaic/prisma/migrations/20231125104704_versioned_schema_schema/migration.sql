/*
  Warnings:

  - You are about to drop the column `authorId` on the `Schema` table. All the data in the column will be lost.
  - You are about to drop the `VersionedSchema` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `content` to the `Schema` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Schema" DROP CONSTRAINT "Schema_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Schema" DROP CONSTRAINT "Schema_formId_fkey";

-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_versionedSchemaId_fkey";

-- DropForeignKey
ALTER TABLE "VersionedSchema" DROP CONSTRAINT "VersionedSchema_schemaId_fkey";

-- DropIndex
DROP INDEX "Schema_formId_key";

-- AlterTable
ALTER TABLE "Schema" DROP COLUMN "authorId",
ADD COLUMN     "content" JSON NOT NULL,
ADD COLUMN     "userId" TEXT,
ADD COLUMN     "version" SERIAL NOT NULL,
ALTER COLUMN "formId" DROP NOT NULL;

-- DropTable
DROP TABLE "VersionedSchema";

-- AddForeignKey
ALTER TABLE "Schema" ADD CONSTRAINT "Schema_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schema" ADD CONSTRAINT "Schema_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_versionedSchemaId_fkey" FOREIGN KEY ("versionedSchemaId") REFERENCES "Schema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
