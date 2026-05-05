import { describe, it, expect, mock, afterEach } from "bun:test";
import { render, screen, cleanup } from "@testing-library/react";
import React from "react";

mock.module("@typechart/core", () => ({
  buildBar: (values: number[]) => `{b:${values.join(",")}}`,
  buildSparkline: (values: number[]) => `{l:${values.join(",")}}`,
  buildPie: (value: number) => `{p:${value}}`,
}));

const { Sparkline } = await import("./Sparkline");

afterEach(cleanup);

describe("Sparkline", () => {
  it("should render with role img", () => {
    // Arrange & Act
    render(<Sparkline values={[30, 70, 50]} />);

    // Assert
    expect(screen.getByRole("img")).toBeDefined();
  });

  it("should render with default aria-label when ariaLabel is not provided", () => {
    // Arrange & Act
    render(<Sparkline values={[30, 70, 50]} />);

    // Assert
    expect(screen.getByRole("img").getAttribute("aria-label")).toBe("Sparkline: 30, 70, 50");
  });

  it("should render with custom aria-label when ariaLabel is provided", () => {
    // Arrange & Act
    render(<Sparkline values={[30, 70, 50]} ariaLabel="Daily active users" />);

    // Assert
    expect(screen.getByRole("img").getAttribute("aria-label")).toBe("Daily active users");
  });

  it("should render sparkline syntax as text content", () => {
    // Arrange & Act
    render(<Sparkline values={[30, 70, 50]} />);

    // Assert
    expect(screen.getByRole("img").textContent).toBe("{l:30,70,50}");
  });

  it("should apply typechart class when className is not provided", () => {
    // Arrange & Act
    render(<Sparkline values={[30, 70, 50]} />);

    // Assert
    expect(screen.getByRole("img").className).toBe("typechart");
  });

  it("should apply custom className when className is provided", () => {
    // Arrange & Act
    render(<Sparkline values={[30, 70, 50]} className="inline" />);

    // Assert
    expect(screen.getByRole("img").className).toBe("typechart inline");
  });

  it("should apply custom font-variation-settings when wdth and wght are provided", () => {
    // Arrange & Act
    render(<Sparkline values={[30, 70, 50]} wdth={150} wght={200} />);

    // Assert
    expect(screen.getByRole("img").getAttribute("style")).toContain("'wdth' 150, 'wght' 200");
  });
});
