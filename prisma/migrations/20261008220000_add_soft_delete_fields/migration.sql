-- Add nullable soft-delete timestamps to users and properties.
ALTER TABLE `User` ADD COLUMN `deletedAt` DATETIME(3) NULL;
ALTER TABLE `Property` ADD COLUMN `deletedAt` DATETIME(3) NULL;