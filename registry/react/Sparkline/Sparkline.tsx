import { buildSparkline } from "@typechart/core";

type SparklineProps = {
  values: number[];
  wdth?: number;
  wght?: number;
  className?: string;
  ariaLabel?: string;
};

export const Sparkline = ({
  values,
  wdth = 100,
  wght = 400,
  className,
  ariaLabel,
}: SparklineProps) => {
  const syntax = buildSparkline(values);
  return (
    <span
      className={className ? `typechart ${className}` : "typechart"}
      style={{ fontVariationSettings: `'wdth' ${wdth}, 'wght' ${wght}` }}
      role="img"
      aria-label={ariaLabel ?? `Sparkline: ${values.join(", ")}`}
    >
      {syntax}
    </span>
  );
};
