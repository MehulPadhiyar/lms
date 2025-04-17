import axios from 'axios';
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { CircleCheckBig, CircleX } from 'lucide-react';
import Payment from './Payment';

export default function ChapterDetails({ title, description, isLocked, coursePrice, courseId, chapterId }) {
  const [isCompleted, setIsCompleted] = useState();
  const [isEnrolled, setIsEnrolled] = useState();

  useEffect(
    function () {
      async function checkCompletion() {
        try {
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/courses/${courseId}`, {
            withCredentials: true,
          });

          setIsEnrolled(res.data.data.course.isEnrolled);
          if (!res.data.data.course.isEnrolled) return;

          const progressRes = await axios.get(`${import.meta.env.VITE_API_URL}/courses/${courseId}/progress`, {
            withCredentials: true,
          });

          setIsCompleted(progressRes.data.data.chaptersCompleted.map((cur) => cur.chapter_id).includes(chapterId));
        } catch (err) {
          if (err.status === 401) return;
          toast.error(err.message);
        }
      }
      checkCompletion();
    },
    [chapterId]
  );

  async function toggleCompletion() {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/courses/${courseId}/chapters/${chapterId}/progress`,
        { isCompleted: !isCompleted },
        { withCredentials: true }
      );

      toast.success('Progress updated.');

      setTimeout(() => window.location.reload(), 1500);
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div className="mt-8">
      <div className="flex flex-col space-y-3 justify-between items-center mb-4 md:flex-row md:space-y-0">
        <p className="font-bold text-xl">{title}</p>
        {isLocked || !isEnrolled ? (
          <Payment price={coursePrice} />
        ) : isCompleted ? (
          <button
            onClick={toggleCompletion}
            className="w-full py-2 px-3 text-sm font-semibold flex justify-center items-center space-x-1 border-[1px] border-gray-300 rounded-md md:w-auto"
          >
            <span>Not completed</span>
            <CircleX size={16} />
          </button>
        ) : (
          <button
            onClick={toggleCompletion}
            className="px-3 w-full py-2 flex justify-center items-center space-x-2 bg-emerald-700 rounded-md text-sm text-white font-semibold md:w-auto"
          >
            <span>Mark as complete</span> <CircleCheckBig size={16} />
          </button>
        )}
      </div>
      <div className="flex justify-center mb-4">
        <div className="border-[1px] border-gray-300 rounded-full w-full"></div>
      </div>
      <div>
        <span className="font-bold italic">Objectives :</span>
        <div className="mt-2 pb-10">{description && parse(description)}</div>
      </div>
    </div>
  );
}
