import axios from 'axios';
import DashboardCard from './DashboardCard';
import { Users, IndianRupee, BookOpen } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { BsPersonVideo } from 'react-icons/bs';
import PieCharts from './PieCharts';
import BarChartComp from './BarChartComp';

export default function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/admin/stats`, {
          withCredentials: true,
        });

        setData(res.data.data.stats);
      } catch (err) {
        toast.error(err);
      }
    }

    getData();
  }, []);

  return (
    <div className="p-10 space-y-10">
      <div className="grid grid-cols-4 gap-8">
        <DashboardCard
          title="Users"
          count={data?.users}
          bgColor1="bg-category1_bg"
          bgColor2="bg-category1_bg2"
          textColor="text-kappel"
          icon={<Users size={40} />}
        />
        <DashboardCard
          title="Instructors"
          count={data?.instructors}
          bgColor1="bg-category2_bg"
          bgColor2="bg-category2_bg2"
          textColor="text-radical_red"
          icon={<BsPersonVideo className="mt-1" strokeWidth={0.6} size={40} />}
        />
        <DashboardCard
          title="Courses"
          count={data?.courses}
          bgColor1="bg-category3_bg"
          bgColor2="bg-category3_bg2"
          textColor="text-category3_text"
          icon={<BookOpen className="mt-1" size={40} />}
        />
        <DashboardCard
          title="Revenue"
          count={data?.revenue}
          bgColor1="bg-category4_bg"
          bgColor2="bg-category4_bg2"
          textColor="text-selective_yellow"
          icon={<IndianRupee className="mt-1" size={40} />}
        />
      </div>
      <PieCharts />
      <BarChartComp />
    </div>
  );
}
