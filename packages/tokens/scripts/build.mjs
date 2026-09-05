// Resolves primitive -> semantic -> component tokens into CSS custom properties
// per theme (core / lendguard / clientb) and per mode (light / dark).
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const themesDir = path.resolve(root, "../themes/src");

const primitives = JSON.parse(readFileSync(path.join(root, "src/primitives.json"), "utf-8"));
const semantic = JSON.parse(readFileSync(path.join(root, "src/semantic.json"), "utf-8"));
const component = JSON.parse(readFileSync(path.join(root, "src/component.json"), "utf-8"));

function flatten(obj, prefix = "", out = {}) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) flatten(v, key, out);
    else out[key] = v;
  }
  return out;
}

const flatPrimitives = flatten(primitives);

function resolve(value, dict, depth = 0) {
  if (depth > 10) throw new Error(`Reference cycle resolving ${value}`);
  if (typeof value !== "string") return value;
  const match = value.match(/^\{(.+)\}$/);
  if (!match) return value;
  const refKey = match[1];
  const refVal = dict[refKey];
  if (refVal === undefined) throw new Error(`Unresolved token reference: {${refKey}}`);
  return resolve(refVal, dict, depth + 1);
}

function toCssVarName(key) {
  return `--core-${key.replace(/\./g, "-")}`;
}

function buildModeBlock(mode) {
  const semanticMap = semantic[mode];
  const dict = { ...flatPrimitives, ...semanticMap };
  const lines = [];
  for (const [key, raw] of Object.entries(semanticMap)) {
    lines.push(`  ${toCssVarName(key)}: ${resolve(raw, dict)};`);
  }
  for (const [key, raw] of Object.entries(component)) {
    lines.push(`  ${toCssVarName(key)}: ${resolve(raw, dict)};`);
  }
  return lines.join("\n");
}

function buildPrimitiveBlock(overriddenPrimitives) {
  const lines = [];
  for (const [key, value] of Object.entries(overriddenPrimitives)) {
    lines.push(`  ${toCssVarName(key)}: ${value};`);
  }
  return lines.join("\n");
}

const outDir = path.join(root, "dist");
mkdirSync(outDir, { recursive: true });

const themeFiles = readdirSync(themesDir).filter((f) => f.endsWith(".json"));
const themeList = [];

for (const file of themeFiles) {
  const theme = JSON.parse(readFileSync(path.join(themesDir, file), "utf-8"));
  themeList.push({ id: theme.id, label: theme.label, meta: theme.meta });

  const mergedPrimitives = { ...flatPrimitives, ...(theme.overrides || {}) };
  // rebuild semantic/component resolution using the theme's primitive overrides
  function resolveWithTheme(value, extra, depth = 0) {
    if (depth > 10) throw new Error(`Reference cycle resolving ${value}`);
    if (typeof value !== "string") return value;
    const match = value.match(/^\{(.+)\}$/);
    if (!match) return value;
    const refKey = match[1];
    const refVal = extra[refKey] !== undefined ? extra[refKey] : mergedPrimitives[refKey];
    if (refVal === undefined) throw new Error(`Unresolved token reference: {${refKey}}`);
    return resolveWithTheme(refVal, extra, depth + 1);
  }

  const cssParts = [`/* Theme: ${theme.label} — generated file, do not edit by hand */`];

  // base primitive vars (all themes expose the full raw scale too, for advanced use)
  cssParts.push(`[data-theme="${theme.id}"] {\n${buildPrimitiveBlock(mergedPrimitives)}\n}`);

  for (const mode of ["light", "dark"]) {
    const semanticMap = semantic[mode];
    const lines = [];
    for (const [key, raw] of Object.entries(semanticMap)) {
      lines.push(`  ${toCssVarName(key)}: ${resolveWithTheme(raw, semanticMap)};`);
    }
    for (const [key, raw] of Object.entries(component)) {
      lines.push(`  ${toCssVarName(key)}: ${resolveWithTheme(raw, semanticMap)};`);
    }
    const selector = mode === "light"
      ? `[data-theme="${theme.id}"][data-mode="light"]`
      : `[data-theme="${theme.id}"][data-mode="dark"]`;
    cssParts.push(`${selector} {\n${lines.join("\n")}\n}`);
  }

  writeFileSync(path.join(outDir, `${theme.id}.css`), cssParts.join("\n\n") + "\n");
}

writeFileSync(path.join(outDir, "themes.json"), JSON.stringify(themeList, null, 2));
writeFileSync(
  path.join(outDir, "all-themes.css"),
  themeFiles.map((f) => `@import "./${f.replace(".json", ".css")}";`).join("\n") + "\n"
);

console.log(`✓ Built ${themeFiles.length} theme CSS files into packages/tokens/dist/`);
