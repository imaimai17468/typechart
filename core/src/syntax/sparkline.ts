import { clampValues } from "../validation/clamp";

export const buildSparkline = (values: number[]): string => {
  const clamped = clampValues(values);
  const joined = clamped.map(Math.round).join(",");
  return `{l:${joined}}`;
};
