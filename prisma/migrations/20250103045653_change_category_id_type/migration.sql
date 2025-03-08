/*
  Warnings:

  - The primary key for the `category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `category_id` on the `category` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `category_id` on the `course` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `course` DROP FOREIGN KEY `Course_category_id_fkey`;

-- AlterTable
ALTER TABLE `category` DROP PRIMARY KEY,
    MODIFY `category_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`category_id`);

-- AlterTable
ALTER TABLE `course` MODIFY `category_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`category_id`) ON DELETE SET NULL ON UPDATE CASCADE;
