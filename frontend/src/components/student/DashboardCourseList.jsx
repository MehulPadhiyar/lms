import { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardCourseCard from './DashboardCourseCard';
import { useNavigate } from 'react-router-dom';

export default function DashboardCourseList({ setCourseStats }) {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(function () {
    async function getCourses() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/courses/dashboard`, {
          withCredentials: true,
        });

        setCourses(res.data.data.courses);
      } catch (err) {
        navigate('/login');
      }
    }
    getCourses();
  }, []);

  return (
    <>
      {courses.length > 0 ? (
        <div className="rounded-lg mx-auto mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
          {courses.map((course) => (
            <DashboardCourseCard
              key={course.course_id}
              courseId={course.course_id}
              firstChapterId={course.chapters[0].chapter_id}
              title={course.title}
              category={course.category?.name}
              chaptersCount={course._count.chapters}
              image={course.image_url}
              setCourseStats={setCourseStats}
              instructor={course.user.name}
              instructorPhoto={course.user.photo}
            />
          ))}
        </div>
      ) : (
        <div className="mt-4 flex justify-center">
          <p className="text-black font-semibold italic text-lg">No courses!</p>
        </div>
      )}
    </>
  );
}
