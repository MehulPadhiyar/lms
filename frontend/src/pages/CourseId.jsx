import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ListChecks, BadgeIndianRupee, TriangleAlert } from 'lucide-react';
import axios from 'axios';
import TitleForm from '../components/teacher/TitleForm';
import DescriptionForm from '../components/teacher/DescriptionForm';
import ImageForm from '../components/teacher/ImageForm';
import CategoryForm from '../components/teacher/CategoryForm';
import PriceForm from '../components/teacher/PriceForm';
import ChaptersForm from '../components/teacher/ChaptersForm';
import { Toaster } from 'react-hot-toast';
import CourseAction from '../components/teacher/CourseAction';
import Banner from '../components/components/Banner';

const categories = {
  1: 'Computer Science',
  2: 'Music',
  3: 'Cooking',
  4: 'Maths',
  5: 'Management',
  6: 'Business',
};

export default function CourseId() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [course, setCourse] = useState();
  const [courseChanged, setCourseChanged] = useState(false);
  const courseRef = useRef();

  useEffect(() => {
    async function getCourse() {
      courseRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/courses/teacher/${id}`, {
        withCredentials: true,
      });
      if (!res.data.data.course) return navigate('/');
      const course = res.data.data.course;
      setCourse(course);
    }

    getCourse();
  }, [courseChanged]);

  const requiredFields = [course?.title, course?.description, course?.image_url, course?.price, course?.category_id];
  const completedFields = requiredFields.filter(Boolean).length;
  const isCompleted = requiredFields.every(Boolean) && course?.chapters.some((chap) => chap.isPublished);

  return (
    <>
      {course?.status === 'draft' && (
        <Banner>
          <TriangleAlert className="size-5" />
          <p>This course is unpublished. It will not be visible to the student other than enrolled.</p>
        </Banner>
      )}
      <div ref={courseRef} className="p-4 pb-10 w-full md:p-6 xl:max-w-[80%]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold ml-0">Course setup</h1>
            <span className="text-sm text-gray-500">
              Complete all fields ({completedFields}/{requiredFields.length})
            </span>
          </div>
          <div>
            <CourseAction
              courseId={course?.course_id}
              isCompleted={isCompleted}
              setCourseChanged={setCourseChanged}
              isPublished={course?.status === 'pending' || course?.status === 'verified'}
            />
          </div>
        </div>
        <div className="flex flex-col space-x-0 lg:flex-row lg:space-x-20">
          <div className="w-full">
            <div className="flex items-center space-x-2 mt-8 lg:mt-16">
              <div className="bg-secondary rounded-full size-9 p-[3px] flex justify-center items-center">
                <LayoutDashboard className="size-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Cutomize your course</h2>
            </div>

            <TitleForm title={course?.title} id={course?.course_id} setCourseChanged={setCourseChanged} />

            <DescriptionForm
              description={course?.description}
              id={course?.course_id}
              setCourseChanged={setCourseChanged}
            />

            <ImageForm image_url={course?.image_url} id={course?.course_id} setCourseChanged={setCourseChanged} />

            <CategoryForm
              category={course?.category_id ? categories[course?.category_id] : null}
              id={course?.course_id}
              setCourseChanged={setCourseChanged}
            />
          </div>

          <div className="w-full">
            <div className="flex items-center space-x-2 mt-10 lg:mt-16">
              <div className="bg-secondary rounded-full size-9 p-[3px] flex justify-center items-center">
                <ListChecks className="size-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Course chapters</h2>
            </div>
            <ChaptersForm chapters={course?.chapters} id={course?.course_id} setCourseChanged={setCourseChanged} />

            <div className="flex items-center space-x-2 mt-8">
              <div className="bg-secondary rounded-full size-9 p-[4px] flex justify-center items-center">
                <BadgeIndianRupee className="size-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Sell your course</h2>
            </div>
            <PriceForm price={course?.price} id={course?.course_id} setCourseChanged={setCourseChanged} />
          </div>
        </div>

        <Toaster />
      </div>
    </>
  );
}
