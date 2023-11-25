/*
  Warnings:

  - You are about to drop the column `content` on the `Schema` table. All the data in the column will be lost.
  - You are about to drop the column `schemaId` on the `Submission` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Schema` table without a default value. This is not possible if the table is not empty.
  - Added the required column `versionedSchemaId` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_schemaId_fkey";

-- AlterTable
ALTER TABLE "Schema" DROP COLUMN "content",
ADD COLUMN     "authorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "schemaId",
ADD COLUMN     "versionedSchemaId" TEXT NOT NULL,
ALTER COLUMN "content" SET DATA TYPE JSONB;

-- CreateTable
CREATE TABLE "VersionedSchema" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" JSON NOT NULL,
    "schemaId" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "VersionedSchema_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VersionedSchema_schemaId_key" ON "VersionedSchema"("schemaId");

-- AddForeignKey
ALTER TABLE "Schema" ADD CONSTRAINT "Schema_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VersionedSchema" ADD CONSTRAINT "VersionedSchema_schemaId_fkey" FOREIGN KEY ("schemaId") REFERENCES "Schema"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_versionedSchemaId_fkey" FOREIGN KEY ("versionedSchemaId") REFERENCES "VersionedSchema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
