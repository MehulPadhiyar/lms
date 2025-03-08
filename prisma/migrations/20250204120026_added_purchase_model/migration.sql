-- CreateTable
CREATE TABLE `Purchase` (
    `purchase_id` VARCHAR(191) NOT NULL,
    `course_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `Purchase_course_id_idx`(`course_id`),
    UNIQUE INDEX `Purchase_user_id_course_id_key`(`user_id`, `course_id`),
    PRIMARY KEY (`purchase_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Purchase` ADD CONSTRAINT `Purchase_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `Course`(`course_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Purchase` ADD CONSTRAINT `Purchase_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
