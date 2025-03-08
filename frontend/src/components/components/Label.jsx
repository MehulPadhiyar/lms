export default function Label({ bgColor, children }) {
  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="flex items-center justify-center w-fit h-5 px-[11px] py-[11px] rounded-full text-white text-sm font-semibold"
    >
      <p>{children}</p>
    </div>
  );
}
