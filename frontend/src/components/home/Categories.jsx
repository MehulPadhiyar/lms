import CategoryCard from './categories/CategoryCard';
import { Binary, DraftingCompass, Handshake, Drum } from 'lucide-react';

export default function Categories() {
  return (
    <div id="categories" className="pt-[60px] px-4 xl:px-44 md:pb-16 pb-6">
      <div className="text-center font-poppins mb-10 md:mb-20 space-y-4">
        <p className="text-radical_red uppercase text-xs md:text-[1rem] font-medium">Categories</p>
        <h2 className="font-league_spartan text-3xl md:text-[3rem] font-semibold">
          Expand Your <span className="text-primary">Knowledge</span> in Every Subject.
        </h2>
        <p className="text-slate-400 text-xs md:text-[1rem]">
          Choose from a variety of courses across different fields.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
        <CategoryCard
          icon={<Binary size={60} strokeWidth={1} />}
          categoryName="Computer Science"
          totalCourses={1}
          bgColor1="bg-category1_bg"
          bgColor2="bg-category1_bg2"
          textColor="text-kappel"
        >
          Learn programming, AI, cybersecurity, and more with expert-led Computer Science courses.
        </CategoryCard>

        <CategoryCard
          icon={<DraftingCompass size={50} strokeWidth={1} />}
          categoryName="Maths"
          totalCourses={1}
          bgColor1="bg-category2_bg"
          bgColor2="bg-category2_bg2"
          textColor="text-radical_red"
        >
          Master algebra, calculus, statistics, geometry, and more with expert-led Maths courses.
        </CategoryCard>

        <CategoryCard
          icon={<Handshake size={50} strokeWidth={1} />}
          categoryName="Business"
          totalCourses={1}
          bgColor1="bg-category3_bg"
          bgColor2="bg-category3_bg2"
          textColor="text-category3_text"
        >
          Learn marketing, finance, entrepreneurship, management, and more with expert-led Business courses.
        </CategoryCard>

        <CategoryCard
          icon={<Drum size={45} strokeWidth={1} />}
          categoryName="Music"
          totalCourses={1}
          bgColor1="bg-category4_bg"
          bgColor2="bg-category4_bg2"
          textColor="text-selective_yellow"
        >
          Explore singing, instruments, music theory, composition, and more with expert-led Music courses.
        </CategoryCard>
      </div>
    </div>
  );
}
