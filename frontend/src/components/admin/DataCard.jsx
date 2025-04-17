export default function DataCard({ title, count, bgColor, bgColor2, icon }) {
  return (
    <div
      style={{ backgroundColor: `${bgColor}` }}
      className="text-white w-[100%] lg:w-[80%] px-4 py-2 rounded-lg shadow-sm flex items-center space-x-5 space-y-1"
    >
      <div className={`${bgColor2} p-3 rounded-full`}>{icon}</div>
      <div>
        <p className="text-2xl font-extrabold">{title}</p>
        <p className="text-2xl font-bold">{count}</p>
      </div>
    </div>
  );
}
