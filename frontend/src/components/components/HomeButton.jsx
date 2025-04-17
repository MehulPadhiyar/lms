import { ArrowRight } from 'lucide-react';

export default function HomeButton({ children }) {
  return (
    <button className="flex space-x-2 justify-center items-center bg-primary hover:bg-linear_gradient text-white px-3 md:px-7 py-3 md:py-4 rounded-md group">
      <span className="text-sm md:text-[1rem]">{children}</span>{' '}
      <ArrowRight size={20} className="group-hover:translate-x-1" />
    </button>
  );
}
