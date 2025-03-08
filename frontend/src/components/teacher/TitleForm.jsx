import { useState } from 'react';
import { Pencil } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function TitleForm({ title, id, setCourseChanged }) {
  const [isEditing, setIsEditing] = useState(false);

  function toggleEditing() {
    setIsEditing((prev) => !prev);
  }

  async function editTitle(formData) {
    try {
      const title = formData.get('title');
      await axios.patch(`${import.meta.env.VITE_API_URL}/courses/${id}`, { title }, { withCredentials: true });
      toast.success('Title updated!');
      setCourseChanged((prev) => !prev);
      setIsEditing((prev) => !prev);
    } catch (err) {
      toast.error(err.message);
    }
  }
  return (
    <div className="bg-slate-100 py-2 px-4 mt-6 space-y-2 rounded-lg">
      <div className="flex justify-between">
        <span className="font-semibold">Course title</span>
        <button
          onClick={toggleEditing}
          className="flex items-center space-x-2 px-2 py-1 rounded-md bg-slate-100 hover:bg-slate-200"
        >
          {!isEditing ? (
            <>
              <Pencil strokeWidth={2.3} className="size-4" />
              <span className="font-semibold">Edit title</span>
            </>
          ) : (
            <span className="font-semibold">Cancel</span>
          )}
        </button>
      </div>
      <div>
        {!isEditing ? (
          <span className="text-sm">{title}</span>
        ) : (
          <>
            <form action={editTitle} className="flex flex-col space-y-2">
              <input
                type="text"
                name="title"
                id="title"
                placeholder="e.g. Web Development Course"
                required
                className="w-full pl-2 pb-[2px] rounded-md h-8 border-2 border-gray-400"
              />
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
