import { prisma } from './../server.js';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/appError.js';
import axios from 'axios';
import multer from 'multer';

//To parse and store video into storage coming from frontend
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'frontend/public/user/video');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `${file.fieldname}-${req.user.user_id}.${ext}`);
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

export const uploadSamples = upload.fields([
  { name: 'sample1', maxCount: 1 },
  { name: 'sample2', maxCount: 1 },
  { name: 'sample3', maxCount: 1 },
]);

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

export const checkRole = async (req, res, next) => {
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
      data: {
        role: user.role,
        photo: user.photo,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getAllTransactions = async (req, res, next) => {
  try {
    const response = await axios.get('https://api.razorpay.com/v1/payments?count=20', {
      auth: {
        username: process.env.RAZORPAY_KEY_ID,
        password: process.env.RAZORPAY_SECRET,
      },
    });

    const payments = response.data.items.map((res) => ({
      id: res.id,
      email: res.email,
      contact: res.contact,
      created_at: res.created_at,
      amount: (res.amount / 100).toFixed(2),
      method: res.method,
      status: res.status,
    }));

    res.status(200).json({
      status: 'success',
      data: {
        count: response.data.count,
        payments,
      },
    });
  } catch (err) {
    next(err);
  }
};

async function getRevenueandStudents(id) {
  const coursesByInstructor = await prisma.Course.findMany({
    where: {
      status: {
        equals: 'verified',
      },
      user_id: id,
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

  let revenue = 0;
  let students = 0;
  coursesWithSales.forEach((course) => {
    revenue += course.sales * course.price;
    students += course.sales;
  });

  return { revenue, students };
}

export const getInstructorDetails = async (req, res, next) => {
  try {
    let instructors = await prisma.User.findMany({
      where: {
        role: {
          equals: 'instructor',
        },
      },
    });

    let resPromise = instructors.map((cur) => getRevenueandStudents(cur.user_id));

    const revAndStud = await Promise.all(resPromise);

    const coursesCountPromise = instructors.map((cur) => {
      return prisma.Course.count({
        where: {
          user_id: {
            equals: cur.user_id,
          },
        },
      });
    });

    const verifiedCoursesCountPromise = instructors.map((cur) => {
      return prisma.Course.count({
        where: {
          user_id: {
            equals: cur.user_id,
          },
          status: {
            equals: 'verified',
          },
        },
      });
    });

    const rejectedCoursesCountPromise = instructors.map((cur) => {
      return prisma.Course.count({
        where: {
          user_id: {
            equals: cur.user_id,
          },
          status: {
            equals: 'rejected',
          },
        },
      });
    });

    const coursesCount = await Promise.all(coursesCountPromise);
    const verifiedCoursesCount = await Promise.all(verifiedCoursesCountPromise);
    const rejectedCoursesCount = await Promise.all(rejectedCoursesCountPromise);

    instructors = instructors.map((cur, i) => ({
      ...cur,
      stats: {
        courses: coursesCount[i],
        verified: verifiedCoursesCount[i],
        rejected: rejectedCoursesCount[i],
        revenue: revAndStud[i].revenue,
        students: revAndStud[i].students,
      },
    }));

    res.status(200).json({
      status: 'success',
      data: {
        instructors,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getAdminStats = async (req, res, next) => {
  try {
    const totalUsers = await prisma.User.count();

    const totalInstructors = await prisma.User.count({
      where: {
        role: 'instructor',
      },
    });

    const totalCourses = await prisma.Course.count();

    const amounts = await prisma.Purchase.findMany({
      select: {
        course: {
          select: {
            price: true,
          },
        },
      },
    });

    let revenue = 0;
    amounts.forEach((amt) => (revenue += amt.course.price));

    res.status(200).json({
      status: 'success',
      data: {
        stats: {
          users: totalUsers,
          instructors: totalInstructors,
          courses: totalCourses,
          revenue,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getAdminPieData = async (req, res, next) => {
  try {
    const topCourses = await prisma.Purchase.groupBy({
      by: ['course_id'],
      _count: {
        course_id: true,
      },
      orderBy: {
        _count: {
          course_id: 'desc',
        },
      },
      take: 5,
    });

    const ids = topCourses.map((cur) => cur.course_id);

    let courses = ids.map((id) =>
      prisma.Course.findUnique({
        where: {
          course_id: id,
        },
        select: {
          course_id: true,
          title: true,
        },
      })
    );

    courses = await Promise.all(courses);

    courses = courses.map((course, i) => ({ course: course.title, students: topCourses[i]._count.course_id }));

    const topCoursesByRevenue = await prisma.$queryRaw`
      SELECT c.title as course, SUM(c.price) AS revenue
      FROM Course c
      JOIN Purchase p ON c.course_id = p.course_id
      GROUP BY c.course_id
      ORDER BY revenue DESC
      LIMIT 5;
      `;

    res.status(200).json({
      status: 'success',
      data: {
        coursesByStudents: courses,
        coursesByRevenue: topCoursesByRevenue,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getAdminBarData = async (req, res, next) => {
  try {
    const revenueByMonth = await prisma.$queryRaw`
      select sum(c.price) as revenue,date_format(p.created_at, '%M-%Y') as month 
      from course as c join purchase as p 
      where c.course_id = p.course_id 
      group by date_format(p.created_at, '%M-%Y');
      `;

    res.status(200).json({
      status: 'success',
      data: {
        revenueByMonth,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const uploadSampleVideos = async (req, res, next) => {
  try {
    await prisma.Sample.createMany({
      data: [
        {
          video_url: req.files.sample1[0].filename,
          user_id: req.user.user_id,
        },
        {
          video_url: req.files.sample2[0].filename,
          user_id: req.user.user_id,
        },
        {
          video_url: req.files.sample3[0].filename,
          user_id: req.user.user_id,
        },
      ],
    });

    res.status(200).json({
      status: 'success',
      message: 'Sample videos successfully uploaded',
    });
  } catch (err) {
    next(err);
  }
};

export const getUsersAppliedForInstructor = async (req, res, next) => {
  try {
    const rawUserIds = await prisma.Sample.groupBy({
      by: ['user_id'],
    });

    const userIds = rawUserIds.map((idObj) => idObj.user_id);

    const usersPromise = userIds.map((id) => {
      return prisma.Sample.findMany({
        where: {
          user_id: id,
        },
        select: {
          user: {
            select: {
              user_id: true,
              name: true,
              email: true,
              role: true,
              photo: true,
            },
          },
          video_url: true,
        },
      });
    });

    const users = await Promise.all(usersPromise);

    const userDetails = users.map((user) => {
      return {
        user_id: user[0].user.user_id,
        name: user[0].user.name,
        email: user[0].user.email,
        photo: user[0].user.photo,
        role: user[0].user.role,
      };
    });

    const videoUrls = users.map((user) => user.map((cur) => cur.video_url));

    videoUrls.map((urls, i) => (userDetails[i].samples = urls));

    res.status(200).json({
      status: 'success',
      data: {
        users: userDetails,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const changeRole = async (req, res, next) => {
  try {
    await prisma.User.update({
      where: {
        user_id: req.params.userId,
      },
      data: {
        role: req.body.role,
      },
    });

    res.status(200).json({
      status: 'success',
      message: 'Role updated.',
    });
  } catch (err) {
    next(err);
  }
};
