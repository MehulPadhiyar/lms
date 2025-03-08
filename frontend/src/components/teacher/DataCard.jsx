export default function DataCard({ variant = 'Revenue', data }) {
  return (
    <div className="border-[1px] pl-8 py-6 w-full border-gray-300 rounded-lg shadow-sm">
      <p className="font-semibold text-xl mb-2">Total {variant}</p>
      <p className="font-extrabold text-3xl">
        {variant === 'Revenue' && '₹'}
        {data}
      </p>
    </div>
  );
}
