import HomeButton from '../../components/HomeButton';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';

export default function ContactUs() {
  return (
    <div className="flex flex-col gap-2 md:gap-5">
      <p className="font-league_spartan text-white text-xl font-bold">Contact Us</p>
      <p>Enter your email address to register to our newsletter subscription</p>
      <div className="flex flex-col md:flex-row gap-3">
        <input type="text" placeholder="Your email" className="rounded-md pl-4 py-3 md:py-0" />
        <HomeButton>Subscribe</HomeButton>
      </div>
      <div className="flex justify-between md:justify-normal gap-5 mt-4">
        <a href="">
          <FaFacebook size={20} />
        </a>
        <a href="">
          <FaLinkedin size={20} />
        </a>
        <a href="">
          <FaInstagram size={20} />
        </a>
        <a href="">
          <FaTwitter size={20} />
        </a>
        <a href="">
          <FaYoutube size={20} />
        </a>
      </div>
    </div>
  );
}
