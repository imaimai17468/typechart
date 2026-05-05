import { clampValue } from "../validation/clamp";

export const buildPie = (value: number): string => {
  const clamped = Math.round(clampValue(value));
  return `{p:${clamped}}`;
};
