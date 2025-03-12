import { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

export default function DashboardLayout() {
  const [isBannerOpen, setIsBannerOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar setIsBannerOpen={setIsBannerOpen} isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <div
        className={`border-r-2 h-full w-full md:flex md:flex-col md:w-56 fixed inset-y-0 z-50 ${
          isOpen ? 'flex' : 'hidden'
        }`}
      >
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <main className="h-full">
        <div className="md:ml-56 mt-20 md:mt-[66px] h-full">
          <Outlet context={{ isBannerOpen, setIsBannerOpen }} />
        </div>
      </main>
    </div>
  );
}
