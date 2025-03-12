import { LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Hamburger from 'hamburger-react';

export default function Navbar({ setIsBannerOpen, isOpen, setIsOpen }) {
  const [checkTeacher, setCheckTeacher] = useState(false);
  const isTeacher = window.location.pathname.startsWith('/teacher');
  const isPlayer = window.location.pathname.includes('/chapter');

  useEffect(function () {
    async function checkUserRole() {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/isTeacher`, {
        withCredentials: true,
      });

      setCheckTeacher(res.data.data.isTeacher);
    }
    checkUserRole();
  }, []);

  return (
    <div className="p-4 bg-[white] flex justify-between items-center border-b-2 md:justify-end">
      <div className="md:hidden">
        <Hamburger toggled={isOpen} toggle={setIsOpen} rounded />
      </div>
      <div className="flex space-x-5">
        {isTeacher || isPlayer ? (
          <Link to={'/'} className="px-2 flex items-center rounded-md bg-slate-100 hover:bg-slate-200" reloadDocument>
            <span className="font-semibold text-sm mb-[1px]">Exit</span>
            <LogOut size={14} className={'ml-1'} strokeWidth={3} />
          </Link>
        ) : checkTeacher ? (
          <Link
            to={'/teacher/courses'}
            className="px-2 flex items-center rounded-md bg-slate-100 hover:bg-slate-200"
            reloadDocument
          >
            <span className="font-semibold text-sm">Teacher mode</span>
          </Link>
        ) : (
          <button
            className="text-sm font-semibold px-2 flex items-center rounded-md bg-slate-100 hover:bg-slate-200"
            onClick={() => setIsBannerOpen(true)}
          >
            Teacher mode
          </button>
        )}
        <img src="/user/default.jpg" alt="profile photo" className="size-8 rounded-[100%]" />
      </div>
    </div>
  );
}
