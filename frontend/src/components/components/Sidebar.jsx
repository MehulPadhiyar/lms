import SidebarRoutes from './SidebarRoutes';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Sidebar() {
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
    <div className="h-full px-2 bg-primary">
      <div className="flex justify-center mt-4">
        <Link to="/" className="flex items-center">
          <img src="/Logo.png" alt="logo" className="w-9" />
          <p className="uppercase font-[900] text-white text-[1.75rem]">Learnify</p>
        </Link>
      </div>
      <div className="mt-6">
        <SidebarRoutes />
      </div>
    </div>
  );
}
