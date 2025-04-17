import { prisma } from './../server.js';
import { AppError } from '../utils/appError.js';
import multer from 'multer';

//To parse and store video into storage coming from frontend
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'frontend/public/course/video');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `chapter-${req.params.chapterId}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('video')) {
    cb(null, true);
  } else {
    cb(new AppError('Not a video! Please upload only videos.', 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

export const uploadCourseVideo = upload.single('video');

//api/v1/courses/:courseId/chapters
export const getAllChapters = async (req, res, next) => {
  try {
    const chapters = await prisma.Chapter.findMany({
      where: {
        course: {
          course_id: req.params.courseId,
        },
      },
      orderBy: {
        position: 'asc',
      },
    });

    res.status(200).json({
      status: 'success',
      results: chapters.length,
      data: {
        chapters,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const createChapter = async (req, res, next) => {
  try {
    const courseOwner = await prisma.Course.findUnique({
      where: {
        course_id: req.params.courseId,
        user_id: req.user.user_id,
      },
    });

    if (!courseOwner) return next(new AppError('Unauthorized!', 401));

    const lastChapter = await prisma.Chapter.findFirst({
      orderBy: {
        position: 'desc',
      },
      where: {
        course_id: req.params.courseId,
      },
    });

    req.body.position = lastChapter ? lastChapter.position + 1 : 1;

    const newChapter = await prisma.Chapter.create({
      data: {
        title: req.body.title,
        course_id: req.params.courseId,
        position: req.body.position,
      },
    });

    res.status(200).json({
      status: 'success',
      data: {
        course: newChapter,
      },
    });
  } catch (err) {
    next(err);
  }
};

//api/v1/courses/:courseId/chapters/:chapterId
export const getChapter = async (req, res, next) => {
  try {
    let chapter = await prisma.Chapter.findUnique({
      where: {
        chapter_id: req.params.chapterId,
        course_id: req.params.courseId,
      },
    });

    const course = await prisma.Course.findUnique({
      where: {
        course_id: req.params.courseId,
      },
      select: {
        price: true,
      },
    });

    if (!chapter || !course) return next(new AppError('Course or Chapter not found!', 404));

    const purchase = await prisma.purchase.findUnique({
      where: {
        user_id_course_id: {
          user_id: req.user?.user_id,
          course_id: req.params.courseId,
        },
      },
    });

    const isAdmin = req.user.role === 'admin';

    if (!purchase && !chapter.isFree && !isAdmin) chapter.videoUrl = null;

    res.status(200).json({
      status: 'success',
      data: {
        chapter,
        course,
      },
    });
  } catch (err) {
    next(err);
  }
};

//api/v1/courses/:courseId/chapters/:chapteId
export const getChapterForTeacher = async (req, res, next) => {
  try {
    const chapter = await prisma.Chapter.findUnique({
      where: {
        course_id: req.params.courseId,
        chapter_id: req.params.chapterId,
      },
    });

    if (!chapter) return next(new AppError('Chapter not found!', 404));

    res.status(200).json({
      status: 'success',
      data: {
        chapter,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const updateChapter = async (req, res, next) => {
  try {
    //to check a chapter exist or not
    const chapter = await prisma.Chapter.findUnique({
      where: {
        course_id: req.params.courseId,
        chapter_id: req.params.chapterId,
      },
    });

    if (!chapter) return next(new AppError('Not found!', 404));

    //to only allow user to update a particular chapter who created it
    const courseOwner = await prisma.Course.findFirst({
      where: {
        user_id: req.user.user_id,
        course_id: req.params.courseId,
      },
    });

    if (!courseOwner) return next(new AppError('Unauthorized!', 401));

    const data = req.body;
    if (req.file) {
      data.videoUrl = req.file.filename;
    }
    const newChapter = await prisma.Chapter.update({
      where: {
        chapter_id: req.params.chapterId,
      },
      data,
    });

    res.status(200).json({
      status: 'success',
      data: {
        chapter: newChapter,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const deleteChapter = async (req, res, next) => {
  try {
    const chapter = await prisma.Chapter.findUnique({
      where: {
        course_id: req.params.courseId,
        chapter_id: req.params.chapterId,
      },
    });

    if (!chapter) return next(new AppError('Not found!', 404));

    const courseOwner = await prisma.Course.findFirst({
      where: {
        user_id: req.user.user_id,
        course_id: req.params.courseId,
      },
    });

    if (!courseOwner) return next(new AppError('Unauthorized!', 401));

    await prisma.Chapter.delete({
      where: {
        course_id: req.params.courseId,
        chapter_id: req.params.chapterId,
      },
    });
    res.status(204).json({
      status: 'success',
    });
  } catch (err) {
    next(err);
  }
};

//api/v1/courses/:courseId/chapters/:chapterId/progress
export const insertOrUpdateProgress = async (req, res, next) => {
  try {
    const data = await prisma.UserProgress.upsert({
      where: {
        user_id_chapter_id: {
          user_id: req.user.user_id,
          chapter_id: req.params.chapterId,
        },
      },
      update: {
        isCompleted: req.body.isCompleted,
      },
      create: {
        user_id: req.user.user_id,
        chapter_id: req.params.chapterId,
        isCompleted: true,
      },
    });

    res.status(200).json({
      status: 'success',
      data,
    });
  } catch (err) {
    next(err);
  }
};
