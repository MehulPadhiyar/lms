import SidebarItem from './SidebarItem';
import { LayoutDashboard, Compass, List, ChartBar } from 'lucide-react';

const guestRoutes = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    href: '/',
  },
  {
    icon: Compass,
    label: 'Browse',
    href: '/search',
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

export default function SidebarRoutes({ setIsOpen }) {
  const pathname = window.location.pathname;
  const isTeacher = pathname.startsWith('/teacher');
  const routes = isTeacher ? teacherRoutes : guestRoutes;
  return routes.map((route) => (
    <SidebarItem key={route.href} Icon={route.icon} label={route.label} href={route.href} setIsOpen={setIsOpen} />
  ));
}
