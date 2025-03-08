export default function Banner({ children }) {
  return (
    <div className="py-4 text-sm pl-4 flex items-center space-x-2 bg-[#FFF3E0] border-[1px] border-[#FF9800]">
      {children}
    </div>
  );
}
