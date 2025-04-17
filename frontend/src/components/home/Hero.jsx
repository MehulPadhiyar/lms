import Content from './hero/Content';
import Banner from './hero/Banner';

export default function Hero() {
  return (
    <div
      id="home"
      className="bg-[url('/public/hero-bg.svg')] bg-cover bg-center bg-no-repeat flex flex-col lg:flex-row gap-10 xl:gap-24 pt-8 lg:pt-20 xl:pt-[130px] pb-4 xl:pb-[220px] px-4 lg:px-10 xl:px-44"
    >
      <Content />
      <Banner />
    </div>
  );
}
