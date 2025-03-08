import { useState } from 'react';
import { Pencil } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import parse from 'html-react-parser';

export default function ChapterDescriptionForm({ description, chapterId, courseId, setChapterChanged }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(description ? description : '');

  function toggleEditing() {
    setIsEditing((prev) => !prev);
  }

  async function editDescription() {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/courses/${courseId}/chapters/${chapterId}`,
        { description: newDescription },
        { withCredentials: true }
      );
      toast.success('Description updated!');
      setChapterChanged((prev) => !prev);
      setIsEditing((prev) => !prev);
    } catch (err) {
      toast.error(err.message);
    }
  }
  return (
    <div className="bg-slate-100 py-2 px-4 mt-6 space-y-2 rounded-lg">
      <div className="flex justify-between items-center">
        <span className="font-semibold">Chapter description</span>
        <button
          onClick={toggleEditing}
          className="flex items-center space-x-2 px-2 py-1 rounded-md bg-slate-100 hover:bg-slate-200"
        >
          {!isEditing ? (
            <>
              <Pencil strokeWidth={2.3} className="size-[15px]" />
              <span className="font-semibold">Edit description</span>
            </>
          ) : (
            <span className="font-semibold">Cancel</span>
          )}
        </button>
      </div>
      <div>
        {!isEditing ? (
          !description ? (
            <p className="text-sm">No description</p>
          ) : (
            <div className="text-sm">{parse(description)}</div>
          )
        ) : (
          <>
            <form action={editDescription} className="flex flex-col space-y-2">
              <ReactQuill value={newDescription} onChange={setNewDescription}></ReactQuill>
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
