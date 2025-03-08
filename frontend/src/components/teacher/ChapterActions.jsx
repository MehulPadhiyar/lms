import { Trash2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import AlertBox from '../components/AlertBox';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChapterActions({ isPublished, chapterId, courseId, setChapterChanged, isCompleted }) {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  async function togglePublish() {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/courses/${courseId}/chapters/${chapterId}`,
        { isPublished: !isPublished },
        { withCredentials: true }
      );
      toast.success(`Chapter ${isPublished ? 'unpublished' : 'published'}!`);
      setChapterChanged((prev) => !prev);
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function deleteChapter() {
    try {
      console.log(courseId, chapterId);
      await axios.delete(`${import.meta.env.VITE_API_URL}/courses/${courseId}/chapters/${chapterId}`, {
        withCredentials: true,
      });
      toast.success(`Chapter deleted!`);
      navigate(`/teacher/courses/${courseId}`);
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <>
      <div className="flex space-x-2">
        <button
          onClick={togglePublish}
          disabled={!isCompleted}
          className={`${
            isPublished ? 'bg-slate-100 text-gray-600 hover:bg-gray-300' : 'bg-primary text-white hover:opacity-90'
          } px-3 py-[6px] rounded-lg font-semibold text-sm disabled:bg-gray-100 disabled:text-gray-200`}
        >
          {isPublished ? 'Unpublish' : 'Publish'}
        </button>
        <button
          onClick={() => setIsModalVisible(true)}
          className="bg-black text-white px-3 rounded-md hover:bg-gray-800"
        >
          <Trash2 className="size-4" />
        </button>
      </div>
      {isModalVisible && (
        <AlertBox setIsModalVisible={setIsModalVisible} action={deleteChapter}>
          <h2 className="mb-2 font-bold text-2xl">Are you sure?</h2>
          <p className="text-gray-500">This action cannot be undone. This will permanently delete this chapter.</p>
        </AlertBox>
      )}
    </>
  );
}
