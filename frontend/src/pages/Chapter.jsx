import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { LayoutDashboard, ArrowLeft, Eye, Video, TriangleAlert } from 'lucide-react';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import ChapterTitleForm from '../components/teacher/ChapterTitleForm';
import ChapterDescriptionForm from '../components/teacher/ChapterDescriptionForm';
import ChapterAccessForm from '../components/teacher/ChapterAccessForm';
import ChapterVideoForm from '../components/teacher/ChapterVideoForm';
import Banner from '../components/components/Banner';
import ChapterActions from '../components/teacher/ChapterActions';

export default function Chapter() {
  const navigate = useNavigate();
  const { courseId, chapterId } = useParams();
  const [chapter, setChapter] = useState();
  const [chapterChanged, setChapterChanged] = useState(false);
  const linkRef = useRef(null);

  useEffect(() => {
    async function getChapter() {
      linkRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
      const data = await axios.get(`${import.meta.env.VITE_API_URL}/courses/${courseId}/chapters/${chapterId}/teacher`);
      const chapter = data.data.data.chapter;
      if (!chapter) return navigate('/');
      setChapter(chapter);
    }

    getChapter();
  }, [chapterChanged]);

  const requiredFields = [chapter?.title, chapter?.description, chapter?.videoUrl];
  const completedFields = requiredFields.filter(Boolean).length;
  const isCompleted = requiredFields.every(Boolean);

  return (
    <>
      {!chapter?.isPublished && (
        <Banner>
          <TriangleAlert className="size-5" />
          <p>This chapter is unpublished. It will not be visible in the course.</p>
        </Banner>
      )}
      <div className="p-6">
        <Link
          ref={linkRef}
          to={`/teacher/courses/${courseId}`}
          className="group flex items-center w-max space-x-1 text-sm text-gray-700 mb-6"
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-1" />
          <span>Back to course setup</span>
        </Link>
        <div className="flex justify-between flex-col space-y-4 md:space-y-0 md:flex-row">
          <div>
            <h1 className="text-2xl font-bold ml-0">Chapter creation</h1>
            <span className="text-sm text-gray-500">
              Complete all fields ({completedFields}/{requiredFields.length})
            </span>
          </div>
          <div>
            <ChapterActions
              isPublished={chapter?.isPublished}
              courseId={courseId}
              chapterId={chapter?.chapter_id}
              setChapterChanged={setChapterChanged}
              isCompleted={isCompleted}
            />
          </div>
        </div>
        <div className="flex flex-col space-x-0 mt-8 lg:flex-row lg:space-x-20 lg:mt-16">
          <div className="lg:w-[40%]">
            <div className="flex items-center space-x-2">
              <div className="bg-sky-100 rounded-full size-9 p-[3px] flex justify-center items-center">
                <LayoutDashboard className="size-6" color="#0369a1" />
              </div>
              <h2 className="text-xl font-semibold">Cutomize chapter</h2>
            </div>

            <ChapterTitleForm
              title={chapter?.title}
              chapterId={chapter?.chapter_id}
              courseId={courseId}
              setChapterChanged={setChapterChanged}
            />
            <ChapterDescriptionForm
              description={chapter?.description}
              chapterId={chapter?.chapter_id}
              courseId={courseId}
              setChapterChanged={setChapterChanged}
            />

            <div className="flex items-center space-x-2 mt-10">
              <div className="bg-sky-100 rounded-full size-9 p-[3px] flex justify-center items-center">
                <Eye className="size-6" color="#0369a1" />
              </div>
              <h2 className="text-xl font-semibold">Access Settings</h2>
            </div>

            <ChapterAccessForm
              isFree={chapter?.isFree}
              chapterId={chapter?.chapter_id}
              courseId={courseId}
              setChapterChanged={setChapterChanged}
            />
          </div>
          <div className="xl:w-[40%] lg:w-[50%] mt-10 lg:mt-0">
            <div className="flex items-center space-x-2">
              <div className="bg-sky-100 rounded-full size-9 p-[3px] flex justify-center items-center">
                <Video className="size-6" color="#0369a1" />
              </div>
              <h2 className="text-xl font-semibold">Add a video</h2>
            </div>
            <ChapterVideoForm
              videoUrl={chapter?.videoUrl}
              chapterId={chapter?.chapter_id}
              courseId={courseId}
              setChapterChanged={setChapterChanged}
            />
          </div>
        </div>
        <Toaster />
      </div>
    </>
  );
}
