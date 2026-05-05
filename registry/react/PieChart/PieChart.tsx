import { buildPie } from "@typechart/core";

type PieChartProps = {
  value: number;
  wdth?: number;
  wght?: number;
  className?: string;
  ariaLabel?: string;
};

export const PieChart = ({
  value,
  wdth = 100,
  wght = 400,
  className,
  ariaLabel,
}: PieChartProps) => {
  const syntax = buildPie(value);
  return (
    <span
      className={className ? `typechart ${className}` : "typechart"}
      style={{ fontVariationSettings: `'wdth' ${wdth}, 'wght' ${wght}` }}
      role="img"
      aria-label={ariaLabel ?? `Pie chart: ${value}%`}
    >
      {syntax}
    </span>
  );
};
