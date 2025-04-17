export default function StatCard({ stats, text, bgColor, textColor }) {
  return (
    <div className={`${bgColor} text-center font-league_spartan lea py-10 rounded-xl`}>
      <h3 className={`${textColor} text-[3rem] font-bold leading-[3rem]`}>{stats}</h3>
      <p className="uppercase">{text}</p>
    </div>
  );
}
