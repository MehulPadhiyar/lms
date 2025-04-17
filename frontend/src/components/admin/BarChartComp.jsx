import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

export default function BarChartComp() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/admin/bardata`, {
          withCredentials: true,
        });

        setData(res.data.data.revenueByMonth);
      } catch (err) {
        toast.error(err);
      }
    }

    getData();
  }, []);
  return (
    <div className="bg-white p-4 shadow-lg border rounded-lg flex flex-col items-center">
      <h3 className="text-lg font-semibold mb-4">Revenue by Month</h3>
      <ResponsiveContainer height={450}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => `${value} ₹`} />
          <Bar dataKey="revenue" fill="#0369a1" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
