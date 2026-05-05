import { createMemo } from "solid-js";
import { buildPie } from "@typechart/core";

type PieChartProps = {
  value: number;
  wdth?: number;
  wght?: number;
  className?: string;
  ariaLabel?: string;
};

export const PieChart = (props: PieChartProps) => {
  const syntax = createMemo(() => buildPie(props.value));
  const variationSettings = createMemo(
    () => `'wdth' ${props.wdth ?? 100}, 'wght' ${props.wght ?? 400}`
  );
  const label = createMemo(
    () => props.ariaLabel ?? `Pie chart: ${props.value}%`
  );
  const classes = createMemo(
    () => (props.className ? `typechart ${props.className}` : "typechart")
  );

  return (
    <span
      class={classes()}
      style={{ "font-variation-settings": variationSettings() }}
      role="img"
      aria-label={label()}
    >
      {syntax()}
    </span>
  );
};
