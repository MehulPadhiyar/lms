import { useState } from 'react';
import { Pencil } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ImageForm({ image_url, id, setCourseChanged }) {
  const [isEditing, setIsEditing] = useState(false);
  function toggleEditing() {
    setIsEditing((prev) => !prev);
  }

  async function editImage(formData) {
    try {
      const photo = formData.get('course-image');

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/courses/${id}`,
        { photo },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );

      toast.success('Image uploaded!');
      setCourseChanged((prev) => !prev);
      setIsEditing((prev) => !prev);
    } catch (err) {
      toast.error(err.message);
    }
  }
  return (
    <div className="bg-slate-100 py-2 px-4 mt-6 space-y-2 rounded-lg">
      <div className="flex justify-between">
        <span className="font-semibold">Course image</span>
        <button
          onClick={toggleEditing}
          className="flex items-center space-x-2 px-2 py-1 rounded-md bg-slate-100 hover:bg-slate-200"
        >
          {!isEditing ? (
            <>
              <Pencil strokeWidth={2.3} className="size-[15px]" />
              <span className="font-semibold text-sm">Edit image</span>
            </>
          ) : (
            <span className="font-semibold">Cancel</span>
          )}
        </button>
      </div>
      <div>
        {!isEditing ? (
          !image_url ? (
            <p className="text-sm">No image</p>
          ) : (
            <img src={`/course/img/${image_url}`} alt="course image" className="max-w-full h-auto"></img>
          )
        ) : (
          <>
            <form action={editImage} className="flex flex-col space-y-2">
              <input type="file" name="course-image" id="course-image" accept="image/jpg, image/png" required />
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
