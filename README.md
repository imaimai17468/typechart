# typechart

Inline charts powered by a variable font. No SVG. No Canvas. No JS runtime.

Built on the [Datatype](https://github.com/franktisellano/datatype) variable font by Frank Tisellano.

## Install

```bash
npx shadcn@latest add https://imaimai17468.github.io/typechart/r/bar-chart.json
npx shadcn@latest add https://imaimai17468.github.io/typechart/r/sparkline.json
npx shadcn@latest add https://imaimai17468.github.io/typechart/r/pie-chart.json
```

React, Vue, Svelte, Solid, Astro available. See the [docs](https://imaimai17468.github.io/typechart/) for all frameworks.

## Usage

```tsx
import { BarChart, Sparkline, PieChart } from "@/components/typechart";

<BarChart values={[30, 70, 50]} />
<Sparkline values={[1200, 3400, 800]} />
<PieChart value={65} />
```

Values over 100 are auto-normalized. Negative values are clamped to 0.

## License

MIT — see [LICENSE](./LICENSE)

Datatype font is licensed under the [SIL Open Font License](https://github.com/franktisellano/datatype/blob/main/LICENSE).
