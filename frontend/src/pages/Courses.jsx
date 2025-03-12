import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import Label from '../components/components/Label';
import { PlusCircle } from 'lucide-react';

export default function Course() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function getCourses() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/courses/teacher`, {
          withCredentials: true,
        });
        setCourses(res.data.data.courses);
      } catch (err) {
        toast.error(err.message);
      }
    }
    getCourses();
  }, []);

  return (
    <div className="mt-24 md:mt-20 w-full flex flex-col items-center space-y-5">
      <div className="flex justify-end w-[95%]">
        <Link to={'/teacher/create'} className="bg-black text-white text-sm px-2 py-[8px] rounded-lg hover:bg-gray-800">
          <span className="flex items-center">
            <PlusCircle className="mr-2 size-4" /> New Course
          </span>
        </Link>
      </div>
      {courses.length > 0 ? (
        <div className=" w-[95%] border-[1px] border-gray-400 rounded-lg overflow-x-auto">
          <table className="text-left w-full border-collapse">
            <thead className="bg-black text-white text-lg">
              <tr>
                <th className="px-8 py-3 font-semibold">Title</th>
                <th className="px-8 py-3 font-semibold">Price</th>
                <th className="px-8 py-3 font-semibold">Published</th>
                <th className="px-8 py-3 font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course?.course_id} className="border-t-[1px] border-gray-400 hover:bg-slate-100">
                  <td className=" px-8 py-3">{course?.title}</td>
                  <td className=" px-8 py-3">{course?.price ? `${course.price} ₹` : ''}</td>
                  <td className=" px-8 py-3">
                    {course?.isPublished ? (
                      <Label bgColor="#0369a1">Published</Label>
                    ) : (
                      <Label bgColor="#696969">Draft</Label>
                    )}
                  </td>
                  <td className="px-8 py-3 w-20">
                    {' '}
                    <Link
                      to={`/teacher/courses/${course?.course_id}`}
                      className="text-sm font-semibold underline hover:text-[blue]"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <p className="font-semibold italic text-lg">No courses created yet—click 'New Course' to get started!</p>
        </div>
      )}
    </div>
  );
}
