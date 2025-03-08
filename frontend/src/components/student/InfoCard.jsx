import { Clock, CheckCircle } from 'lucide-react';

export default function InfoCard({ variant, count }) {
  return (
    <div className="flex items-center space-x-2 border-[1px] border-gray-300 p-2 rounded-lg w-full">
      <div
        className={`size-11 ${
          variant === 'success' ? 'bg-emerald-100' : 'bg-secondary'
        } flex justify-center items-center rounded-[100%]`}
      >
        {variant === 'success' ? <CheckCircle className="text-emerald-900" /> : <Clock className="text-primary" />}
      </div>
      <div className="text-sm">
        <p className="font-bold text-[0.950rem]">{variant === 'success' ? 'Completed' : 'In progress'}</p>
        <p className="text-slate-600 text-sm">{count} courses</p>
      </div>
    </div>
  );
}
