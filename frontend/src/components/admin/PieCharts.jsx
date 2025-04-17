import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { PieChart, Pie, ResponsiveContainer, Tooltip } from 'recharts';

export default function PieCharts() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  function convertData(data) {
    const colors = ['#3b82f6', '#f97316', '#10b981', '#ef4444', '#8b5cf6'];

    return data.map((cur, i) => ({ ...cur, name: cur.course, fill: colors[i] }));
  }

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/admin/piedata`, {
          withCredentials: true,
        });

        setData(convertData(res.data.data.coursesByStudents));
        setData2(convertData(res.data.data.coursesByRevenue));
      } catch (err) {
        toast.error(err);
      }
    }

    getData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-4 shadow-lg border rounded-lg flex flex-col items-center">
        <h3 className="text-lg font-semibold mb-2">Top 5 Courses by Students</h3>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Tooltip formatter={(value, name) => `${value} ${value > 1 ? 'students' : 'student'}`} />
            <Pie
              data={data}
              dataKey="students"
              outerRadius="60%"
              innerRadius="40%"
              fill="green"
              className="text-xs"
              label={({ name, students }) => `${name}: ${students} ${students > 1 ? 'students' : 'student'}`}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white p-4 shadow-lg border rounded-lg flex flex-col items-center">
        <h3 className="text-lg font-semibold mb-2">Top 5 Courses by Revenue</h3>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Tooltip formatter={(value, name) => `${value} ₹`} />
            <Pie
              data={data2}
              dataKey="revenue"
              outerRadius="60%"
              innerRadius="40%"
              fill="green"
              className="text-xs"
              label={({ name, revenue }) => `${name}: ${revenue} ₹`}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
