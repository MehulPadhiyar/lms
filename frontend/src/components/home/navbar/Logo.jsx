import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/" className="flex items-center space-x-1">
      <div className="bg-primary rounded-full size-14 flex justify-center items-center">
        <img src="/Logo.png" alt="logo" className="w-8" />
      </div>
      <div className="uppercase font-[900] text-black text-[1.75rem]">
        <span className="text-primary font-poppins">Learn</span>
        <span className="lowercase font-normal">ify</span>
      </div>
    </Link>
  );
}
