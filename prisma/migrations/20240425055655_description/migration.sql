-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "description" SET DEFAULT 'transaction';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "description" TEXT;
