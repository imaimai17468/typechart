import { describe, it, expect, beforeEach, spyOn, mock } from "bun:test";
import { clampValue, clampValues, normalizeValues } from "./clamp";

describe("clampValue", () => {
  beforeEach(() => {
    process.env.NODE_ENV = "test";
    mock.restore();
  });

  it("should return 0 when value is below 0", () => {
    const result = clampValue(-5);
    expect(result).toBe(0);
  });

  it("should return 100 when value is above 100", () => {
    const result = clampValue(150);
    expect(result).toBe(100);
  });

  it("should return value unchanged when value is within range", () => {
    const result = clampValue(50);
    expect(result).toBe(50);
  });

  it("should return 0 when value is exactly 0", () => {
    const result = clampValue(0);
    expect(result).toBe(0);
  });

  it("should return 100 when value is exactly 100", () => {
    const result = clampValue(100);
    expect(result).toBe(100);
  });

  it("should warn when value is below 0", () => {
    const warn = spyOn(console, "warn").mockImplementation(() => {});
    clampValue(-1);
    expect(warn).toHaveBeenCalled();
  });

  it("should not warn when value is within range", () => {
    const warn = spyOn(console, "warn").mockImplementation(() => {});
    clampValue(50);
    expect(warn).not.toHaveBeenCalled();
  });
});

describe("normalizeValues", () => {
  it("should scale values so max becomes 100", () => {
    const result = normalizeValues([1200, 3400, 800]);
    expect(result).toEqual([35, 100, 24]);
  });

  it("should return all zeros when all values are 0", () => {
    const result = normalizeValues([0, 0, 0]);
    expect(result).toEqual([0, 0, 0]);
  });

  it("should handle single value", () => {
    const result = normalizeValues([500]);
    expect(result).toEqual([100]);
  });

  it("should preserve relative proportions", () => {
    const result = normalizeValues([200, 100, 50]);
    expect(result).toEqual([100, 50, 25]);
  });

  it("should not change values already at 0-100 scale when max is 100", () => {
    const result = normalizeValues([30, 70, 100]);
    expect(result).toEqual([30, 70, 100]);
  });
});

describe("clampValues", () => {
  beforeEach(() => {
    process.env.NODE_ENV = "test";
    mock.restore();
  });

  it("should pass through values when all are 0-100", () => {
    const result = clampValues([30, 70, 50]);
    expect(result).toEqual([30, 70, 50]);
  });

  it("should auto-normalize when any value exceeds 100", () => {
    const result = clampValues([1200, 3400, 800]);
    expect(result).toEqual([35, 100, 24]);
  });

  it("should clamp negative values after normalization", () => {
    const result = clampValues([-10, 50, 200]);
    expect(result).toEqual([0, 25, 100]);
  });

  it("should trim array to 20 items when exceeding max length", () => {
    const values = Array.from({ length: 25 }, (_, i) => i);
    const result = clampValues(values);
    expect(result).toHaveLength(20);
  });

  it("should warn when array exceeds max length", () => {
    const warn = spyOn(console, "warn").mockImplementation(() => {});
    const values = Array.from({ length: 25 }, (_, i) => i);
    clampValues(values);
    expect(warn).toHaveBeenCalled();
  });

  it("should not trim array when length is exactly 20", () => {
    const values = Array.from({ length: 20 }, (_, i) => i);
    const result = clampValues(values);
    expect(result).toHaveLength(20);
  });

  it("should not warn when array length is exactly 20", () => {
    const warn = spyOn(console, "warn").mockImplementation(() => {});
    const values = Array.from({ length: 20 }, (_, i) => i);
    clampValues(values);
    expect(warn).not.toHaveBeenCalled();
  });

  it("should return empty array when given empty array", () => {
    const result = clampValues([]);
    expect(result).toEqual([]);
  });
});
