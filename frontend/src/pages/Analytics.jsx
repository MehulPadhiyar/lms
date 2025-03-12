import React, { useEffect, useState } from 'react';
import DataCard from '../components/teacher/DataCard';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

export default function Analytics() {
  const [data, setData] = useState({});

  useEffect(function () {
    async function getData() {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/courses/stats`, {
        withCredentials: true,
      });

      setData(res.data.data);
    }
    getData();
  }, []);

  return (
    <div className="p-10 flex flex-col w-full space-y-10 md:space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-6 md:space-y-0">
        <DataCard data={data.revenue} />
        <DataCard variant="Sales" data={data.sales} />
      </div>

      <ResponsiveContainer className="border-[1px] border-gray-300 rounded-lg pt-4 shadow-sm" height={450}>
        <BarChart data={data.stats}>
          <XAxis dataKey="title" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="#0369a1" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
