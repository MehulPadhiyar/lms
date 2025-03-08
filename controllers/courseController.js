import { prisma } from './../server.js';
import { AppError } from '../utils/appError.js';
import multer from 'multer';

//To parse and store image into storage coming from frontend
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'frontend/public/course/img');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `course-${req.params.courseId}-${Date.now()}.${ext}`);
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

export const uploadCoursePhoto = upload.single('photo');

//api/v1/courses
export const getAllCourses = async (req, res, next) => {
  try {
    const unfilteredCourses = await prisma.Course.findMany({
      where: {
        isPublished: true,
        ...(req.query.categoryId && { category_id: +req.query.categoryId }),
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            chapter_id: true,
          },
          orderBy: {
            position: 'asc',
          },
        },
        _count: {
          select: {
            chapters: {
              where: {
                isPublished: true,
              },
            },
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    const results = await unfilteredCourses.map(async (course) => {
      const purchase = await prisma.Purchase.findUnique({
        where: {
          user_id_course_id: {
            course_id: course.course_id,
            user_id: req.user.user_id,
          },
        },
      });

      if (!purchase) return course;

      return { ...course, isEnrolled: true };
    });

    const courses = await Promise.all(results);

    courses.sort((a, b) => {
      if (a.isEnrolled && b.isEnrolled === undefined) return -1;
      if (a.isEnrolled === undefined && b.isEnrolled) return 1;

      return 0;
    });

    res.status(200).json({
      status: 'success',
      results: courses.length,
      data: {
        courses,
      },
    });
  } catch (err) {
    next(err);
  }
};

//api/v1/courses/teacher
export const getAllCoursesByInstructor = async (req, res, next) => {
  try {
    const courses = await prisma.Course.findMany({
      where: {
        user_id: req.user.user_id,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    res.status(200).json({
      status: 'success',
      results: courses.length,
      data: {
        courses,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const createCourse = async (req, res, next) => {
  try {
    const newCourse = await prisma.Course.create({
      data: {
        title: req.body.title,
        user_id: req.user.user_id,
      },
    });

    res.status(200).json({
      status: 'success',
      data: {
        course: newCourse,
      },
    });
  } catch (err) {
    next(err);
  }
};

//api/v1/courses/:courseId

export const getCourse = async (req, res, next) => {
  try {
    const course = await prisma.Course.findUnique({
      where: {
        course_id: req.params.courseId,
      },
      include: {
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            chapter_id: true,
            title: true,
            isFree: true,
          },
          orderBy: {
            position: 'asc',
          },
        },
      },
    });

    if (!course) return next(new AppError('Not found!', 404));

    const purchase = await prisma.purchase.findUnique({
      where: {
        user_id_course_id: {
          user_id: req.user?.user_id,
          course_id: req.params.courseId,
        },
      },
    });

    purchase ? (course.isEnrolled = true) : (course.isEnrolled = false);

    res.status(200).json({
      status: 'success',
      data: {
        course,
      },
    });
  } catch (err) {
    next(err);
  }
};

//api/v1/courses/teacher/:courseId
export const getTeacherCourse = async (req, res, next) => {
  try {
    const course = await prisma.Course.findUnique({
      where: {
        course_id: req.params.courseId,
      },
      include: {
        chapters: {
          omit: {
            videoUrl: true,
            description: true,
          },
          orderBy: {
            position: 'asc',
          },
        },
      },
    });

    if (!course) return next(new AppError('Course not found!', 404));
    res.status(200).json({
      status: 'success',
      data: {
        course,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const updateCourse = async (req, res, next) => {
  try {
    //to check a course exist or not
    const course = await prisma.Course.findUnique({
      where: {
        course_id: req.params.courseId,
      },
    });

    if (!course) return next(new AppError('Not found!', 404));

    //to only allow user to update a particular course who created it
    const courseOwner = await prisma.Course.findFirst({
      where: {
        user_id: req.user.user_id,
        course_id: req.params.courseId,
      },
    });

    if (!courseOwner) return next(new AppError('Unauthorized!', 401));

    //to update categoryId into course
    const categories = await prisma.Category.findMany();

    //to parse categoryId from category name
    if (req.body.category) {
      req.body.category_id = categories.find((cat) => cat.name === req.body.category).category_id;

      delete req.body.category;
    }

    const data = req.body;
    if (req.file) {
      data.image_url = req.file.filename;
    }

    const updatedCourse = await prisma.Course.update({
      where: {
        course_id: req.params.courseId,
        user_id: req.user.user_id,
      },
      data,
    });

    res.status(200).json({
      status: 'success',
      data: {
        course: updatedCourse,
      },
    });
  } catch (err) {
    next(err);
  }
};

//We are not going to give option to delete a published course, because after user enrolled in a course, if instructor delete his/her course than it will be unfair for user.
export const deleteCourse = async (req, res, next) => {
  try {
    await prisma.Course.delete({
      where: {
        course_id: req.params.courseId,
      },
    });
    res.status(204).json({
      status: 'success',
    });
  } catch (err) {
    next(err);
  }
};

export const enroll = async (req, res, next) => {
  try {
    const purchase = await prisma.Purchase.create({
      data: {
        user_id: req.user?.user_id,
        course_id: req.params.courseId,
      },
    });

    res.status(200).json({
      status: 'success',
      data: {
        purchase,
      },
    });
  } catch (err) {
    next(err);
  }
};

//api/v1/courses/:courseId/progress
export const getProgress = async (req, res, next) => {
  const course = await prisma.Course.findUnique({
    where: {
      course_id: req.params.courseId,
    },
    include: {
      chapters: {
        select: {
          chapter_id: true,
        },
        where: {
          isPublished: true,
        },
      },
    },
  });

  if (!course) return next(new AppError('Course not found!', 404));

  const purchase = await prisma.Purchase.findUnique({
    where: {
      user_id_course_id: {
        user_id: req.user.user_id,
        course_id: req.params.courseId,
      },
    },
  });

  if (!purchase) return next(new AppError("You have'nt purchased this course.", 400));

  const chapterIds = course.chapters.map((chap) => chap.chapter_id);

  const chaptersCompleted = await prisma.UserProgress.findMany({
    where: {
      user_id: req.user.user_id,
      chapter_id: {
        in: chapterIds,
      },
      isCompleted: true,
    },
    select: {
      chapter_id: true,
    },
  });

  let userProgress;

  if (chaptersCompleted.length === chapterIds.length) userProgress = 100;
  else userProgress = Math.round((chaptersCompleted.length * 100) / chapterIds.length);

  res.status(200).json({
    status: 'success',
    data: {
      userProgress,
      chaptersCompleted: chaptersCompleted,
    },
  });
};

export const getDashboardCourses = async (req, res, next) => {
  try {
    const purchases = await prisma.Purchase.findMany({
      where: {
        user_id: req.user.user_id,
      },
    });

    const courseIds = purchases.map((purchase) => purchase.course_id);

    const courses = await prisma.Course.findMany({
      where: {
        course_id: {
          in: courseIds,
        },
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            chapter_id: true,
          },
          orderBy: {
            position: 'asc',
          },
        },
        _count: {
          select: {
            chapters: {
              where: {
                isPublished: true,
              },
            },
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    res.status(200).json({
      status: 'success',
      data: {
        courses,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getCourseStats = async (req, res, next) => {
  try {
    const coursesByInstructor = await prisma.Course.findMany({
      where: {
        user_id: req.user.user_id,
        isPublished: true,
      },
      select: {
        course_id: true,
        title: true,
        price: true,
      },
    });

    const coursesWithSalesPromise = coursesByInstructor.map(async (course) => {
      const courseSales = await prisma.Purchase.count({
        where: {
          course_id: course.course_id,
        },
      });

      return { ...course, sales: courseSales };
    });

    const coursesWithSales = await Promise.all(coursesWithSalesPromise);

    let sales = 0;
    coursesWithSales.forEach((course) => (sales += course.sales));

    let revenue = 0;
    coursesWithSales.forEach((course) => (revenue += course.sales * course.price));

    const stats = coursesWithSales.map((course) => ({
      title: course.title,
      revenue: course.sales * course.price,
    }));

    res.status(200).json({
      status: 'success',
      data: {
        sales,
        revenue,
        stats,
      },
    });
  } catch (err) {
    next(err);
  }
};
