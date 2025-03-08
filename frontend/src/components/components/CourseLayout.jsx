import CourseNavbar from './CourseNavbar';
import CourseSidebar from './CourseSidebar';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

export default function CourseLayout() {
  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <CourseNavbar />
      </div>
      <div className="border-r-2 hidden bg-white md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
        <CourseSidebar />
      </div>
      <main className="h-full">
        <div className="md:ml-80 md:mt-[66px] h-full">
          <Outlet />
        </div>
      </main>
      <Toaster />
    </div>
  );
}
