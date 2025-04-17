-- CreateTable
CREATE TABLE `Sample` (
    `sample_id` VARCHAR(250) NOT NULL DEFAULT (uuid()),
    `video_url` TEXT NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`sample_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Sample` ADD CONSTRAINT `Sample_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
