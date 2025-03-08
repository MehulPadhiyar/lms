import { prisma } from './../server.js';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/appError.js';

export const getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).json({
    status: 'success',
    users,
  });
};

export const createUser = async (req, res) => {
  const user = await prisma.user.create({
    data: req.body,
  });
  res.status(201).json({
    status: 'success',
    user,
  });
};

export const isTeacher = async (req, res, next) => {
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

    const isTeacher = user.role === 'instructor';

    res.status(200).json({
      status: 'success',
      data: {
        isTeacher,
      },
    });
  } catch (err) {
    next(err);
  }
};
