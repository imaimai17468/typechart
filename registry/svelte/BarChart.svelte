<script lang="ts">
  import { buildBar } from "@typechart/core";

  export let values: number[];
  export let wdth: number = 100;
  export let wght: number = 400;
  export let className: string | undefined = undefined;
  export let ariaLabel: string | undefined = undefined;

  $: syntax = buildBar(values);
  $: variationSettings = `'wdth' ${wdth}, 'wght' ${wght}`;
  $: label = ariaLabel ?? `Bar chart: ${values.join(", ")}`;
  $: classes = className ? `typechart ${className}` : "typechart";
</script>

<span
  class={classes}
  style="font-variation-settings: {variationSettings}"
  role="img"
  aria-label={label}
>{syntax}</span>
