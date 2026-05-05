import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve, join } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const REGISTRY_PATH = join(ROOT, "registry.json");
const OUTPUT_DIR = join(ROOT, "public", "r");

const FONT_FACE_CSS = `@layer base {
  @font-face {
    font-family: 'Datatype';
    src: url('/fonts/Datatype.woff2') format('woff2');
    font-display: swap;
    font-weight: 100 900;
    font-stretch: 50% 150%;
  }

  .typechart {
    font-family: 'Datatype', monospace;
    font-feature-settings: 'liga' 1, 'calt' 1;
    font-size: inherit;
    line-height: inherit;
  }
}`;

type RegistryFile = {
  path: string;
  type: string;
};

type RegistryItem = {
  name: string;
  type: string;
  title?: string;
  description: string;
  dependencies: string[];
  files: RegistryFile[];
};

type Registry = {
  $schema: string;
  name: string;
  homepage: string;
  items: RegistryItem[];
};

const registry: Registry = JSON.parse(readFileSync(REGISTRY_PATH, "utf-8"));

mkdirSync(OUTPUT_DIR, { recursive: true });

const outputItems = registry.items.map((item) => {
  const files = item.files.map((file) => {
    const filePath = join(ROOT, file.path);
    const content = readFileSync(filePath, "utf-8");
    return {
      path: file.path,
      type: file.type,
      content,
    };
  });

  const outputItem = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    dependencies: item.dependencies,
    files,
    css: FONT_FACE_CSS,
  };

  const outputPath = join(OUTPUT_DIR, `${item.name}.json`);
  writeFileSync(outputPath, JSON.stringify(outputItem, null, 2));
  console.log(`  ${item.name}.json`);

  return outputItem;
});

const indexOutput = {
  $schema: registry.$schema,
  name: registry.name,
  homepage: registry.homepage,
  items: outputItems,
};

writeFileSync(join(OUTPUT_DIR, "index.json"), JSON.stringify(indexOutput, null, 2));
console.log(`  index.json`);
console.log(`\nGenerated ${outputItems.length + 1} files in public/r/`);
