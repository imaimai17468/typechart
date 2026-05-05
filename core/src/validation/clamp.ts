const MAX_VALUES = 20;

export const clampValue = (v: number): number => {
  if (v < 0) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`typechart: value ${v} is below 0, clamping to 0`);
    }
    return 0;
  }
  if (v > 100) {
    return 100;
  }
  return v;
};

export const normalizeValues = (values: number[]): number[] => {
  const max = Math.max(...values);
  if (max === 0) return values.map(() => 0);
  return values.map((v) => Math.round((v / max) * 100));
};

export const clampValues = (values: number[]): number[] => {
  if (values.length > MAX_VALUES && process.env.NODE_ENV !== "production") {
    console.warn(
      `typechart: array length ${values.length} exceeds max ${MAX_VALUES}, trimming`,
    );
  }
  const trimmed = values.length > MAX_VALUES ? values.slice(0, MAX_VALUES) : values;
  const needsNormalize = trimmed.some((v) => v > 100);
  const scaled = needsNormalize ? normalizeValues(trimmed) : trimmed;
  return scaled.map(clampValue);
};
