/*
  Warnings:

  - You are about to drop the column `currency` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `metadata` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `propertyId` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `altText` on the `propertyimage` table. All the data in the column will be lost.
  - You are about to drop the column `isPrimary` on the `propertyimage` table. All the data in the column will be lost.
  - You are about to drop the column `publicId` on the `propertyimage` table. All the data in the column will be lost.
  - You are about to drop the column `applicantId` on the `rentalapplication` table. All the data in the column will be lost.
  - Added the required column `userId` to the `RentalApplication` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_propertyId_fkey`;

-- DropForeignKey
ALTER TABLE `rentalapplication` DROP FOREIGN KEY `RentalApplication_applicantId_fkey`;

-- DropIndex
DROP INDEX `Payment_createdAt_idx` ON `payment`;

-- DropIndex
DROP INDEX `Payment_propertyId_idx` ON `payment`;

-- DropIndex
DROP INDEX `Property_createdAt_idx` ON `property`;

-- DropIndex
DROP INDEX `PropertyImage_isPrimary_idx` ON `propertyimage`;

-- DropIndex
DROP INDEX `RentalApplication_applicantId_idx` ON `rentalapplication`;

-- DropIndex
DROP INDEX `RentalApplication_createdAt_idx` ON `rentalapplication`;

-- DropIndex
DROP INDEX `User_createdAt_idx` ON `user`;

-- AlterTable
ALTER TABLE `payment` DROP COLUMN `currency`,
    DROP COLUMN `metadata`,
    DROP COLUMN `propertyId`,
    ADD COLUMN `applicationId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `property` ALTER COLUMN `listingType` DROP DEFAULT;

-- AlterTable
ALTER TABLE `propertyimage` DROP COLUMN `altText`,
    DROP COLUMN `isPrimary`,
    DROP COLUMN `publicId`;

-- AlterTable
ALTER TABLE `rentalapplication` DROP COLUMN `applicantId`,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `Payment_applicationId_idx` ON `Payment`(`applicationId`);

-- CreateIndex
CREATE INDEX `RentalApplication_userId_idx` ON `RentalApplication`(`userId`);

-- CreateIndex
CREATE INDEX `User_email_idx` ON `User`(`email`);

-- AddForeignKey
ALTER TABLE `RentalApplication` ADD CONSTRAINT `RentalApplication_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_applicationId_fkey` FOREIGN KEY (`applicationId`) REFERENCES `RentalApplication`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
