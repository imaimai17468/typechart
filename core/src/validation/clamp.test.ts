import { describe, it, expect, beforeEach, spyOn, mock } from "bun:test";
import { clampValue, clampValues } from "./clamp";

describe("clampValue", () => {
  beforeEach(() => {
    process.env.NODE_ENV = "test";
    mock.restore();
  });

  it("should return 0 when value is below 0", () => {
    // Arrange
    const value = -5;

    // Act
    const result = clampValue(value);

    // Assert
    expect(result).toBe(0);
  });

  it("should return 100 when value is above 100", () => {
    // Arrange
    const value = 150;

    // Act
    const result = clampValue(value);

    // Assert
    expect(result).toBe(100);
  });

  it("should return value unchanged when value is within range", () => {
    // Arrange
    const value = 50;

    // Act
    const result = clampValue(value);

    // Assert
    expect(result).toBe(50);
  });

  it("should return 0 when value is exactly 0", () => {
    // Arrange
    const value = 0;

    // Act
    const result = clampValue(value);

    // Assert
    expect(result).toBe(0);
  });

  it("should return 100 when value is exactly 100", () => {
    // Arrange
    const value = 100;

    // Act
    const result = clampValue(value);

    // Assert
    expect(result).toBe(100);
  });

  it("should warn when value is below 0", () => {
    // Arrange
    const warn = spyOn(console, "warn").mockImplementation(() => {});

    // Act
    clampValue(-1);

    // Assert
    expect(warn).toHaveBeenCalled();
  });

  it("should warn when value is above 100", () => {
    // Arrange
    const warn = spyOn(console, "warn").mockImplementation(() => {});

    // Act
    clampValue(101);

    // Assert
    expect(warn).toHaveBeenCalled();
  });

  it("should not warn when value is within range", () => {
    // Arrange
    const warn = spyOn(console, "warn").mockImplementation(() => {});

    // Act
    clampValue(50);

    // Assert
    expect(warn).not.toHaveBeenCalled();
  });
});

describe("clampValues", () => {
  beforeEach(() => {
    process.env.NODE_ENV = "test";
    mock.restore();
  });

  it("should clamp each value in the array", () => {
    // Arrange
    const values = [-10, 50, 150];

    // Act
    const result = clampValues(values);

    // Assert
    expect(result).toEqual([0, 50, 100]);
  });

  it("should trim array to 20 items when exceeding max length", () => {
    // Arrange
    const values = Array.from({ length: 25 }, (_, i) => i);

    // Act
    const result = clampValues(values);

    // Assert
    expect(result).toHaveLength(20);
  });

  it("should warn when array exceeds max length", () => {
    // Arrange
    const warn = spyOn(console, "warn").mockImplementation(() => {});
    const values = Array.from({ length: 25 }, (_, i) => i);

    // Act
    clampValues(values);

    // Assert
    expect(warn).toHaveBeenCalled();
  });

  it("should not trim array when length is exactly 20", () => {
    // Arrange
    const values = Array.from({ length: 20 }, (_, i) => i);

    // Act
    const result = clampValues(values);

    // Assert
    expect(result).toHaveLength(20);
  });

  it("should not warn when array length is exactly 20", () => {
    // Arrange
    const warn = spyOn(console, "warn").mockImplementation(() => {});
    const values = Array.from({ length: 20 }, (_, i) => i);

    // Act
    clampValues(values);

    // Assert
    expect(warn).not.toHaveBeenCalled();
  });

  it("should return empty array when given empty array", () => {
    // Arrange
    const values: number[] = [];

    // Act
    const result = clampValues(values);

    // Assert
    expect(result).toEqual([]);
  });
});
