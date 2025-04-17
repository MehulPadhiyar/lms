-- AlterTable
ALTER TABLE `course` ADD COLUMN `status` ENUM('draft', 'pending', 'verified', 'rejected') NOT NULL DEFAULT 'draft';
