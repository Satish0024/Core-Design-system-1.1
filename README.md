# CORE Design System

A white-label, token-driven design system (React + TypeScript + Vite) for a retirement
participant/admin portal product. Ships a full component library, a three-tier design
token pipeline (primitive → semantic → component), multi-theme white-labeling, and a
documentation site with live, interactive examples of every component.

## Structure

```
packages/
  tokens/     Design tokens — JSON source, compiled to CSS custom properties
              and a Bootstrap-shaped SCSS export (packages/tokens/dist/)
  core/       The component library (React + TypeScript), consumed as source
  themes/     Per-client theme definitions (core / lendguard / clientb),
              each overriding primitive tokens only
apps/
  docs-site/  The documentation site (this is what gets deployed) — every
              component, foundation, pattern, and full example screen
```

## Requirements

- Node.js ≥ 18.18
- npm (workspaces-based monorepo — no other package manager is set up)

## Local development

```bash
npm install
npm run dev
```

Opens the docs site at `http://localhost:5173`.

## Building

```bash
npm run build
```

Runs, in order: token compilation (`packages/tokens`), the core package build, then the
docs site build. Output lands in `apps/docs-site/dist` — that directory is the deployable
artifact.

## Hosting

The docs site is a static single-page app using `HashRouter`, so it needs **no server-side
rewrite rules** — every route already lives under one real path (`/#/...`). This repo ships
ready-to-use config for three common hosts:

| Host | Config file | Notes |
|---|---|---|
| Netlify | [`netlify.toml`](netlify.toml) | Build command `npm run build`, publish `apps/docs-site/dist` |
| Vercel | [`vercel.json`](vercel.json) | Same build command/output directory |
| GitHub Pages | [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) | Builds and deploys on every push to `main` — enable Pages in the repo's Settings → Pages, source "GitHub Actions" |

All three point at the same build command and output directory, so no host-specific code
changes are needed to switch between them.

## Tokens

See the [Tokens (SCSS)](apps/docs-site/src/pages/Tokens.tsx) page in the docs site for the
full token reference, or read `packages/tokens/src/*.json` directly — `primitives.json`
(raw scale values), `semantic.json` (light/dark role mapping), `component.json`
(component-specific aliases). Everything else (CSS custom properties, the SCSS export) is
generated from those three files by `packages/tokens/scripts/build.mjs` — never edit the
generated output in `packages/tokens/dist/` by hand.
