import { describe, it, expect, mock, afterEach } from "bun:test";
import { render, screen, cleanup } from "@testing-library/react";
import React from "react";

mock.module("@typechart/core", () => ({
  buildBar: (values: number[]) => `{b:${values.join(",")}}`,
  buildSparkline: (values: number[]) => `{l:${values.join(",")}}`,
  buildPie: (value: number) => `{p:${value}}`,
}));

const { BarChart } = await import("./BarChart");

afterEach(cleanup);

describe("BarChart", () => {
  it("should render with role img", () => {
    // Arrange & Act
    render(<BarChart values={[30, 70, 50]} />);

    // Assert
    expect(screen.getByRole("img")).toBeDefined();
  });

  it("should render with default aria-label when ariaLabel is not provided", () => {
    // Arrange & Act
    render(<BarChart values={[30, 70, 50]} />);

    // Assert
    expect(screen.getByRole("img").getAttribute("aria-label")).toBe("Bar chart: 30, 70, 50");
  });

  it("should render with custom aria-label when ariaLabel is provided", () => {
    // Arrange & Act
    render(<BarChart values={[30, 70, 50]} ariaLabel="Monthly revenue" />);

    // Assert
    expect(screen.getByRole("img").getAttribute("aria-label")).toBe("Monthly revenue");
  });

  it("should render bar syntax as text content", () => {
    // Arrange & Act
    render(<BarChart values={[30, 70, 50]} />);

    // Assert
    expect(screen.getByRole("img").textContent).toBe("{b:30,70,50}");
  });

  it("should apply typechart class when className is not provided", () => {
    // Arrange & Act
    render(<BarChart values={[30, 70, 50]} />);

    // Assert
    expect(screen.getByRole("img").className).toBe("typechart");
  });

  it("should apply custom className when className is provided", () => {
    // Arrange & Act
    render(<BarChart values={[30, 70, 50]} className="custom" />);

    // Assert
    expect(screen.getByRole("img").className).toBe("typechart custom");
  });

  it("should apply default font-variation-settings when wdth and wght are not provided", () => {
    // Arrange & Act
    render(<BarChart values={[30, 70, 50]} />);

    // Assert
    expect(screen.getByRole("img").getAttribute("style")).toContain("'wdth' 100, 'wght' 400");
  });

  it("should apply custom font-variation-settings when wdth and wght are provided", () => {
    // Arrange & Act
    render(<BarChart values={[30, 70, 50]} wdth={50} wght={700} />);

    // Assert
    expect(screen.getByRole("img").getAttribute("style")).toContain("'wdth' 50, 'wght' 700");
  });
});
