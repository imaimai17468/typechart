<script setup lang="ts">
import { computed } from "vue";
import { buildBar } from "@typechart/core";

const props = withDefaults(
  defineProps<{
    values: number[];
    wdth?: number;
    wght?: number;
    className?: string;
    ariaLabel?: string;
  }>(),
  { wdth: 100, wght: 400 }
);

const syntax = computed(() => buildBar(props.values));
const variationSettings = computed(
  () => `'wdth' ${props.wdth}, 'wght' ${props.wght}`
);
const label = computed(
  () => props.ariaLabel ?? `Bar chart: ${props.values.join(", ")}`
);
const classes = computed(
  () => (props.className ? `typechart ${props.className}` : "typechart")
);
</script>

<template>
  <span
    :class="classes"
    :style="{ fontVariationSettings: variationSettings }"
    role="img"
    :aria-label="label"
  >{{ syntax }}</span>
</template>
