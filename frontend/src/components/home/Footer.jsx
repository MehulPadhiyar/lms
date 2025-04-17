import ContactUs from './Footer/ContactUs';
import Details from './Footer/Details';
import Links from './Footer/Links';
import OnlinePlatform from './Footer/OnlinePlatform';

export default function Footer() {
  return (
    <div id="contact" className="bg-eerie_black_2 lg:px-44 md:px-24 px-8 pt-10 md:pt-20 pb-10">
      <div className=" text-gray-400 grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-0 lg:grid-cols-[1fr_20%_20%_1fr]">
        <Details />
        <OnlinePlatform />
        <Links />
        <ContactUs />
      </div>
      <div className="text-center text-white mt-16 lg:mt-32">
        <p className="text-sm md:text-[1rem]">
          Copyright 2025 All Rights Reserved by{' '}
          <a href="/" className="text-kappel">
            @Learnify
          </a>
        </p>
      </div>
    </div>
  );
}
