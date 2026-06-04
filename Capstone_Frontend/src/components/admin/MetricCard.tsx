interface MetricCardProps {
  title: string;
  value: number;
  subtitle?: string;
}

const MetricCard = ({ title, value, subtitle }: MetricCardProps) => {
  return (
    <article className="rounded-2xl border border-[#D8C6B5] bg-[#FFF9F4] p-5 shadow-sm">
      <p className="text-sm font-medium text-stone-600">
        {title}
      </p>

      <p className="mt-3 text-3xl font-bold text-[#122321]">
        {value}
      </p>

      {subtitle && (
        <p className="mt-2 text-sm text-stone-500">
          {subtitle}
        </p>
      )}
    </article>
  );
};

export default MetricCard;