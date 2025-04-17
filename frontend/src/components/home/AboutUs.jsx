import Banner from './aboutus/Banner';
import Content from './aboutus/Content';

export default function AboutUs() {
  return (
    <div
      id="about"
      className="px-4 sm:px-20 lg:px-0 lg:pl-20 xl:pl-60 pt-8 lg:pt-24 xl:pt-24 pb-10 lg:pb-48 flex flex-col lg:flex-row gap-10 sm:gap-20 lg:gap-10 xl:gap-0"
    >
      <Banner />
      <Content />
    </div>
  );
}
