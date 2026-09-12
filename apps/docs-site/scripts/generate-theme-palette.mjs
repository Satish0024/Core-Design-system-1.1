/**
 * Builds theme-palette.css from public palette SCSS sources.
 * Primitives: Color pallete.scss · Semantics: Format to follow naming.scss
 */
import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const publicDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../public");
const outFile = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../src/theme-palette.css");

const primitivesFile = path.join(publicDir, "Color pallete.scss");
const semanticFile = path.join(publicDir, "Format to follow naming.scss");

let primitives = readFileSync(primitivesFile, "utf-8");
primitives = primitives.replace(/\n@import\s+"Format to follow naming\.scss";\s*$/, "\n");

const semantics = readFileSync(semanticFile, "utf-8");

const css = `${primitives.trim()}\n\n${semantics.trim()}\n`;

writeFileSync(outFile, css);
console.log("Wrote", outFile);
