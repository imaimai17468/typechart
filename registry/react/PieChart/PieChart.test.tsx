import { describe, it, expect, mock, afterEach } from "bun:test";
import { render, screen, cleanup } from "@testing-library/react";
import React from "react";

mock.module("@typechart/core", () => ({
  buildBar: (values: number[]) => `{b:${values.join(",")}}`,
  buildSparkline: (values: number[]) => `{l:${values.join(",")}}`,
  buildPie: (value: number) => `{p:${value}}`,
}));

const { PieChart } = await import("./PieChart");

afterEach(cleanup);

describe("PieChart", () => {
  it("should render with role img", () => {
    // Arrange & Act
    render(<PieChart value={65} />);

    // Assert
    expect(screen.getByRole("img")).toBeDefined();
  });

  it("should render with default aria-label when ariaLabel is not provided", () => {
    // Arrange & Act
    render(<PieChart value={65} />);

    // Assert
    expect(screen.getByRole("img").getAttribute("aria-label")).toBe("Pie chart: 65%");
  });

  it("should render with custom aria-label when ariaLabel is provided", () => {
    // Arrange & Act
    render(<PieChart value={65} ariaLabel="Market share" />);

    // Assert
    expect(screen.getByRole("img").getAttribute("aria-label")).toBe("Market share");
  });

  it("should render pie syntax as text content", () => {
    // Arrange & Act
    render(<PieChart value={65} />);

    // Assert
    expect(screen.getByRole("img").textContent).toBe("{p:65}");
  });

  it("should apply typechart class when className is not provided", () => {
    // Arrange & Act
    render(<PieChart value={65} />);

    // Assert
    expect(screen.getByRole("img").className).toBe("typechart");
  });

  it("should apply custom className when className is provided", () => {
    // Arrange & Act
    render(<PieChart value={65} className="large" />);

    // Assert
    expect(screen.getByRole("img").className).toBe("typechart large");
  });

  it("should apply custom font-variation-settings when wdth and wght are provided", () => {
    // Arrange & Act
    render(<PieChart value={65} wdth={75} wght={900} />);

    // Assert
    expect(screen.getByRole("img").getAttribute("style")).toContain("'wdth' 75, 'wght' 900");
  });
});
