-- CreateTable
CREATE TABLE `UserProgress` (
    `id` VARCHAR(191) NOT NULL,
    `chapter_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `isCompleted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `UserProgress_chapter_id_idx`(`chapter_id`),
    UNIQUE INDEX `UserProgress_user_id_chapter_id_key`(`user_id`, `chapter_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserProgress` ADD CONSTRAINT `UserProgress_chapter_id_fkey` FOREIGN KEY (`chapter_id`) REFERENCES `Chapter`(`chapter_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserProgress` ADD CONSTRAINT `UserProgress_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
