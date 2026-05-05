import { describe, it, expect } from "bun:test";
import { getFontFaceCSS } from "./font-face";

describe("getFontFaceCSS", () => {
  it("should contain font-family declaration when given a font URL", () => {
    // Arrange
    const fontUrl = "https://example.com/datatype.woff2";

    // Act
    const result = getFontFaceCSS(fontUrl);

    // Assert
    expect(result).toContain("font-family: 'Datatype'");
  });

  it("should contain the provided URL when given a font URL", () => {
    // Arrange
    const fontUrl = "https://example.com/datatype.woff2";

    // Act
    const result = getFontFaceCSS(fontUrl);

    // Assert
    expect(result).toContain(`url('${fontUrl}')`);
  });

  it("should contain typechart class when given a font URL", () => {
    // Arrange
    const fontUrl = "https://example.com/datatype.woff2";

    // Act
    const result = getFontFaceCSS(fontUrl);

    // Assert
    expect(result).toContain(".typechart");
  });

  it("should contain liga feature setting when given a font URL", () => {
    // Arrange
    const fontUrl = "https://example.com/datatype.woff2";

    // Act
    const result = getFontFaceCSS(fontUrl);

    // Assert
    expect(result).toContain("'liga' 1");
  });

  it("should escape single quotes when fontUrl contains single quotes", () => {
    // Arrange
    const fontUrl = "https://example.com/font's.woff2";

    // Act
    const result = getFontFaceCSS(fontUrl);

    // Assert
    expect(result).toContain("url('https://example.com/font%27s.woff2')");
  });
});
