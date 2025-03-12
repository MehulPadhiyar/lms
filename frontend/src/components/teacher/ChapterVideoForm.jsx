import { useState, useRef } from 'react';
import { Pencil } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ChapterVideoForm({ videoUrl, courseId, chapterId, setChapterChanged }) {
  const [isEditing, setIsEditing] = useState(false);
  const [videoUploaded, setVideoUploaded] = useState(false);
  const videoRef = useRef(null);
  function toggleEditing() {
    setIsEditing((prev) => !prev);
  }

  async function editVideo(formData) {
    try {
      const video = formData.get('chapter-video');
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/courses/${courseId}/chapters/${chapterId}`,
        { video },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );

      toast.success('Video uploaded!');
      setChapterChanged((prev) => !prev);
      setIsEditing((prev) => !prev);
      setVideoUploaded(true);
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div className="bg-slate-100 py-2 lg:pb-4 px-4 mt-6 space-y-2 rounded-lg">
      <div className="flex justify-between items-center">
        <span className="font-semibold">Chapter video</span>
        <button
          onClick={toggleEditing}
          className="flex items-center space-x-2 px-2 py-1 rounded-md bg-slate-100 hover:bg-slate-200"
        >
          {!isEditing ? (
            <>
              <Pencil strokeWidth={2.3} className="size-[15px]" />
              <span className="font-semibold">Edit video</span>
            </>
          ) : (
            <span className="font-semibold">Cancel</span>
          )}
        </button>
      </div>
      <div>
        {!isEditing ? (
          !videoUrl ? (
            <p className="text-sm">No video</p>
          ) : (
            <>
              <video className="max-w-full h-auto" controls>
                <source ref={videoRef} src={`/course/video/${videoUrl}`}></source>
                Your browser doesn't support video tag.
              </video>
              {videoUploaded && (
                <p className="mt-2 text-xs text-center text-slate-500">
                  Video processing may takes sometime. Kindly refresh to see results.
                </p>
              )}
            </>
          )
        ) : (
          <>
            <form action={editVideo} className="flex flex-col space-y-2">
              <input type="file" name="chapter-video" id="chapter-video" accept="video/*" required />
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
