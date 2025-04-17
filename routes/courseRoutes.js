import express from 'express';
import {
  getAllCourses,
  createCourse,
  getCourse,
  updateCourse,
  updateStatus,
  deleteCourse,
  uploadCoursePhoto,
  getAllCoursesByInstructor,
  getAllCoursesForAdmin,
  enroll,
  getTeacherCourse,
  getProgress,
  getDashboardCourses,
  getCourseStats,
  getTop3Courses,
  createOrder,
  getCertificateData,
} from './../controllers/courseController.js';
import { protect, restrictTo } from './../controllers/authController.js';

const router = express.Router();

router.route('/').get(protect, getAllCourses).post(protect, createCourse);
router.route('/top-3').get(getTop3Courses);
router.route('/dashboard').get(protect, getDashboardCourses);
router.route('/teacher').get(protect, getAllCoursesByInstructor);
router.route('/admin').get(protect, restrictTo('admin'), getAllCoursesForAdmin);
router.route('/stats').get(protect, getCourseStats);
router.route('/:courseId').get(protect, getCourse).patch(protect, uploadCoursePhoto, updateCourse).delete(deleteCourse);
router.route('/:courseId/updateStatus').patch(protect, restrictTo('admin'), updateStatus);

router.route('/teacher/:courseId').get(protect, getTeacherCourse);
router.route('/:courseId/enroll').post(protect, restrictTo('user', 'instructor'), enroll);
router.route('/:courseId/order').post(protect, restrictTo('user', 'instructor'), createOrder);
router.route('/:courseId/progress').get(protect, getProgress);

router.route('/certificate/:courseId').get(protect, getCertificateData);

export { router as courseRouter };
