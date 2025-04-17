import express from 'express';
import { userRouter } from './routes/userRoutes.js';
import { courseRouter } from './routes/courseRoutes.js';
import { chapterRouter } from './routes/chapterRoutes.js';

import GlobalErrorHandler from './controllers/errorController.js';

import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
// app.use(cors({ origin: 'https://w6jrn77q-5173.inc1.devtunnels.ms', credentials: true }));

//This middleware is used to parse incoming req body into object
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/courses', courseRouter);
app.use('/api/v1/courses/:courseId/chapters', chapterRouter);

app.use(GlobalErrorHandler);

export { app };
