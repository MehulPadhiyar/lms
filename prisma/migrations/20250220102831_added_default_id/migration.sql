/*
  Warnings:

  - The primary key for the `chapter` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `course` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `purchase` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `userprogress` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `chapter` DROP PRIMARY KEY,
    MODIFY `chapter_id` VARCHAR(250) NOT NULL DEFAULT (uuid()),
    ADD PRIMARY KEY (`chapter_id`);

-- AlterTable
ALTER TABLE `course` DROP PRIMARY KEY,
    MODIFY `course_id` VARCHAR(250) NOT NULL DEFAULT (uuid()),
    ADD PRIMARY KEY (`course_id`);

-- AlterTable
ALTER TABLE `purchase` DROP PRIMARY KEY,
    MODIFY `purchase_id` VARCHAR(250) NOT NULL DEFAULT (uuid()),
    ADD PRIMARY KEY (`purchase_id`);

-- AlterTable
ALTER TABLE `userprogress` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(250) NOT NULL DEFAULT (uuid()),
    ADD PRIMARY KEY (`id`);
