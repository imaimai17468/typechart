import { buildBar } from "@typechart/core";

type BarChartProps = {
  values: number[];
  wdth?: number;
  wght?: number;
  className?: string;
  ariaLabel?: string;
};

export const BarChart = ({
  values,
  wdth = 100,
  wght = 400,
  className,
  ariaLabel,
}: BarChartProps) => {
  const syntax = buildBar(values);
  return (
    <span
      className={className ? `typechart ${className}` : "typechart"}
      style={{ fontVariationSettings: `'wdth' ${wdth}, 'wght' ${wght}` }}
      role="img"
      aria-label={ariaLabel ?? `Bar chart: ${values.join(", ")}`}
    >
      {syntax}
    </span>
  );
};
