/*
  Warnings:

  - You are about to drop the column `description` on the `Goal` table. All the data in the column will be lost.
  - You are about to alter the column `title` on the `Goal` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(32)`.

*/
-- AlterTable
ALTER TABLE "Goal" DROP COLUMN "description",
ALTER COLUMN "title" SET DEFAULT 'Goal',
ALTER COLUMN "title" SET DATA TYPE VARCHAR(32);
