import { LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import Hamburger from 'hamburger-react';

export default function Navbar({ setIsBannerOpen, isOpen, setIsOpen }) {
  const [userRole, setUserRole] = useState('');
  const imageRef = useRef();
  const isTeacher = window.location.pathname.startsWith('/teacher');
  const isPlayer = window.location.pathname.includes('/chapter');
  const isAdmin = window.location.pathname.includes('/admin');

  useEffect(function () {
    async function checkUserRole() {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/role`, {
        withCredentials: true,
      });

      if (res.data.data.photo) imageRef.current.src = '/user/' + res.data.data.photo;

      setUserRole(res.data.data.role);
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
          <Link
            to={'/dashboard'}
            className="px-2 flex items-center rounded-md bg-slate-100 hover:bg-slate-200"
            reloadDocument
          >
            <span className="font-semibold text-sm mb-[1px]">Exit</span>
            <LogOut size={14} className={'ml-1'} strokeWidth={3} />
          </Link>
        ) : userRole === 'instructor' ? (
          <Link
            to={'/teacher/courses'}
            className="px-2 flex items-center rounded-md bg-slate-100 hover:bg-slate-200"
            reloadDocument
          >
            <span className="font-semibold text-sm">Teacher mode</span>
          </Link>
        ) : isAdmin ? (
          <></>
        ) : (
          <button
            className="text-sm font-semibold px-2 flex items-center rounded-md bg-slate-100 hover:bg-slate-200"
            onClick={() => setIsBannerOpen(true)}
          >
            Teacher mode
          </button>
        )}
        <img
          ref={imageRef}
          src="/user/default.jpg"
          alt="profile photo"
          className="size-8 rounded-[100%] object-cover"
        />
      </div>
    </div>
  );
}
