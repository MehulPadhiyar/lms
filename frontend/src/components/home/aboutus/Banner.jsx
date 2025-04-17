export default function Banner() {
  return (
    <div className="relative mt-10 w-full lg:w-[56%] flex justify-center lg:justify-normal">
      <div>
        <img src="/about-banner.jpg" alt="about banner" className="rounded-2xl" />
      </div>
      <img
        src="/about-shape-1.svg"
        alt="about shape"
        className="absolute bottom-[50px] hidden md:block md:left-[400px] lg:left-[210px] xl:left-[300px]"
      />
      <img
        src="/about-shape-2.svg"
        alt="about shape"
        className="absolute bottom-[-90px] left-[-56px] sm:bottom-[-150px] sm:left-[-120px]"
      />
      <img
        width="722px"
        src="/about-shape-3.png"
        alt="about shape"
        className="hidden xl:block h-auto absolute bottom-[-80px] right-36 z-[-1]"
      />
    </div>
  );
}
