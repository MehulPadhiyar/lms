import SidebarRoutes from './SidebarRoutes';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Hamburger from 'hamburger-react';

export default function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();

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

  checkAuth();

  return (
    <div className="h-full w-[80%] px-2 bg-primary md:w-full">
      <div className="flex justify-between items-center md:justify-center mt-4">
        <Link to="/" className="flex items-center">
          <img src="/Logo.png" alt="logo" className="w-9" />
          <p className="uppercase font-[900] text-white text-[1.75rem]">Learnify</p>
        </Link>
        <div className="md:hidden">
          <Hamburger toggled={isOpen} toggle={setIsOpen} rounded color="#ffffff" />
        </div>
      </div>

      <div className="mt-6">
        <SidebarRoutes setIsOpen={setIsOpen} />
      </div>
    </div>
  );
}
