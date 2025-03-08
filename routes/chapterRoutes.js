import express from 'express';
import {
  getAllChapters,
  createChapter,
  getChapter,
  updateChapter,
  deleteChapter,
  uploadCourseVideo,
  getChapterForTeacher,
  insertOrUpdateProgress,
} from './../controllers/chapterController.js';
import { protect, restrictTo } from './../controllers/authController.js';

const router = express.Router({ mergeParams: true });

router.route('/').get(getAllChapters).post(protect, createChapter);
router
  .route('/:chapterId')
  .get(protect, getChapter)
  .patch(protect, uploadCourseVideo, updateChapter)
  .delete(protect, deleteChapter);
router.route('/:chapterId/teacher').get(getChapterForTeacher);
router.route('/:chapterId/progress').put(protect, insertOrUpdateProgress);

export { router as chapterRouter };
