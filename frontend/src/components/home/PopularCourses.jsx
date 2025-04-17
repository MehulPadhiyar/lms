import CourseCard from './courses/CourseCard';
import HomeButton from '../components/HomeButton';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function PopularCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function getCourses() {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/courses/top-3`, { withCredentials: true });

      setCourses(res.data.data.courses);
    }

    getCourses();
  }, []);

  return (
    <div id="courses" className=" bg-isabelline font-poppins bg-no-repeat pt-14 lg:pt-28 pb-12 place-items-center">
      <div className="text-center mb-5">
        <p className="uppercase text-slate-500 text-sm xl:text-[1rem] font-medium mb-2 md:mb-5">Popular Courses</p>
        <h2 className="font-league_spartan text-3xl xl:text-[3.5rem] font-semibold">
          Pick A <span className="text-primary">Course</span> To Get Started
        </h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 px-4 sm:px-20 xl:px-48 gap-8 mb-14">
        {courses.map((course) => (
          <CourseCard
            key={course.course_id}
            image={course.image_url}
            level={course.level}
            title={course.title}
            price={course.price}
            lessons={course.chapters}
            students={course.students}
          />
        ))}
      </div>
      <a href="/signup">
        <HomeButton>Browse more courses</HomeButton>
      </a>
    </div>
  );
}
