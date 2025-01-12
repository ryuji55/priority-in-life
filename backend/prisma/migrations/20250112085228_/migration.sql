/*
  Warnings:

  - Added the required column `UserId` to the `Todos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todos" ADD COLUMN     "UserId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Todos" ADD CONSTRAINT "Todos_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
