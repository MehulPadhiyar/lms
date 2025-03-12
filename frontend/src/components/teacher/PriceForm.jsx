import { useState } from 'react';
import { Pencil } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function PriceForm({ price, id, setCourseChanged }) {
  const [isEditing, setIsEditing] = useState(false);
  function toggleEditing() {
    setIsEditing((prev) => !prev);
  }

  async function editPrice(formData) {
    try {
      const price = Number(formData.get('price'));
      await axios.patch(`${import.meta.env.VITE_API_URL}/courses/${id}`, { price }, { withCredentials: true });
      toast.success('Price updated!');
      setCourseChanged((prev) => !prev);
      setIsEditing((prev) => !prev);
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div className="bg-slate-100 py-5 px-4 mt-6 space-y-0 md:space-y-2 rounded-lg">
      <div className="flex justify-between">
        <span className="font-semibold">Course price</span>
        <button
          onClick={toggleEditing}
          className="flex items-center space-x-2 px-2 py-1 rounded-md bg-slate-100 hover:bg-slate-200"
        >
          {!isEditing ? (
            <>
              <Pencil strokeWidth={2.3} className="size-4" />
              <span className="font-semibold">Edit price</span>
            </>
          ) : (
            <span className="font-semibold">Cancel</span>
          )}
        </button>
      </div>
      <div>
        {!isEditing ? (
          <span className="text-[1rem]">{price ? `₹${price}` : 'No price'}</span>
        ) : (
          <>
            <form action={editPrice} className="flex flex-col space-y-2">
              <input
                type="number"
                name="price"
                id="price"
                required
                max={4000}
                min={1}
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
