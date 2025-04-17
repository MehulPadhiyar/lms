import { prisma } from './../server.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/appError.js';
import validator from 'validator';
import crypto from 'crypto';
import sendEmail from './../utils/email.js';
import multer from 'multer';

const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
};

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN });
};

const checkPassword = async (userPassword, hashedPassword) => {
  return await bcrypt.compare(userPassword, hashedPassword);
};

//To parse and store image into storage coming from frontend
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'frontend/public/user');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `profile-${req.body.email}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

export const uploadProfilePhoto = upload.single('photo');

export const signUp = async (req, res, next) => {
  try {
    req.body.password = await hashPassword(req.body.password);

    //To validate email
    if (!validator.isEmail(req.body.email)) return next(new AppError('Please enter a valid email', 400));

    //Temporary solution for password validation
    // if (req.body.password.length < 8) return next(new AppError('Password must be greater than 8 characters!'));

    const newUser = await prisma.User.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        photo: req.body.photo,
        role: req.body.role,
        photo: req.file.filename,
      },
    });

    //to generate jwt token
    const token = signToken(newUser.user_id);

    res.cookie('jwt', token, {
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    console.log('JHuhuihiui');
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return next(new AppError('Please provide email and password!', 400));

    const user = await prisma.User.findUnique({
      omit: {
        password: false,
      },
      where: {
        email,
      },
    });

    //To check if user exist and password is correct
    if (!user || !(await checkPassword(password, user.password)))
      return next(new AppError('Incorrect email or password!', 401));

    const token = signToken(user.user_id);

    res.cookie('jwt', token, {
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });

    res.status(200).json({
      status: 'success',
      token,
    });
  } catch (err) {
    next(err);
  }
};

//middleware to give access to only authenticate user
export const protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) return next(new AppError('You are not logged in! Please log in to get access.', 401));

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await prisma.User.findUnique({
      where: {
        user_id: decoded.id,
      },
    });

    if (!user) return next(new AppError('User belonging to this token no longer exist.', 401));

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

export const checkUserAuth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) return next(new AppError('You are not logged in! Please log in to get access.', 401));

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await prisma.User.findUnique({
      where: {
        user_id: decoded.id,
      },
    });

    if (!user) return next(new AppError('User no longer exist.', 401));

    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    next(err);
  }
};

//middleware to give role based access
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  };
};

export const forgotPassoword = async (req, res, next) => {
  try {
    const user = await prisma.User.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (!user) return next(new AppError('No user with email address!', 400));

    const token = await prisma.user.createPasswordResetToken(user);

    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${token}`;

    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}\nIf you didn't forget your password, please ignore this email!`;

    try {
      await sendEmail({
        address: user.email,
        subject: 'Your password reset token (valid for 10 min)',
        message,
      });

      res.status(200).json({
        status: 'success',
        message: 'Token sent to email!',
      });
    } catch (err) {
      //to reset password_reset_token and password_reset_expires to null
      await prisma.User.update({
        where: {
          email: user.email,
        },
        data: {
          password_reset_token: null,
          password_reset_expires: null,
        },
      });

      next(new AppError('There was an error in sending email. Try again later!', 500));
    }
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const hashedToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');

    const user = await prisma.User.findFirst({
      where: {
        password_reset_token: hashedToken,
        password_reset_expires: {
          gt: parseInt(Date.now()),
        },
      },
    });

    if (!user) return next(new AppError('invalid token or expires', 404));

    req.body.password = await hashPassword(req.body.password);

    await prisma.User.update({
      where: {
        email: user.email,
      },
      data: {
        password: req.body.password,
      },
    });

    //to reset password_reset_token and password_reset_expires to null
    await prisma.User.update({
      where: {
        email: user.email,
      },
      data: {
        password_reset_token: null,
        password_reset_expires: null,
      },
    });

    const token = signToken(user.user_id);

    res.status(200).json({
      status: 'success',
      token,
      message: 'Password reset successfully!',
    });
  } catch (err) {
    next(err);
  }
};

export const updatePassword = async (req, res, next) => {
  try {
    const user = await prisma.User.findUnique({
      omit: {
        password: false,
      },
      where: {
        email: req.user.email,
      },
    });

    if (!(await checkPassword(req.body.currentPassword, user.password))) {
      return next(new AppError('Your current passoword is wrong!', 401));
    }

    const hashedPassword = await hashPassword(req.body.password);

    await prisma.User.update({
      where: {
        email: user.email,
      },
      data: {
        password: hashedPassword,
      },
    });

    res.status(200).json({
      status: 'success',
      message: 'Password update successfully!',
    });
  } catch (err) {
    next(err);
  }
};
