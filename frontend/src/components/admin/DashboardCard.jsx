export default function DashboardCard({ title, count, icon, bgColor1, bgColor2, textColor }) {
  return (
    <div
      className={`text-white ${bgColor1} pl-6 py-4 rounded-lg border shadow-md flex items-center space-x-5 space-y-1`}
    >
      <div
        className={`${bgColor2} size-[4.400rem] p-3 place-content-center place-items-center rounded-full ${textColor}`}
      >
        {icon}
      </div>
      <div>
        <p className={`text-2xl font-extrabold ${textColor}`}>{title}</p>
        <p className={`${textColor} text-2xl font-bold`}>{count}</p>
      </div>
    </div>
  );
}
