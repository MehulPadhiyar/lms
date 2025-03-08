import { useState } from 'react';
import { Pencil } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function CategoryForm({ category, id, setCourseChanged }) {
  const [isEditing, setIsEditing] = useState(false);

  function toggleEditing() {
    setIsEditing((prev) => !prev);
  }

  async function editCategory(formData) {
    try {
      const category = formData.get('category');
      await axios.patch(`${import.meta.env.VITE_API_URL}/courses/${id}`, { category }, { withCredentials: true });
      toast.success('Category updated!');
      setCourseChanged((prev) => !prev);
      setIsEditing((prev) => !prev);
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div className="bg-slate-100 py-2 px-4 mt-6 space-y-2 rounded-lg">
      <div className="flex justify-between">
        <span className="font-semibold">Course category</span>
        <button
          onClick={toggleEditing}
          className="flex items-center space-x-2 px-2 py-1 rounded-md bg-slate-100 hover:bg-slate-200"
        >
          {!isEditing ? (
            <>
              <Pencil strokeWidth={2.3} className="size-4" />
              <span className="font-semibold">Edit category</span>
            </>
          ) : (
            <span className="font-semibold">Cancel</span>
          )}
        </button>
      </div>
      <div>
        {!isEditing ? (
          <span className="text-sm">{category ? category : 'No category'}</span>
        ) : (
          <>
            <form action={editCategory} className="flex flex-col space-y-2">
              <select
                defaultValue={category ? category : 'Computer Science'}
                name="category"
                id="category"
                className="py-1 pl-1 rounded-lg border-gray-400 border-2 mb-1"
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Music">Music</option>
                <option value="Cooking">Cooking</option>
                <option value="Maths">Maths</option>
                <option value="Management">Management</option>
                <option value="Business">Business</option>
              </select>
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
