interface DashboardChartCardProps {
  title: string;
  children: React.ReactNode;
}

const DashboardChartCard = ({
  title,
  children,
}: DashboardChartCardProps) => {
  return (
    <section className="rounded-2xl border border-[#D8C6B5] bg-[#FFF9F4] p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <h2 className="mb-4 text-lg font-bold text-[#122321]">
        {title}
      </h2>

      <div className="h-56">
        {children}
      </div>
    </section>
  );
};

export default DashboardChartCard;