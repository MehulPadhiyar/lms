import axios from 'axios';
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { CircleCheckBig, CircleX } from 'lucide-react';

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

  function enrollInCourse() {
    async function enroll() {
      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/courses/${courseId}/enroll`,
          {},
          {
            withCredentials: true,
          }
        );
        toast.success('Enrolled successfully! 🎉');
        setTimeout(() => window.location.reload(), 1500);
      } catch (err) {
        toast.error(err.message);
      }
    }
    enroll();
  }

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
      <div className="flex justify-between items-center mb-4">
        <p className="font-bold text-lg">{title}</p>
        {isLocked || !isEnrolled ? (
          <button
            onClick={enrollInCourse}
            className="bg-sky-800 px-3 py-[8px] text-sm text-white font-semibold rounded-md"
          >
            Enroll for {coursePrice}₹
          </button>
        ) : isCompleted ? (
          <button
            onClick={toggleCompletion}
            className="py-2 px-3 text-sm font-semibold flex items-center space-x-1 border-[1px] border-gray-300 rounded-md"
          >
            <span>Not completed</span>
            <CircleX size={16} />
          </button>
        ) : (
          <button
            onClick={toggleCompletion}
            className="px-3 py-2 flex items-center space-x-2 bg-emerald-700 rounded-md text-sm text-white font-semibold"
          >
            <span>Mark as complete</span> <CircleCheckBig size={16} />
          </button>
        )}
      </div>
      <div className="flex justify-center mb-4">
        <div className="border-[1px] border-gray-300 rounded-full w-full"></div>
      </div>
      <div>
        <span className="font-semibold italic">Objectives :</span>
        <div className="mt-2">{description && parse(description)}</div>
      </div>
    </div>
  );
}
