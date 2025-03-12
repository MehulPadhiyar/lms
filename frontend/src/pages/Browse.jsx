import { NavLink, useLocation } from 'react-router-dom';
import { FcEngineering, FcMultipleDevices, FcMusic, FcManager, FcBusinessman } from 'react-icons/fc';
import { PiCookingPotFill } from 'react-icons/pi';
import CourseList from '../components/student/CourseList';
import { useOutletContext } from 'react-router-dom';
import Banner from '../components/components/Banner';
import { X } from 'lucide-react';

const categories = [
  {
    id: 1,
    name: 'Computer Science',
    icon: <FcMultipleDevices />,
  },
  {
    id: 2,
    name: 'Music',
    icon: <FcMusic />,
  },
  {
    id: 3,
    name: 'Cooking',
    icon: <PiCookingPotFill />,
  },
  {
    id: 4,
    name: 'Maths',
    icon: <FcEngineering />,
  },
  {
    id: 5,
    name: 'Management',
    icon: <FcManager />,
  },
  {
    id: 6,
    name: 'Business',
    icon: <FcBusinessman />,
  },
];

export default function Browse() {
  const location = useLocation();
  const state = useOutletContext();

  const isActiveCategory = (category) => {
    return +location.search[location.search.length - 1] === category;
  };

  return (
    <>
      {state.isBannerOpen && (
        <Banner>
          <div className="flex justify-between items-center w-full text-[0.940rem]">
            <p className="text-red-950">
              You don't have access to create courses.{' '}
              <a href="/apply" className="text-blue-600 underline">
                Click here for apply.
              </a>
            </p>
            <button onClick={() => state.setIsBannerOpen(false)} className="mr-3">
              <X className="text-gray-700" />
            </button>
          </div>
        </Banner>
      )}
      <div className="p-4 lg:p-6">
        <div className="flex flex-col space-y-3 md:grid md:grid-cols-3 md:space-y-0 md:gap-3 lg:flex lg:justify-center lg:flex-row lg:space-y-0 lg:gap-0 lg:space-x-2">
          {categories.map((cat) => {
            return (
              <NavLink
                key={cat.id}
                to={`?categoryId=${cat.id}`}
                className={
                  isActiveCategory(cat.id)
                    ? 'flex items-center justify-center space-x-1 px-3 py-[6px] text-[0.850rem] text-sky-700 font-bold border-[2px] border-sky-700 rounded-full bg-sky-100'
                    : 'flex items-center justify-center space-x-1 px-3 py-[6px] text-[0.850rem] font-bold border-2 rounded-full border-gray-400 hover:border-sky-700'
                }
              >
                {cat.icon}
                <span>{cat.name}</span>
              </NavLink>
            );
          })}
        </div>
        <div className="flex justify-center mt-6 lg:mt-9">
          <div className="border-[1px] border-gray-300 rounded-full w-full lg:w-[70%]"></div>
        </div>
        <CourseList />
      </div>
    </>
  );
}
