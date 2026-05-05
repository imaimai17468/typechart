import { describe, it, expect } from "bun:test";
import { buildSparkline } from "./sparkline";

describe("buildSparkline", () => {
  it("should return sparkline syntax when given single value", () => {
    // Arrange
    const values = [50];

    // Act
    const result = buildSparkline(values);

    // Assert
    expect(result).toBe("{l:50}");
  });

  it("should return sparkline syntax when given multiple values", () => {
    // Arrange
    const values = [30, 70, 50];

    // Act
    const result = buildSparkline(values);

    // Assert
    expect(result).toBe("{l:30,70,50}");
  });

  it("should clamp values when values are out of range", () => {
    // Arrange
    const values = [-10, 150];

    // Act
    const result = buildSparkline(values);

    // Assert
    expect(result).toBe("{l:0,100}");
  });

  it("should return empty sparkline syntax when given empty array", () => {
    // Arrange
    const values: number[] = [];

    // Act
    const result = buildSparkline(values);

    // Assert
    expect(result).toBe("{l:}");
  });

  it("should round decimal values when given floats", () => {
    // Arrange
    const values = [30.4, 70.6];

    // Act
    const result = buildSparkline(values);

    // Assert
    expect(result).toBe("{l:30,71}");
  });
});
