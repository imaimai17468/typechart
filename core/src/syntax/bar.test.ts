import { describe, it, expect } from "bun:test";
import { buildBar } from "./bar";

describe("buildBar", () => {
  it("should return bar syntax when given single value", () => {
    // Arrange
    const values = [50];

    // Act
    const result = buildBar(values);

    // Assert
    expect(result).toBe("{b:50}");
  });

  it("should return bar syntax when given multiple values", () => {
    // Arrange
    const values = [30, 70, 50];

    // Act
    const result = buildBar(values);

    // Assert
    expect(result).toBe("{b:30,70,50}");
  });

  it("should clamp values when values are out of range", () => {
    // Arrange
    const values = [-10, 150];

    // Act
    const result = buildBar(values);

    // Assert
    expect(result).toBe("{b:0,100}");
  });

  it("should return empty bar syntax when given empty array", () => {
    // Arrange
    const values: number[] = [];

    // Act
    const result = buildBar(values);

    // Assert
    expect(result).toBe("{b:}");
  });

  it("should round decimal values when given floats", () => {
    // Arrange
    const values = [30.4, 70.6];

    // Act
    const result = buildBar(values);

    // Assert
    expect(result).toBe("{b:30,71}");
  });
});
