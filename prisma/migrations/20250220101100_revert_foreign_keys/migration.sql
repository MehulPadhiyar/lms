-- AddForeignKey
ALTER TABLE `Chapter` ADD CONSTRAINT `Chapter_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `Course`(`course_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`category_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Purchase` ADD CONSTRAINT `Purchase_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `Course`(`course_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Purchase` ADD CONSTRAINT `Purchase_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserProgress` ADD CONSTRAINT `UserProgress_chapter_id_fkey` FOREIGN KEY (`chapter_id`) REFERENCES `Chapter`(`chapter_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserProgress` ADD CONSTRAINT `UserProgress_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
