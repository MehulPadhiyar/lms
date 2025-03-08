import { Lock, CirclePlay, CircleCheckBig } from 'lucide-react';
import { NavLink, useParams } from 'react-router-dom';

export default function CourseSidebarItem({ courseId, chapterId, title, isLocked, isCompleted }) {
  const params = useParams();

  function isActiveChapter() {
    return params.chapterId === chapterId;
  }

  return (
    <div className={`hover:bg-slate-100 text-slate-500 ${isActiveChapter() && 'bg-slate-100 border-r-4 border-black'}`}>
      <NavLink to={`courses/${courseId}/chapters/${chapterId}`} className="flex items-center py-4 ml-4 space-x-2">
        {isCompleted ? <CircleCheckBig className="text-emerald-700" /> : isLocked ? <Lock /> : <CirclePlay />}
        <p className={`${isCompleted && 'text-emerald-700'} text-[1rem] font-bold`}>{title}</p>
      </NavLink>
    </div>
  );
}
