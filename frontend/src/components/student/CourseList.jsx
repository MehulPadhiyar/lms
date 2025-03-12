import { useEffect, useState } from 'react';
import axios from 'axios';
import CourseCard from './CourseCard';
import { useLocation, useNavigate } from 'react-router-dom';

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const params = new URLSearchParams(useLocation().search);
  const categoryId = params.get('categoryId');
  const navigate = useNavigate();

  useEffect(
    function () {
      async function getCourses() {
        try {
          const url = categoryId
            ? `${import.meta.env.VITE_API_URL}/courses?categoryId=${categoryId}`
            : `${import.meta.env.VITE_API_URL}/courses`;

          const res = await axios.get(url, {
            withCredentials: true,
          });

          setCourses(res.data.data.courses);
        } catch (err) {
          navigate('/login');
        }
      }
      getCourses();
    },
    [categoryId]
  );

  return (
    <>
      {courses.length > 0 ? (
        <div className="rounded-lg mx-auto mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 lg:p-4 xl:grid-cols-4">
          {courses.map((course) => (
            <CourseCard
              key={course.course_id}
              courseId={course.course_id}
              firstChapterId={course.chapters[0].chapter_id}
              title={course.title}
              category={course.category?.name}
              chaptersCount={course._count.chapters}
              price={course.price}
              image={course.image_url}
              isEnrolled={course.isEnrolled}
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
