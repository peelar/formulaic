/*
  Warnings:

  - Made the column `userId` on table `Schema` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Schema" DROP CONSTRAINT "Schema_userId_fkey";

-- AlterTable
ALTER TABLE "Schema" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Schema" ADD CONSTRAINT "Schema_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
