import { Link } from 'react-router-dom';

export default function Details() {
  return (
    <div className="space-y-4">
      <Link to="/" className="flex items-center space-x-3">
        <div className="bg-primary rounded-full size-14 flex justify-center items-center">
          <img src="/Logo.png" alt="logo" className="w-8" />
        </div>
        <p className="uppercase font-[900] text-white text-[1.75rem]">
          <span className="font-poppins">Learn</span>
          <span className="lowercase font-normal">ify</span>
        </p>
      </Link>
      <p>
        An all-in-one LMS for seamless learning and course management. Empowering educators and students with
        interactive tools!
      </p>
      <div className="space-y-0">
        <p>Add: 70-80 Upper St Norwich NR2</p>
        <p>Call: +01 123 4567 890</p>
        <p>Email: info@learnify.com</p>
      </div>
    </div>
  );
}
