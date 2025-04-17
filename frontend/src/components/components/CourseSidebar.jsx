import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import CourseSidebarItem from './CourseSidebarItem';
import UserProgress from '../student/UserProgress';
import Hamburger from 'hamburger-react';
import { Award } from 'lucide-react';

export default function CourseSidebar({ isOpen, setIsOpen }) {
  const { courseId } = useParams();
  const [course, setCourse] = useState();
  const chapters = course?.chapters;
  const chapterIds = course?.chaptersCompleted?.map((cur) => cur.chapter_id);
  const navigate = useNavigate();

  useEffect(function () {
    async function getCourse() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/courses/${courseId}`, {
          withCredentials: true,
        });
        const course = res.data.data.course;
        if (res.data.data.course.isEnrolled) {
          const progressRes = await axios.get(`${import.meta.env.VITE_API_URL}/courses/${courseId}/progress`, {
            withCredentials: true,
          });
          course.chaptersCompleted = progressRes.data.data.chaptersCompleted;
          course.userProgress = progressRes.data.data.userProgress;
          course.enrolledUser = progressRes.data.data.user;
        }
        setCourse(course);
      } catch (err) {
        if (err.status === 401) return navigate('/login');
        toast.error(err.message);
      }
    }

    getCourse();
  }, []);

  function checkCompletion(chapterId) {
    return chapterIds?.includes(chapterId);
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="md:hidden flex justify-end">
        <Hamburger toggled={isOpen} toggle={setIsOpen} rounded />
      </div>
      <div className="border-b-2 pb-8 md:py-8 px-4">
        <p className={`font-bold text-lg flex justify-center ${course?.isEnrolled && 'mb-4 md:mb-6'}`}>
          {course?.title}
        </p>
        {course?.isEnrolled && <UserProgress progress={course?.userProgress} size="text-sm" />}

        {course?.isEnrolled && (
          <div className="w-full flex justify-center mt-6">
            <a href={`/certificate/${course?.enrolledUser}/${courseId}`}>
              <button
                disabled={course?.userProgress !== 100}
                className="bg-green-600 px-8 py-2 rounded-md text-white flex items-center gap-1 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span>Certificate</span>
                <Award size={18} />
              </button>
            </a>
          </div>
        )}
      </div>
      <div className="flex flex-col">
        {chapters?.map((chap) => (
          <CourseSidebarItem
            key={chap.chapter_id}
            courseId={courseId}
            chapterId={chap.chapter_id}
            title={chap.title}
            isLocked={!chap.isFree && !course.isEnrolled}
            isCompleted={checkCompletion(chap.chapter_id)}
            setIsOpen={setIsOpen}
          />
        ))}
      </div>
    </div>
  );
}
