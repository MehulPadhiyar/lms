import StatCard from './stats/StatCard';

export default function Stats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 px-4 sm:px-20 xl:px-44 pt-8 pb-16 md:pb-28">
      <StatCard stats="29.3k" text="Student Enrolled" bgColor="bg-category1_bg" textColor="text-kappel" />

      <StatCard stats="32.4K" text="Class Completed" bgColor="bg-category2_bg" textColor="text-radical_red" />

      <StatCard stats="100%" text="Satisfaction Rate" bgColor="bg-category3_bg" textColor="text-category3_text" />

      <StatCard stats="354+" text="Top Instructors" bgColor="bg-category4_bg" textColor="text-selective_yellow" />
    </div>
  );
}
