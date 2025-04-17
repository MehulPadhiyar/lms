export default function Banner() {
  return (
    <div className="w-full lg:w-[50%] flex justify-center gap-2 sm:gap-8 relative">
      <div className="w-56 md:w-[270px] lg:h-[300px] overflow-hidden z-10">
        <img
          src="/hero-banner-1.jpg"
          alt="hero image"
          className="h-56 sm:h-auto rounded-se-[4.4rem] rounded-bl-[7rem]"
        />
      </div>
      <div className="w-48 md:w-[240px] lg:h-[370px] mt-0 md:mt-24 overflow-hidden z-10">
        <img
          src="/hero-banner-2.jpg"
          alt="hero image"
          className="h-56 sm:h-auto rounded-ss-[3rem] rounded-br-[5.6rem]"
        />
      </div>
      <img src="/hero-shape-1.svg" alt="contact img" className="hidden md:block absolute bottom-[-42px] z-10" />
      <div className="w-[622px] h-[551px] absolute top-[-5rem] z-[0] hidden xl:block">
        <img src="/hero-shape-2.png" alt="background image" />
      </div>
    </div>
  );
}
