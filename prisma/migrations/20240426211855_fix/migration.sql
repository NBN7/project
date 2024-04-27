/*
  Warnings:

  - You are about to drop the column `evilVerified` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "evilVerified",
ADD COLUMN     "emailVerified" TIMESTAMP(3);
