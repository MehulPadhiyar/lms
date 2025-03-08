import { NavLink } from 'react-router-dom';

export default function SidebarItem({ href, Icon, label }) {
  return (
    <NavLink
      to={href}
      className={({ isActive }) => {
        return isActive
          ? 'pl-8 w-full rounded-xl flex items-center py-4 bg-white text-primary font-extrabold'
          : 'pl-8 w-full flex items-center py-4 text-white';
      }}
    >
      <Icon className={'size-5 mr-4'} />
      {label}
    </NavLink>
  );
}
