import { useState } from 'react';
import { Pencil } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function TitleForm({ description, id, setCourseChanged }) {
  const [isEditing, setIsEditing] = useState(false);
  function toggleEditing() {
    setIsEditing((prev) => !prev);
  }

  async function editDescription(formData) {
    try {
      const description = formData.get('description');
      await axios.patch(`${import.meta.env.VITE_API_URL}/courses/${id}`, { description }, { withCredentials: true });
      toast.success('Description updated!');
      setCourseChanged((prev) => !prev);
      setIsEditing((prev) => !prev);
    } catch (err) {
      toast.error(err.message);
    }
  }
  return (
    <div className="bg-slate-100 py-2 px-4 mt-6 space-y-2 rounded-lg">
      <div className="flex justify-between">
        <span className="font-semibold">Course description</span>
        <button
          onClick={toggleEditing}
          className="flex items-center space-x-2 px-2 py-1 rounded-md bg-slate-100 hover:bg-slate-200"
        >
          {!isEditing ? (
            <>
              <Pencil strokeWidth={2.3} className="size-[15px]" />
              <span className="font-semibold text-sm">Edit description</span>
            </>
          ) : (
            <span className="font-semibold">Cancel</span>
          )}
        </button>
      </div>
      <div>
        {!isEditing ? (
          <p className="text-sm">{!description ? 'No description' : description}</p>
        ) : (
          <>
            <form action={editDescription} className="flex flex-col space-y-2">
              <textarea
                rows={3}
                maxLength={2000}
                id="description"
                name="description"
                placeholder="e.g. 'This course is about...'"
                defaultValue={description ? description : null}
                className="pl-2 border-2 border-gray-400  rounded-md"
                required
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
