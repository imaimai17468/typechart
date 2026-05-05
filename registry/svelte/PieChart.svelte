<script lang="ts">
  import { buildPie } from "@typechart/core";

  export let value: number;
  export let wdth: number = 100;
  export let wght: number = 400;
  export let className: string | undefined = undefined;
  export let ariaLabel: string | undefined = undefined;

  $: syntax = buildPie(value);
  $: variationSettings = `'wdth' ${wdth}, 'wght' ${wght}`;
  $: label = ariaLabel ?? `Pie chart: ${value}%`;
  $: classes = className ? `typechart ${className}` : "typechart";
</script>

<span
  class={classes}
  style="font-variation-settings: {variationSettings}"
  role="img"
  aria-label={label}
>{syntax}</span>
