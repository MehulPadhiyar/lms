-- CreateTable
CREATE TABLE `User` (
    `user_id` VARCHAR(250) NOT NULL DEFAULT (uuid()),
    `name` VARCHAR(45) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `password` VARCHAR(250) NOT NULL,
    `photo` VARCHAR(45) NULL,
    `role` ENUM('user', 'instructor', 'admin') NOT NULL DEFAULT 'user',
    `active` TINYINT NULL DEFAULT 1,
    `password_reset_token` VARCHAR(250) NULL,
    `password_reset_expires` BIGINT NULL,

    UNIQUE INDEX `email_UNIQUE`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Course` (
    `course_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `title` TEXT NOT NULL,
    `description` TEXT NULL,
    `image_url` TEXT NULL,
    `price` DOUBLE NULL,
    `isPublished` BOOLEAN NOT NULL DEFAULT false,
    `category_id` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `Course_user_id_idx`(`user_id`),
    INDEX `Course_category_id_idx`(`category_id`),
    FULLTEXT INDEX `Course_title_idx`(`title`),
    PRIMARY KEY (`course_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `category_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Category_name_key`(`name`),
    PRIMARY KEY (`category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Chapter` (
    `chapter_id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `videoUrl` TEXT NULL,
    `position` INTEGER NOT NULL,
    `isPublished` BOOLEAN NOT NULL DEFAULT false,
    `isFree` BOOLEAN NOT NULL DEFAULT false,
    `course_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `Chapter_course_id_idx`(`course_id`),
    PRIMARY KEY (`chapter_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`category_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chapter` ADD CONSTRAINT `Chapter_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `Course`(`course_id`) ON DELETE CASCADE ON UPDATE CASCADE;
