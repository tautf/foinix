/*
  Warnings:

  - You are about to drop the column `supplierId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_supplierId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "supplierId",
ADD COLUMN     "replacedById" INTEGER;

-- AlterTable
ALTER TABLE "ProductType" ADD COLUMN     "icon" TEXT;
