export const getFontFaceCSS = (fontUrl: string): string => {
  const safeUrl = fontUrl.replace(/'/g, "%27");
  return `@font-face {
  font-family: 'Datatype';
  src: url('${safeUrl}') format('woff2');
  font-display: swap;
  font-weight: 100 900;
  font-stretch: 50% 150%;
}

.typechart {
  font-family: 'Datatype', monospace;
  font-feature-settings: 'liga' 1, 'calt' 1;
  font-size: inherit;
  line-height: inherit;
}`;
};
