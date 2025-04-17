import Logo from './navbar/Logo';
import Links from './navbar/Links';
import Buttons from './navbar/Buttons';

export default function Navbar({ isOpen, setIsOpen }) {
  return (
    <nav className="font-poppins flex justify-between items-center px-4 md:px-10 py-5 bg-white relative z-10 shadow-lg">
      <Logo />
      <Links />
      <Buttons isOpen={isOpen} setIsOpen={setIsOpen} />
    </nav>
  );
}
