import Label from '../components/Label';
import { Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Chapter({ chapter, courseId, children }) {
  const navigate = useNavigate();

  const style = chapter.isPublished
    ? { backgroundColor: '#dbeafe', color: '#0c4a6e' }
    : { backgroundColor: '#e2e8f0', borderWidth: 0 };

  function editChapter(chapterId) {
    navigate(`/teacher/courses/${courseId}/chapters/${chapterId}`);
  }

  return (
    <div style={style} className="border-[1px] border-sky-300 rounded-lg h-10 flex justify-between">
      <div className="flex">
        <span
          style={chapter.isPublished ? { borderColor: '#7dd3fc' } : {}}
          className="border-r-[1px] p-1 w-[30px] flex justify-center items-center border-gray-400"
        >
          {children}
        </span>
        <p className="flex items-center ml-4">{chapter.title}</p>
      </div>
      <div className="flex items-center space-x-2">
        {chapter.isFree && <Label bgColor="black">Free</Label>}
        {chapter.isPublished ? <Label bgColor="#0369a1">Published</Label> : <Label bgColor="#888888">Draft</Label>}
        <button onClick={() => editChapter(chapter.chapter_id)}>
          <Pencil className="size-4 mr-2" />
        </button>
      </div>
    </div>
  );
}
