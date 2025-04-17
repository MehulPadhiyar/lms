import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { categories } from '../../pages/Browse';

export default function CoursesReport({ tableRef }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function getCourses() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/courses/admin`, {
          withCredentials: true,
        });
        setCourses(res.data.data.courses);
      } catch (err) {
        if (err.status === 403) return navigate('/login');
        toast.error(err.message);
      }
    }
    getCourses();
  }, []);

  return (
    <div className="border-[1px] border-slate-400 shadow-xl rounded-lg overflow-x-auto">
      <table ref={tableRef} className="text-center w-full border-collapse">
        <thead className="bg-black text-white text-lg">
          <tr>
            <th className="px-8 py-3 font-semibold"></th>
            <th className="px-8 py-3 font-semibold">Title</th>
            <th className="px-8 py-3 font-semibold">Instructor</th>
            <th className="px-8 py-3 font-semibold">Price</th>
            <th className="px-8 py-3 font-semibold">Chapters</th>
            <th className="px-8 py-3 font-semibold">Category</th>
            <th className="px-8 py-3 font-semibold">Status</th>
            <th className="px-8 py-3 font-semibold"></th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course?.course_id} className="group border-t-[1px] border-gray-400 hover:bg-slate-100">
              <td className="px-8 py-3">
                <img src={`/course/img/${course?.image_url}`} alt="Course image" className="w-20" />
              </td>
              <td className="px-8 py-3">{course?.title}</td>
              <td className="px-8 py-3">
                <div className="flex items-center gap-3">
                  <img
                    src={`${course?.user.photo ? `/user/${course?.user.photo}` : '/user/default.jpg'}`}
                    alt="profile photo"
                    className="size-7 rounded-full object-cover"
                  />
                  <span>{course?.user.name}</span>
                </div>
              </td>
              <td className="px-8 py-3">{course?.price ? `${course.price} ₹` : ''}</td>
              <td className="px-8 py-3">{course?.chapters.length}</td>
              <td className="px-8 py-3">{categories[course?.category_id - 1].name}</td>
              <td className="px-8 py-3">{course?.status.charAt(0).toUpperCase() + course?.status.slice(1)}</td>
              <td className="px-8 py-3 w-20">
                {' '}
                <Link
                  to={`/courses/${course?.course_id}/chapters/${course?.chapters[0].chapter_id}`}
                  className="text-sm font-semibold underline text-[blue]"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
