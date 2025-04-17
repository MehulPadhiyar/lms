import { useEffect, useState } from 'react';
import axios from 'axios';

export default function InstructorsReport({ tableRef }) {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    async function getInstructors() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/instructors`, {
          withCredentials: true,
        });

        setInstructors(res.data.data.instructors);
      } catch (err) {
        toast.error(err);
      }
    }

    getInstructors();
  }, []);

  return (
    <div className="border-[1px] border-slate-400 shadow-xl rounded-lg overflow-x-auto">
      <table ref={tableRef} className="text-center w-full border-collapse">
        <thead className="bg-black text-white text-lg">
          <tr>
            <th className="px-8 py-3 font-semibold">Name</th>
            <th className="px-8 py-3 font-semibold">Email</th>
            <th className="px-8 py-3 font-semibold">Courses</th>
            <th className="px-8 py-3 font-semibold">Verified</th>
            <th className="px-8 py-3 font-semibold">Rejected</th>
            <th className="px-8 py-3 font-semibold">Revenue</th>
            <th className="px-8 py-3 font-semibold">Students</th>
          </tr>
        </thead>
        <tbody>
          {instructors.map((inst) => (
            <tr key={inst.user_id} className="group border-t-[1px] border-gray-400 hover:bg-slate-100">
              <td className="px-8 py-3">
                <div className="flex items-center gap-3">
                  <img
                    src={`${inst?.photo ? `/user/${inst?.photo}` : '/user/default.jpg'}`}
                    alt="profile photo"
                    className="size-6 rounded-full object-cover"
                  />
                  <span>{inst?.name}</span>
                </div>
              </td>
              <td className="px-8 py-3">{inst?.email}</td>
              <td className="px-8 py-3">{inst?.stats.courses}</td>
              <td className="px-8 py-3 text-kappel">{inst?.stats.verified}</td>
              <td className="px-8 py-3 text-red-600">{inst?.stats.rejected}</td>
              <td className="px-8 py-3">{inst?.stats.revenue} ₹</td>
              <td className="px-8 py-3">{inst?.stats.students}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
