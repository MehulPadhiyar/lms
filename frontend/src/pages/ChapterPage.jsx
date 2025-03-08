import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from '../components/student/VideoPlayer';
import ChapterDetails from '../components/student/ChapterDetails';
import VideoLocked from '../components/student/VideoLocked';
import toast from 'react-hot-toast';
import Banner from '../components/components/Banner';
import { TriangleAlert } from 'lucide-react';

export default function ChapterPage() {
  const { courseId, chapterId } = useParams();
  const [chapter, setChapter] = useState();
  const divRef = useRef(null);
  const isLocked = chapter?.videoUrl === null;

  useEffect(
    function () {
      divRef.current.scrollIntoView({ block: 'end', behavior: 'auto' });
      async function getChapter() {
        try {
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/courses/${courseId}/chapters/${chapterId}`, {
            withCredentials: true,
          });
          const chapter = res.data.data.chapter;
          chapter.coursePrice = res.data.data.course.price;
          setChapter(chapter);
        } catch (err) {
          if (err.status === 401) return;
          toast.error(err.message);
        }
      }
      getChapter();
    },
    [chapterId]
  );

  return (
    <>
      <div ref={divRef}>
        {isLocked && (
          <Banner>
            <TriangleAlert className="size-5" />
            <p>You need to purchase this course to watch this chapter.</p>
          </Banner>
        )}
      </div>
      <div className="px-44 pt-6">
        {!isLocked ? (
          <VideoPlayer videoUrl={chapter?.videoUrl} courseId={courseId} chapterId={chapterId} />
        ) : (
          <VideoLocked />
        )}
        <ChapterDetails
          title={chapter?.title}
          description={chapter?.description}
          coursePrice={chapter?.coursePrice}
          isLocked={isLocked}
          courseId={courseId}
          chapterId={chapterId}
        />
      </div>
    </>
  );
}
