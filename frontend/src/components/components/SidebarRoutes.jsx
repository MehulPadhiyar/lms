import SidebarItem from './SidebarItem';
import { LayoutDashboard, Compass, List, ChartBar, BadgeCheck, ClipboardList, UserRoundCheck } from 'lucide-react';

const userRoutes = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    href: '/dashboard',
  },
  {
    icon: Compass,
    label: 'Browse',
    href: '/search',
  },
];

const homeRoutes = [
  {
    icon: LayoutDashboard,
    label: 'Home',
    href: '/#home',
  },
  {
    icon: LayoutDashboard,
    label: 'About',
    href: '/#about',
  },
  {
    icon: LayoutDashboard,
    label: 'Courses',
    href: '/#courses',
  },
  {
    icon: LayoutDashboard,
    label: 'Categories',
    href: '/#categories',
  },
  {
    icon: LayoutDashboard,
    label: 'Contact',
    href: '/#contact',
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: 'Courses',
    href: '/teacher/courses',
  },
  {
    icon: ChartBar,
    label: 'Analytics',
    href: '/teacher/analytics',
  },
];

const adminRoutes = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    href: '/admin/dashboard',
  },
  {
    icon: UserRoundCheck,
    label: 'Verify Instructors',
    href: '/admin/verify/instructors',
  },
  {
    icon: BadgeCheck,
    label: 'Verify Courses',
    href: '/admin/verify/courses',
  },
  {
    icon: ClipboardList,
    label: 'Reports',
    href: '/admin/reports',
  },
];

export default function SidebarRoutes({ setIsOpen }) {
  const pathname = window.location.pathname;

  const isHome = pathname === '/';
  const isTeacher = pathname.startsWith('/teacher');
  const isAdmin = pathname.startsWith('/admin');

  const routes = isHome ? homeRoutes : isTeacher ? teacherRoutes : isAdmin ? adminRoutes : userRoutes;

  return routes.map((route) => (
    <SidebarItem
      isHome={isHome}
      key={route.href}
      Icon={route.icon}
      label={route.label}
      href={route.href}
      setIsOpen={setIsOpen}
    />
  ));
}
