import { NavLink } from 'react-router-dom';

export default function SidebarItem({ isHome, href, Icon, label, setIsOpen }) {
  return !isHome ? (
    <NavLink
      to={href}
      className={({ isActive }) => {
        return isActive
          ? 'pl-8 w-full rounded-xl flex items-center py-4 bg-white text-primary font-extrabold'
          : 'pl-8 w-full flex items-center py-4 text-white';
      }}
      onClick={() => setIsOpen(false)}
    >
      <Icon className={'size-5 mr-4'} />
      {label}
    </NavLink>
  ) : (
    <NavLink to={href} className="pl-8 w-full flex items-center py-4 text-white" onClick={() => setIsOpen(false)}>
      <Icon className={'size-5 mr-4'} />
      {label}
    </NavLink>
  );
}
