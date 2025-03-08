import { useState } from 'react';
import { Pencil } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ChapterAccessForm({ isFree, chapterId, courseId, setChapterChanged }) {
  const [isEditing, setIsEditing] = useState(false);

  function toggleEditing() {
    setIsEditing((prev) => !prev);
  }

  async function editAccessSettings(formData) {
    try {
      const isFree = formData.get('isFree') === 'on' ? true : false;
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/courses/${courseId}/chapters/${chapterId}`,
        { isFree },
        { withCredentials: true }
      );
      toast.success('Access settings updated!');
      setChapterChanged((prev) => !prev);
      setIsEditing((prev) => !prev);
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div className="bg-slate-100 py-2 px-4 mt-6 space-y-2 rounded-lg">
      <div className="flex justify-between items-center">
        <span className="font-semibold">Free Preview Chapter</span>
        <button
          onClick={toggleEditing}
          className="flex items-center space-x-2 px-2 py-1 rounded-md bg-slate-100 hover:bg-slate-200"
        >
          {!isEditing ? (
            <>
              <Pencil strokeWidth={2.3} className="size-4" />
              <span className="font-semibold">Edit access settings</span>
            </>
          ) : (
            <span className="font-semibold">Cancel</span>
          )}
        </button>
      </div>
      <div>
        {!isEditing ? (
          <span className="text-sm">
            {isFree ? (
              'This chapter is free for preview.'
            ) : (
              <em className="text-slate-500">This chapter is not free.</em>
            )}
          </span>
        ) : (
          <>
            <form action={editAccessSettings} className="flex flex-col space-y-2">
              <div className="border-[2px] px-4 py-2 rounded-md flex space-x-2 items-center">
                <input type="checkbox" name="isFree" id="isFree" defaultChecked={isFree} className="size-4" />
                <label htmlFor="isFree" className="text-xs text-slate-500">
                  Check this box if you want to make this chapter free for preview.
                </label>
              </div>
              <button
                type="submit"
                className="bg-black h-[30px] flex justify-center items-center text-white text-sm py-2 rounded-md hover:bg-gray-800 w-[4rem]"
              >
                Save
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
