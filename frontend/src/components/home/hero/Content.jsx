import HomeButton from '../../components/HomeButton';

export default function Content() {
  return (
    <div className="w-full place-items-center text-center lg:text-left lg:place-items-start lg:w-[50%] mt-0 md:mt-4 md:space-y-7 space-y-3">
      <h1 className="text-3xl md:text-5xl xl:text-[3.5rem] font-semibold font-league_spartan leading-tight">
        Empower Your <span className="text-radical_red">Learning</span> Journey with Online Courses
      </h1>
      <p className="text-sm md:text-xl">
        Unlock your potential with expert-led courses. Learn, grow, and achieve your goals today!
      </p>

      <a href="/#courses" className="block">
        <HomeButton>Find courses</HomeButton>
      </a>
    </div>
  );
}
