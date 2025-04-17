import { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';

export default function Video() {
  const videoRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-[url('/video-bg.png')] bg-cover bg-center place-items-center bg-no-repeat pb-10 md:pb-20 pt-0 sm:pt-10 md:pt-20 z-[-2] relative">
      <div className="relative w-[100%] px-4 sm:px-0 sm:w-[80%] xl:w-[58%] group">
        <video ref={videoRef} muted disablePictureInPicture loop className="rounded-tr-[7rem] rounded-bl-[7rem]">
          <source src="/illustration.webm" type="video/webm" />
          <source src="/illustration.mp4" type="video/mp4" />
          Your browser doesn't support video tag.
        </video>
        <button
          className="bg-radical_red p-4 md:p-7 rounded-full text-white size-fit absolute inset-0 m-auto group-hover:inline-block hidden"
          onClick={() => {
            isPlaying ? videoRef.current.pause() : videoRef.current.play();
            setIsPlaying((prev) => !prev);
          }}
        >
          {isPlaying ? (
            <Pause className="inline" size={40} fill="#fff" />
          ) : (
            <Play className="inline" size={40} fill="#fff" />
          )}
        </button>
        <img
          src="/video-shape-2.png"
          alt="Video shape"
          className="hidden xl:block absolute top-[-80px] right-[-10px]"
        />
      </div>
      <img src="/video-shape-1.png" alt="Video shape" className="hidden xl:block absolute top-7 left-40 z-[-1]" />
    </div>
  );
}
