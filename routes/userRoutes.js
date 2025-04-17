import express from 'express';
import {
  getAllUsers,
  createUser,
  checkRole,
  getAllTransactions,
  getInstructorDetails,
  getAdminStats,
  getAdminPieData,
  getAdminBarData,
  uploadSampleVideos,
  uploadSamples,
  getUsersAppliedForInstructor,
  changeRole,
} from '../controllers/userController.js';
import {
  signUp,
  uploadProfilePhoto,
  login,
  restrictTo,
  protect,
  checkUserAuth,
  forgotPassoword,
  resetPassword,
  updatePassword,
} from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', uploadProfilePhoto, signUp);
router.post('/login', login);
router.post('/authCheck', checkUserAuth);

router.post('/forgotPassword', forgotPassoword);
router.patch('/resetPassword/:resetToken', resetPassword);
router.patch('/updatePassword', protect, updatePassword);

router.route('/').get(protect, restrictTo('admin'), getAllUsers).post(createUser);

router.get('/role', checkRole);
router.patch('/:userId/role', protect, restrictTo('admin'), changeRole);
router.get('/payments', protect, restrictTo('admin'), getAllTransactions);
router.get('/instructors', protect, restrictTo('admin'), getInstructorDetails);
router.get('/admin/stats', protect, restrictTo('admin'), getAdminStats);
router.get('/admin/piedata', protect, restrictTo('admin'), getAdminPieData);
router.get('/admin/bardata', getAdminBarData);

router.post('/sample', protect, uploadSamples, uploadSampleVideos);
router.get('/sample', protect, restrictTo('admin'), getUsersAppliedForInstructor);

export { router as userRouter };
