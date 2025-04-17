import { Search, ShoppingCart } from 'lucide-react';
import HomeButton from '../../components/HomeButton';
import Hamburger from 'hamburger-react';

export default function Buttons({ isOpen, setIsOpen }) {
  return (
    <div className="flex space-x-9">
      <button className="hover:text-primary">
        <Search size={22} strokeWidth={1.5} />
      </button>
      <button className="hover:text-primary">
        <ShoppingCart size={22} strokeWidth={1.5} />
      </button>

      <a href="/signup" className="hidden md:block">
        <HomeButton>Try for free</HomeButton>
      </a>
      <div className="xl:hidden">
        <Hamburger toggled={isOpen} toggle={setIsOpen} rounded />
      </div>
    </div>
  );
}
