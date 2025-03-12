import { LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hamburger from 'hamburger-react';

export default function CourseNavbar({ isOpen, setIsOpen }) {
  return (
    <div className="p-4 bg-white flex justify-between md:justify-end items-center border-b-2">
      <div className="md:hidden">
        <Hamburger toggled={isOpen} toggle={setIsOpen} rounded />
      </div>
      <div className="flex space-x-5">
        <Link to={'/'} className="px-2 flex items-center rounded-md bg-slate-100 hover:bg-slate-200" reloadDocument>
          <span className="font-semibold text-sm mb-[1px]">Exit</span>
          <LogOut size={14} className={'ml-1'} strokeWidth={3} />
        </Link>
        <img src="/user/default.jpg" alt="profile photo" className="size-8 rounded-[100%]" />
      </div>
    </div>
  );
}
