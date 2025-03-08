import { Prisma } from '@prisma/client';
import { AppError } from '../utils/appError.js';

const handlePrismaError = (err) => {
  switch (err.code) {
    case 'P2002':
      // handling duplicate key errors
      return new AppError(`Duplicate field value: ${err.meta.target}`, 400);
    case 'P2014':
      // handling invalid id errors
      return new AppError(`Invalid ID: ${err.meta.target}`, 400);
    case 'P2003':
      // handling invalid data errors
      return new AppError(`Invalid input data: ${err.meta.target}`, 400);
    default:
      // handling all other errors
      return new AppError(`Something went wrong: ${err.message}`, 500);
  }
};

const sendError = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming or other unknown error: don't leak error details
  } else {
    // 1) Log error
    console.error('ERROR 💥', err);

    // 2) Send generic message
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  let error = Object.assign(err);

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    error = handlePrismaError(error);
    console.log(error);
  }

  sendError(error, res);
};
