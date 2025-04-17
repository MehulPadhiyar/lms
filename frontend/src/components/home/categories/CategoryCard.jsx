export default function CategoryCard({ children, icon, categoryName, totalCourses, bgColor1, bgColor2, textColor }) {
  return (
    <div className={`px-7 py-14 ${bgColor1} flex flex-col items-center gap-6 text-center rounded-md`}>
      <div className={`${bgColor2} ${textColor} size-20 rounded-full place-items-center place-content-center`}>
        {icon}
      </div>
      <a href="/" className="text-2xl font-bold leading-none">
        {categoryName}
      </a>
      <p>{children}</p>
      <p className={`${bgColor2} ${textColor} px-3 py-[2px] rounded-md`}>{totalCourses} Courses</p>
    </div>
  );
}
