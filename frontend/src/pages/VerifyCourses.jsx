import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import VerifyCoursePageStats from '../components/admin/VerifyCoursePageStats';

export default function VerifyCourses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const selectRef = useRef();
  const divRef = useRef();

  const calculateStats = () => {
    let pendingCourses = 0;
    let verifiedCourses = 0;
    let rejectedCourses = 0;

    courses.map((course) =>
      course.status === 'pending'
        ? pendingCourses++
        : course.status === 'verified'
        ? verifiedCourses++
        : rejectedCourses++
    );

    return [
      {
        name: 'pending',
        total: pendingCourses,
        percentage: Math.round(((pendingCourses * 100) / courses.length) * 100) / 100,
        fill: '#0088FE',
      },
      {
        name: 'verified',
        total: verifiedCourses,
        percentage: Math.round(((verifiedCourses * 100) / courses.length) * 100) / 100,
        fill: '#FFBB28',
      },
      {
        name: 'rejected',
        total: rejectedCourses,
        percentage: Math.round(((rejectedCourses * 100) / courses.length) * 100) / 100,
        fill: '#dc2626',
      },
    ];
  };

  useEffect(() => {
    async function getCourses() {
      try {
        divRef.current.scrollIntoView({ block: 'end' });

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

  async function onChange(id, status) {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/courses/${id}/updateStatus`,
        {
          status,
        },
        {
          withCredentials: true,
        }
      );

      toast.success('Status updated successfully.');

      setTimeout(() => window.location.reload(), 1500);
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div ref={divRef} className="mt-24 w-full flex flex-col items-center pb-10">
      <VerifyCoursePageStats data={calculateStats()} total={courses?.length} />

      {courses.length > 0 ? (
        <div className=" w-[95%] border-[1px] border-slate-400 rounded-lg overflow-x-auto">
          <table className="text-center w-full border-collapse">
            <thead className="bg-black text-white text-lg">
              <tr>
                <th className="px-8 py-3 font-semibold">Title</th>
                <th className="px-8 py-3 font-semibold">Instructor</th>
                <th className="px-8 py-3 font-semibold">Email</th>
                <th className="px-8 py-3 font-semibold">Price</th>
                <th className="px-8 py-3 font-semibold">Status</th>
                <th className="px-8 py-3 font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course?.course_id} className="group border-t-[1px] border-gray-400 hover:bg-slate-100">
                  <td className=" px-8 py-3">{course?.title}</td>
                  <td className=" px-8 py-3">
                    <div className="flex items-center justify-center gap-3">
                      <img
                        src={`${course?.user.photo ? `/user/${course?.user.photo}` : '/user/default.jpg'}`}
                        alt="profile photo"
                        className="size-7 rounded-full object-cover"
                      />
                      <span>{course?.user.name}</span>
                    </div>
                  </td>
                  <td className=" px-8 py-3">{course?.user.email}</td>
                  <td className=" px-8 py-3">{course?.price ? `${course.price} ₹` : ''}</td>
                  <td className=" px-8 py-3">
                    <form>
                      <select
                        ref={selectRef}
                        defaultValue={course.status}
                        className="group-hover:bg-slate-100"
                        onChange={(e) => onChange(course?.course_id, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="verified">Verified</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </form>
                  </td>
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
      ) : (
        <div>
          <p className="font-semibold italic text-lg">No courses!</p>
        </div>
      )}
      <Toaster />
    </div>
  );
}
