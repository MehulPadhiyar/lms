import Hero from '../components/home/Hero';
import Navbar from '../components/home/Navbar';
import Categories from '../components/home/Categories';
import AboutUs from '../components/home/AboutUs';
import PopularCourses from '../components/home/PopularCourses';
import Video from '../components/home/Video';
import Stats from '../components/home/Stats';
import Footer from '../components/home/Footer';
import Sidebar from '../components/components/Sidebar';
import { useState } from 'react';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className={`h-full w-full xl:hidden backdrop-blur-sm fixed inset-y-0 z-50 ${
          isOpen ? 'flex flex-col' : 'hidden'
        }`}
      >
        <div
          className={`border-r-2 h-full w-full md:w-[35%] lg:[25%] fixed inset-y-0 z-50
          }`}
        >
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
      <Hero />
      <Categories />
      <AboutUs />
      <PopularCourses />
      <Video />
      <Stats />
      <Footer />
    </>
  );
}
