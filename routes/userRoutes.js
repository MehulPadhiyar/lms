import express from 'express';
import { getAllUsers, createUser, isTeacher } from '../controllers/userController.js';
import {
  signUp,
  login,
  restrictTo,
  protect,
  checkUserAuth,
  forgotPassoword,
  resetPassword,
  updatePassword,
} from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/authCheck', checkUserAuth);

router.post('/forgotPassword', forgotPassoword);
router.patch('/resetPassword/:resetToken', resetPassword);
router.patch('/updatePassword', protect, updatePassword);

router.route('/').get(getAllUsers).post(createUser);

router.get('/isTeacher', isTeacher);

export { router as userRouter };
