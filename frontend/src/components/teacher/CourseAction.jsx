import axios from 'axios';
import toast from 'react-hot-toast';
import AlertBox from '../components/AlertBox';
import { useState } from 'react';

export default function CourseActions({ isPublished, courseId, setCourseChanged, isCompleted }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  async function updateStatus() {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/courses/${courseId}`,
        { status: 'pending' },
        { withCredentials: true }
      );

      toast.success(`Course is sent for verification.`);
      setCourseChanged((prev) => !prev);
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <>
      <button
        onClick={() => setIsModalVisible(true)}
        disabled={!isCompleted || isPublished}
        className={`bg-black text-white px-3 py-[6px] rounded-lg font-semibold hover:opacity-90 text-sm disabled:text-slate-100 disabled:bg-gray-200 disabled:opacity-90 disabled:cursor-not-allowed ${
          isPublished && 'bg-gray-500'
        }`}
      >
        {isPublished ? 'Unpublish' : 'Publish'}
      </button>
      {isModalVisible && (
        <AlertBox setIsModalVisible={setIsModalVisible} action={updateStatus}>
          <h2 className="mb-2 font-bold text-2xl">Are you sure?</h2>
          <p className="text-gray-500">
            Review all course details carefully before publishing. Once published, you can only edit the course.
          </p>
        </AlertBox>
      )}
    </>
  );
}
