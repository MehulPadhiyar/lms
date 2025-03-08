import { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

export default function DashboardLayout() {
  const [isBannerOpen, setIsBannerOpen] = useState(false);

  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar setIsBannerOpen={setIsBannerOpen} />
      </div>
      <div className="border-r-2 hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="h-full">
        <div className="md:ml-56 md:mt-[66px] h-full">
          <Outlet context={{ isBannerOpen, setIsBannerOpen }} />
        </div>
      </main>
    </div>
  );
}
