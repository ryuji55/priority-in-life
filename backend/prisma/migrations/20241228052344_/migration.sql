/*
  Warnings:

  - A unique constraint covering the columns `[resetPasswordToken]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "resetPasswordToken" TEXT,
ADD COLUMN     "resetPasswordTokenExpiredAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Users_resetPasswordToken_key" ON "Users"("resetPasswordToken");
