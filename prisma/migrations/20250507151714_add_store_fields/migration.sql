/*
  Warnings:

  - Added the required column `address` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regionId` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `store` ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `categoryId` INTEGER NOT NULL,
    ADD COLUMN `regionId` INTEGER NOT NULL,
    MODIFY `name` VARCHAR(191) NOT NULL;
