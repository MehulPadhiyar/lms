import SidebarRoutes from './SidebarRoutes';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Hamburger from 'hamburger-react';

export default function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();

  const pathname = window.location.pathname;
  const isHome = pathname === '/';

  async function checkAuth() {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/users/authCheck`,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      return navigate('/login');
    }
  }

  if (!isHome) checkAuth();

  return (
    <div className="h-full w-[80%] px-2 bg-primary md:w-full">
      <div className={`flex justify-between items-center pt-4 ${isHome ? 'xl:justify-center' : 'md:justify-center'}`}>
        <Link to="/" className="flex items-center">
          <img src="/Logo.png" alt="logo" className="w-9" />
          <div className="uppercase font-[900] text-black text-[1.75rem]">
            <span className="text-white font-poppins">Learn</span>
            <span className="lowercase font-normal">ify</span>
          </div>
        </Link>
        <div className={`${isHome ? 'xl:hidden' : 'md:hidden'}`}>
          <Hamburger toggled={isOpen} toggle={setIsOpen} rounded color="#ffffff" />
        </div>
      </div>

      <div className="mt-6">
        <SidebarRoutes setIsOpen={setIsOpen} />
      </div>
    </div>
  );
}
