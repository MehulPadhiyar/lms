import toast from 'react-hot-toast';
import axios from 'axios';

export default function VideoPlayer({ videoUrl, courseId, chapterId }) {
  const setIsCompleted = async function () {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/courses/${courseId}`, {
        withCredentials: true,
      });

      if (!res.data.data.course.isEnrolled) return;

      await axios.put(
        `${import.meta.env.VITE_API_URL}/courses/${courseId}/chapters/${chapterId}/progress`,
        { isCompleted: true },
        { withCredentials: true }
      );

      toast.success('Progress updated.');
      setTimeout(() => window.location.reload(), 1500);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="rounded-sm overflow-hidden">
      <video src={`/course/video/${videoUrl}`} onEnded={setIsCompleted} controlsList="nodownload" controls></video>
    </div>
  );
}
