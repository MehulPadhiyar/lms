import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import CourseSidebarItem from './CourseSidebarItem';
import UserProgress from '../student/UserProgress';

export default function CourseSidebar() {
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
    <div className="h-full">
      <div className="border-b-2 py-8 px-4">
        <p className={`font-bold text-lg flex justify-center ${course?.isEnrolled && 'mb-6'}`}>{course?.title}</p>
        {course?.isEnrolled && <UserProgress progress={course?.userProgress} size="text-sm" />}
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
          />
        ))}
      </div>
    </div>
  );
}
