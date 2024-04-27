/*
  Warnings:

  - You are about to alter the column `description` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(32)`.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "evilVerified" TIMESTAMP(3),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(32);
