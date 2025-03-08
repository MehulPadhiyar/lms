import { useState } from 'react';
import { CirclePlus } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Chapter from '../teacher/Chapter';

export default function ChapterForm({ chapters, id, setCourseChanged }) {
  const [isEditing, setIsEditing] = useState(false);

  function toggleEditing() {
    setIsEditing((prev) => !prev);
  }

  async function editChapter(formData) {
    try {
      const chapterTitle = formData.get('chapterTitle');
      await axios.post(
        `${import.meta.env.VITE_API_URL}/courses/${id}/chapters`,
        { title: chapterTitle },
        { withCredentials: true }
      );
      toast.success('Chapter created!');
      setCourseChanged((prev) => !prev);
      setIsEditing((prev) => !prev);
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div className="bg-slate-100 py-5 px-4 mt-6 space-y-2 rounded-lg">
      <div className="flex justify-between">
        <span className="font-semibold">Course chapters</span>
        <button
          onClick={toggleEditing}
          className="flex items-center space-x-2 px-2 py-1 rounded-md bg-slate-100 hover:bg-slate-200"
        >
          {!isEditing ? (
            <>
              <CirclePlus strokeWidth={2.3} className="size-4 mb-[2px]" />
              <span className="font-semibold">Add a chapter</span>
            </>
          ) : (
            <span className="font-semibold">Cancel</span>
          )}
        </button>
      </div>
      <div>
        {!isEditing ? (
          <div className="text-[1rem] flex flex-col space-y-2">
            {chapters?.length > 0
              ? chapters.map((chap, i) => (
                  <Chapter key={chap.chapter_id} chapter={chap} courseId={id}>
                    {i + 1}
                  </Chapter>
                ))
              : 'No chapters'}
          </div>
        ) : (
          <>
            <form action={editChapter} className="flex flex-col space-y-2">
              <input
                type="text"
                name="chapterTitle"
                id="chapterTitle"
                required
                placeholder="e.g. 'Introduction to the course'"
                className="w-full pl-2 pb-[2px] rounded-md h-8 border-2 border-gray-400"
              />
              <button
                type="submit"
                className="bg-black h-[30px] flex justify-center items-center text-white text-sm py-2 rounded-md hover:bg-gray-800 w-[4rem]"
              >
                Create
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
