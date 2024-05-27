-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "isForGoal" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "description" SET DEFAULT '';
