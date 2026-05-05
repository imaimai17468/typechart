import { describe, it, expect } from "bun:test";
import { buildPie } from "./pie";

describe("buildPie", () => {
  it("should return pie syntax when given value in range", () => {
    // Arrange
    const value = 50;

    // Act
    const result = buildPie(value);

    // Assert
    expect(result).toBe("{p:50}");
  });

  it("should clamp value when value is above 100", () => {
    // Arrange
    const value = 150;

    // Act
    const result = buildPie(value);

    // Assert
    expect(result).toBe("{p:100}");
  });

  it("should clamp value when value is below 0", () => {
    // Arrange
    const value = -10;

    // Act
    const result = buildPie(value);

    // Assert
    expect(result).toBe("{p:0}");
  });

  it("should return pie syntax for boundary value 0", () => {
    // Arrange
    const value = 0;

    // Act
    const result = buildPie(value);

    // Assert
    expect(result).toBe("{p:0}");
  });

  it("should return pie syntax for boundary value 100", () => {
    // Arrange
    const value = 100;

    // Act
    const result = buildPie(value);

    // Assert
    expect(result).toBe("{p:100}");
  });

  it("should round decimal value when given float", () => {
    // Arrange
    const value = 49.6;

    // Act
    const result = buildPie(value);

    // Assert
    expect(result).toBe("{p:50}");
  });
});
