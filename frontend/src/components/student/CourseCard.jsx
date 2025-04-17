import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import UserProgress from './UserProgress';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function CourseCard({
  courseId,
  firstChapterId,
  title,
  category,
  chaptersCount,
  price,
  image,
  isEnrolled,
  instructor,
  instructorPhoto,
}) {
  const [userProgress, setUserProgress] = useState();

  useEffect(function () {
    async function getUserProgress() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/courses/${courseId}/progress`, {
          withCredentials: true,
        });
        const userProgress = res.data.data.userProgress;
        setUserProgress(userProgress);
      } catch (err) {
        toast.error(err.message);
      }
    }

    if (isEnrolled) getUserProgress();
  }, []);

  return (
    <Link to={`/courses/${courseId}/chapters/${firstChapterId}`}>
      <div className=" group border border-gray-400 shadow-sm max-w-[100%] min-h-[100%] p-2 rounded-lg">
        <img src={`course/img/${image}`} alt="course image" className="rounded-lg mb-4 h-40 w-full" />
        <p className="font-bold text-xl group-hover:text-primary">{title?.charAt(0).toUpperCase() + title?.slice(1)}</p>
        <div className="flex items-center gap-2 mb-3">
          <img src={`/user/${instructorPhoto}`} alt="Instructor photo" className="size-5 rounded-full object-cover" />
          <p className="text-xs font-semibold text-slate-600">by {instructor}</p>
        </div>
        <p className="text-xs text-slate-500 mb-2">{category}</p>
        <div className="flex space-x-1 items-center mb-2">
          <div className="rounded-full bg-sky-100 size-6 flex justify-center items-center">
            <BookOpen className="size-4" />
          </div>
          <p className="text-sm text-slate-500 font-[500]">{chaptersCount}</p>
          <span className="text-sm text-slate-500">{chaptersCount > 1 ? 'chapters' : 'chapter'}</span>
        </div>
        {isEnrolled ? <UserProgress progress={userProgress} /> : <p className="font-bold">{price} ₹</p>}
      </div>
    </Link>
  );
}
