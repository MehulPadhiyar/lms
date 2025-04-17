import { X } from 'lucide-react';

export default function VideoModal({ setIsModalVisible, url, tableRef }) {
  return (
    <div className="fixed z-50 inset-0 backdrop-blur-sm flex justify-center items-center text-white">
      <div className="bg-black rounded-2xl w-[52%] h-auto px-10 py-7 shadow-2xl">
        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Sample {url?.slice(6, 7)}</h2>
            <button
              onClick={() => {
                tableRef.current.scrollIntoView({ block: 'end' });
                setIsModalVisible(false);
              }}
              className="bg-white text-lg rounded-full size-7 text-black font-bold flex justify-center items-center"
            >
              <X size={20} strokeWidth={3} />
            </button>
          </div>
          <div className="mt-4 rounded-xl overflow-hidden">
            <video src={`/user/video/${url}`} controls disablePictureInPicture />
          </div>
        </div>
      </div>
    </div>
  );
}
