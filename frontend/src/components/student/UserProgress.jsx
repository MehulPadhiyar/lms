export default function UserProgress({ progress, size }) {
  return (
    <div className="flex flex-col space-y-1">
      <div
        className={`w-full h-[10px] border-[1px] ${
          progress === 100 ? 'border-emerald-700' : 'border-sky-700'
        } rounded-full overflow-auto`}
      >
        <div
          style={{ width: `${progress}%` }}
          className={`h-full ${progress === 100 ? 'bg-emerald-700' : 'bg-primary'}`}
        ></div>
      </div>

      <p
        className={`${size ? size : 'text-xs'} ${progress === 100 ? 'text-emerald-700' : 'text-primary'} font-semibold`}
      >
        {progress}% Complete
      </p>
    </div>
  );
}
