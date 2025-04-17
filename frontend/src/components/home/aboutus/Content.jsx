import { CheckCheck } from 'lucide-react';

export default function Content() {
  return (
    <div className="w-full lg:w-[50%] xl:w-[32%] relative">
      <p className="uppercase text-sm md:text-[1rem] font-bold text-slate-500 mb-4">about us</p>
      <h2 className="text-3xl md:text-[3rem] font-semibold font-league_spartan leading-none mb-6">
        Over 10 Years in <span className="text-radical_red">Distant learning</span> for Skill Development
      </h2>
      <p className="text-slate-500 text-sm md:text-[1rem] mb-7">
        Empowering learners with quality education through interactive and engaging courses. Join us to explore, learn,
        and grow at your own pace!
      </p>
      <div className="space-y-4 text-sm md:text-[1rem]">
        <div className="flex gap-3 text-selective_yellow">
          <CheckCheck /> <span className="text-black">Expert Trainers</span>
        </div>
        <div className="flex gap-3 text-selective_yellow">
          <CheckCheck /> <span className="text-black">Online Remote Learning</span>
        </div>
        <div className="flex gap-3 text-selective_yellow">
          <CheckCheck /> <span className="text-black">Lifetime Access</span>
        </div>
      </div>
      <img src="/about-shape-4.svg" alt="about shape" className="hidden xl:block absolute top-8 right-[-70px] z-[-1]" />
    </div>
  );
}
