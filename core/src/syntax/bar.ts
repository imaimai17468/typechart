import { clampValues } from "../validation/clamp";

export const buildBar = (values: number[]): string => {
  const clamped = clampValues(values);
  const joined = clamped.map(Math.round).join(",");
  return `{b:${joined}}`;
};
