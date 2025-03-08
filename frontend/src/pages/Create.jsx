import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

export default function Create() {
  const navigate = useNavigate();
  async function onSubmit(formData) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/courses`,
        {
          title: formData.get('title'),
        },
        { withCredentials: true }
      );
      toast.success('Course created.');
      setTimeout(() => navigate(`/teacher/courses/${response.data.data.course.course_id}`), 2000);
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div className="h-full flex flex-col justify-center items-center pb-[15rem]">
      <div>
        <h1 className="font-bold text-3xl mb-1">Name your course</h1>
        <p>What would you like to call your course? Enter the title below!</p>

        <form action={onSubmit}>
          <label htmlFor="title" className="flex flex-col mt-10">
            <span className="font-semibold mb-1">Course title</span>
            <input
              defaultValue="web"
              type="text"
              id="title"
              name="title"
              placeholder="e.g. Web Development Course"
              className="border-2 border-gray-400 rounded-md py-[3px] mb-6 pl-2"
              required
            />
          </label>
          <Link to={'/'} className="px-4 py-[8.5px] mr-4 rounded-lg bg-slate-100 hover:bg-slate-200" reloadDocument>
            <span className="font-semibold text-sm pt-[6px]">Cancel</span>
          </Link>
          <button type="submit" className="text-sm bg-black text-white px-4 py-[7.5px] rounded-lg hover:bg-gray-800">
            Continue
          </button>
          <Toaster />
        </form>
      </div>
    </div>
  );
}
