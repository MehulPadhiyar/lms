import { Star, LibraryBig, Users } from 'lucide-react';

export default function CourseCard({ image, level, title, price, lessons, students }) {
  return (
    <div className="rounded-md overflow-hidden min-h-[100%]">
      <div className="overflow-hidden">
        <img
          src={`/course/img/${image}`}
          alt="course image"
          className="hover:scale-110 duration-500 md:h-[13vw] h-full min-w-full object-cover"
        />
      </div>
      <div className="bg-white p-8 space-y-3">
        <p className="bg-category1_bg text-kappel text-sm px-3 py-[2px] rounded-md w-max">{level}</p>
        <h3 className="text-[1.25rem] font-medium hover:text-kappel">
          <a href={`/login`}>{title}</a>
        </h3>
        <div className="flex items-center gap-2 text-selective_yellow">
          <div className="flex">
            <Star size={15} fill="#f8b720" />
            <Star size={15} fill="#f8b720" />
            <Star size={15} fill="#f8b720" />
            <Star size={15} fill="#f8b720" />
            <Star size={15} fill="#f8b720" />
          </div>
          <p className="text-black text-sm">(5.0/7 Rating)</p>
        </div>
        <p className="text-radical_red font-semibold text-lg">{price}₹</p>
        <div className="flex">
          <div className="pr-4 flex items-center gap-2 border-r-2 text-gray-400 border-gray-400">
            <LibraryBig size={15} />
            <p className="text-[0.800rem] text-black">{lessons} Lessons</p>
          </div>
          <div className="pl-4 flex items-center gap-2 text-gray-500">
            <Users size={15} />
            <p className="text-[0.775rem] text-black">{students} Students</p>
          </div>
        </div>
      </div>
    </div>
  );
}
