# AGENTS.md

## Project Overview

This is a single-purpose educational web project for a high school History assignment. The site is accessed by scanning a QR code attached to a 3D-printed physical model of the Hanging Gardens of Babylon. The web app is an interactive, scroll-driven timeline comparing two competing academic theories about the true location, builder, and era of the Hanging Gardens — the Nineveh (Oxford/Dalley) theory and the Babylon (Classical) theory — presented side by side and ordered by real historical dates.

This is a solo, frontend-only project. No backend, no database, no authentication.

## Tech Stack

- Vite
- React
- TypeScript (strict mode)
- Tailwind CSS
- Anime.js (scroll-driven and entrance animations)

No other frameworks or UI libraries should be introduced without explicit instruction from the project owner.

## Skills

Before starting any work, read `.agents/skills/karpathy-guidelines/SKILL.md` and apply its guidelines throughout this project, including the "Fail Loud" and "Read Before Write" rules referenced below.

## Design Reference

Before writing any UI/component code, read `DESIGN-elevenlabs.md` in full. It defines the design tokens (colors, typography, spacing, radii, components) this project must follow. Use the documented tokens rather than arbitrary hex values or spacing numbers. Font licensing/substitution decisions (e.g. for the display typeface) are left to your judgment at implementation time.

## Content Integrity Rule

This project presents real historical/academic content comparing two competing theories. You must NOT invent, paraphrase from memory, or hallucinate any historical facts, dates, names, or claims.

- All historical content (event descriptions, dates, names, quotes, claims attributed to either theory) must come directly from the files in `docs/`.
- If content needed for a section of the timeline is not present in `docs/`, do not fill the gap with invented content — flag it and leave a clear placeholder instead, or ask the project owner.
- `docs/` is the single source of truth for all historical content in this project.

## Current Scope

See `PROJECT_SPEC.md` for the full, current scope of this project. This project is not divided into phases — `PROJECT_SPEC.md` describes the complete target, not a subset of it. Do not implement features beyond what is defined there.

## Coding Standards

### General

- TypeScript strict mode must be enabled and respected — no `any` unless explicitly justified with a comment.
- Functional components only. No class components.
- Props must be explicitly typed via `interface` or `type`.
- No inline styles. Tailwind utility classes only, using the tokens defined in `DESIGN-elevenlabs.md`.
- No unused variables, imports, or dead code left in commits.

### Error Handling — "Fail Loud"

- Do not silently swallow errors.
- If content fails to load or render (e.g. missing data for a timeline entry), this must be visibly surfaced, not a blank or broken layout.
- Do not use empty catch blocks.

### File Editing — "Read Before Write"

- Always read the current content of a file before modifying it.
- Never blindly overwrite configuration files (`package.json`, `tsconfig.json`, `tailwind.config.*`, etc.) without first checking their existing state.

### Naming Conventions

- Components: `PascalCase` (e.g. `TimelineEvent.tsx`)
- Hooks: `camelCase` prefixed with `use` (e.g. `useScrollProgress.ts`)
- Folders: `kebab-case`
- Non-component TypeScript files: `camelCase`

## Common Commands

- `npm run dev` — start local dev server
- `npm run build` — production build
- `npm run lint` — run linter (if configured)

## Related Files

- `PROJECT_SPEC.md` — full project scope, content structure, and animation/scroll behavior (source of truth for what to build)
- `FOLDER_STRUCTURE.md` — structural principles and standards (Separation of Concerns, feature-based organization)
- `DESIGN-elevenlabs.md` — design tokens and visual standards (read before writing UI)
- `docs/` — source-of-truth historical content for both theories (read before writing any historical text)
- `.agents/skills/karpathy-guidelines/SKILL.md` — coding skill/persona guidelines (read this first, before any implementation work)
