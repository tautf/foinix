/*
  Warnings:

  - Added the required column `renewalDate` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "renewalDate" TIMESTAMP(3) NOT NULL;