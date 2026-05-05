import { createMemo } from "solid-js";
import { buildBar } from "@typechart/core";

type BarChartProps = {
  values: number[];
  wdth?: number;
  wght?: number;
  className?: string;
  ariaLabel?: string;
};

export const BarChart = (props: BarChartProps) => {
  const syntax = createMemo(() => buildBar(props.values));
  const variationSettings = createMemo(
    () => `'wdth' ${props.wdth ?? 100}, 'wght' ${props.wght ?? 400}`
  );
  const label = createMemo(
    () => props.ariaLabel ?? `Bar chart: ${props.values.join(", ")}`
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
