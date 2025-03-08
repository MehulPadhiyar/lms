import DashboardLayout from './components/components/layout';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Browse from './pages/Browse';
import Teacher from './pages/Teacher';
import Courses from './pages/Courses';
import Analytics from './pages/Analytics';
import Create from './pages/Create';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import CourseId from './pages/CourseId';
import Chapter from './pages/Chapter';
import CourseLayout from './components/components/CourseLayout';
import ChapterPage from './pages/ChapterPage';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/search" element={<Browse />} />
          <Route path="/teacher">
            <Route index element={<Teacher />} />
            <Route path="courses" element={<Courses />} />
            {/* <Route path="courses/:id">
              <Route index element={<CourseId />} />
              <Route path="chapters/:id" element={<Chapter />} />
            </Route> */}
            <Route path="courses/:id" element={<CourseId />} />
            <Route path="courses/:courseId/chapters/:chapterId" element={<Chapter />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="create" element={<Create />} />
          </Route>
        </Route>
        <Route element={<CourseLayout />}>
          <Route path="/courses/:courseId/chapters/:chapterId" element={<ChapterPage />}></Route>
        </Route>
      </Routes>
    </>
  );
}
