export default function Label({ bgColor, children }) {
  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="flex items-center justify-center w-fit h-5 px-2 md:px-[12px] md:py-[11px] rounded-full text-white text-xs md:text-sm font-semibold"
    >
      <div>{children}</div>
    </div>
  );
}
