import { PieChart, Pie, ResponsiveContainer, Tooltip } from 'recharts';
import DataCard from './DataCard';
import { CircleHelp, ClipboardPen, ListChecks, ShieldX } from 'lucide-react';

export default function VerifyCoursePageStats({ data, total }) {
  return (
    <>
      <div className="w-[95%] bg-purple-100 flex flex-col lg:flex-row justify-center items-center border-t-[1px] border-purple-200 shadow-lg rounded-lg px-4 lg:px-0 pb-5 md:py-8 mb-8">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Tooltip />
            <Pie
              data={data}
              dataKey="percentage"
              outerRadius="60%"
              innerRadius="40%"
              fill="green"
              label={({ name, percentage }) => `${name}: ${percentage}%`}
            />
            v
          </PieChart>
        </ResponsiveContainer>
        <div className="w-full lg:min-w-[50%] space-y-4 flex flex-col items-center">
          <DataCard
            title="Total"
            count={total}
            bgColor1
            bgColor="#abdbe3"
            bgColor2="bg-cyan-600"
            icon={<ClipboardPen width={40} height={40} />}
          />
          <DataCard
            title="Pending"
            count={data[0].total}
            bgColor="#0088FE"
            bgColor2="bg-blue-600"
            icon={<CircleHelp width={40} height={40} />}
          />
          <DataCard
            title="Verified"
            count={data[1].total}
            bgColor="#FFBB28"
            bgColor2="bg-yellow-600"
            icon={<ListChecks width={40} height={40} />}
          />
          <DataCard
            title="Rejected"
            count={data[2].total}
            bgColor="#dc2626"
            bgColor2="bg-red-800"
            icon={<ShieldX width={40} height={40} />}
          />
        </div>
      </div>
    </>
  );
}
