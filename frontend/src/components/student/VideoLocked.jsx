import { Lock } from 'lucide-react';

export default function VideoLocked() {
  return (
    <div className="w-full h-[28rem] bg-gray-600 text-slate-300 flex flex-col space-y-2 justify-center items-center">
      <Lock className="size-9" />
      <p>This chapter is locked</p>
    </div>
  );
}
