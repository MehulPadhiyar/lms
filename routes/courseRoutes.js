import express from 'express';
import {
  getAllCourses,
  createCourse,
  getCourse,
  updateCourse,
  deleteCourse,
  uploadCoursePhoto,
  getAllCoursesByInstructor,
  enroll,
  getTeacherCourse,
  getProgress,
  getDashboardCourses,
  getCourseStats,
} from './../controllers/courseController.js';
import { protect, restrictTo } from './../controllers/authController.js';

const router = express.Router();

router.route('/').get(protect, getAllCourses).post(protect, createCourse);
router.route('/dashboard').get(protect, getDashboardCourses);
router.route('/teacher').get(protect, getAllCoursesByInstructor);
router.route('/stats').get(protect, getCourseStats);
router.route('/:courseId').get(protect, getCourse).patch(protect, uploadCoursePhoto, updateCourse).delete(deleteCourse);

router.route('/teacher/:courseId').get(protect, getTeacherCourse);
router.route('/:courseId/enroll').post(protect, enroll);
router.route('/:courseId/progress').get(protect, getProgress);

export { router as courseRouter };
