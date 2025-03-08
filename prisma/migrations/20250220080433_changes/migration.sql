-- DropForeignKey
ALTER TABLE `chapter` DROP FOREIGN KEY `Chapter_course_id_fkey`;

-- DropForeignKey
ALTER TABLE `course` DROP FOREIGN KEY `Course_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `course` DROP FOREIGN KEY `Course_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `purchase` DROP FOREIGN KEY `Purchase_course_id_fkey`;

-- DropForeignKey
ALTER TABLE `purchase` DROP FOREIGN KEY `Purchase_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `userprogress` DROP FOREIGN KEY `UserProgress_chapter_id_fkey`;

-- DropForeignKey
ALTER TABLE `userprogress` DROP FOREIGN KEY `UserProgress_user_id_fkey`;
