/*
  Warnings:

  - Made the column `dueDate` on table `Goal` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Goal" ALTER COLUMN "dueDate" SET NOT NULL;
