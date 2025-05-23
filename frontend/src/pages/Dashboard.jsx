import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import DashboardCourseList from '../components/student/DashboardCourseList';
import ApplyModal from '../components/student/ApplyModal';
import InfoCard from '../components/student/InfoCard';
import Banner from '../components/components/Banner';
import { X } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

export default function Dashboard() {
  const state = useOutletContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [courseStats, setCourseStats] = useState({ completed: 0, inProgress: 0 });

  return (
    <>
      {state.isBannerOpen && (
        <Banner>
          <div className="flex justify-between items-center w-full text-[0.940rem]">
            <p className="text-red-950">
              You don't have access to create courses.{' '}
              <button onClick={() => setIsModalVisible(true)} className="text-blue-600 underline">
                Click here for apply.
              </button>
            </p>
            <button onClick={() => state.setIsBannerOpen(false)} className="mr-3">
              <X className="text-gray-700" />
            </button>
          </div>
        </Banner>
      )}
      {isModalVisible && <ApplyModal setIsModalVisible={setIsModalVisible} />}
      <div className="p-4 lg:p-10">
        <div className="flex flex-col mb-10 space-y-4 md:flex-row md:space-x-5 md:space-y-0">
          <InfoCard count={courseStats.inProgress} />
          <InfoCard variant="success" count={courseStats.completed} />
        </div>
        <DashboardCourseList setCourseStats={setCourseStats} />
      </div>
      <Toaster />
    </>
  );
}
