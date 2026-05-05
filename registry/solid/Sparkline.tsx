import { createMemo } from "solid-js";
import { buildSparkline } from "@typechart/core";

type SparklineProps = {
  values: number[];
  wdth?: number;
  wght?: number;
  className?: string;
  ariaLabel?: string;
};

export const Sparkline = (props: SparklineProps) => {
  const syntax = createMemo(() => buildSparkline(props.values));
  const variationSettings = createMemo(
    () => `'wdth' ${props.wdth ?? 100}, 'wght' ${props.wght ?? 400}`
  );
  const label = createMemo(
    () => props.ariaLabel ?? `Sparkline: ${props.values.join(", ")}`
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
