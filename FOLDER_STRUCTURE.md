# FOLDER_STRUCTURE.md

This file does NOT prescribe a fixed, exact folder tree. Instead, it defines the professional standards and principles the project structure must follow. The coding agent has flexibility in exact folder/file naming and placement, as long as every principle below is respected. When in doubt, favor clarity and consistency over cleverness.

## Core Principle: Separation of Concerns (SoC)

Separation of Concerns is a foundational software design principle: organize a codebase into distinct sections, each addressing a single, well-defined concern, rather than mixing unrelated responsibilities together. The goal is high cohesion within each part and low coupling between parts — a concern is considered properly separated when it is localized in a single file, component, or folder, with minimal overlap in functionality between divided parts.

Applied to this project, SoC means:

- **3D viewing logic** (Sketchfab embed, viewer wrapper) must be isolated from **layout/page composition** and from **content data** (text, constants, links).
- **Presentation** (how something looks — Tailwind classes, JSX structure) should be separated from **data** (what the content actually is — e.g. the Sketchfab URL, attribution text). Data should live in constants/config, not be hardcoded inline inside components.
- A component, hook, or file should have one clear reason to change. If a file is handling more than one distinct responsibility (e.g. a component that both renders UI and contains business logic and defines types), it should be split.
- Avoid deep nesting for its own sake — folder structure should mirror actual feature boundaries, not arbitrary categorization by file type only.

## Standard Adopted: Feature-Based / Co-location Structure

Modern professional React + TypeScript projects (as of 2025-2026 industry consensus) favor a **feature-based** or **hybrid** structure over strictly grouping files by type (e.g. one giant `components/` folder for everything). Guidelines:

- Group files that change together, together. A feature's component, its types, and any feature-specific hooks should live near each other (co-located), rather than scattered across parallel `components/`, `types/`, `hooks/` folders at the top level.
- Reserve top-level folders like `lib/`, `hooks/`, or `utils/` for code that is genuinely **shared across multiple features** — not as a dumping ground for anything that doesn't have an obvious home.
- Limit folder nesting depth to roughly 2–3 levels under `src/`. If you find yourself creating a sub-folder of a sub-folder of a sub-folder, that's a signal the feature boundary is wrong, not that you need more folders.
- Use `index.ts`/`index.tsx` barrel-style exports where it genuinely simplifies imports — but don't put actual logic inside index files, only re-exports.
- Naming should be consistent project-wide: pick one casing convention per file type (e.g. PascalCase for component files, camelCase for hooks/utilities, kebab-case for folders) and apply it everywhere. Do not mix conventions.
- Configuration files (TypeScript, Tailwind, Vite, linting) stay at the project root, not nested inside `src/`.

## Scaling Expectation

This project starts small (Phase 1: a single 3D viewer). The structure agreed upon now must be able to absorb Phase 2+ features (historical content, timeline, etc. — see `ROADMAP.md`) **without requiring a full restructure**. Concretely:

- New features should be addable as new, self-contained folders that don't require reorganizing existing ones.
- Do not pre-build empty folders for future phases before they're needed (YAGNI) — but do choose today's structure so that adding tomorrow's feature is additive, not disruptive.

## What "Professional" Means Here, Concretely

- No orphaned/unused files left behind.
- No business logic or content data hardcoded directly inside JSX where it could reasonably live in a constant or config file.
- No single component file handling multiple unrelated concerns (e.g. don't mix the 3D viewer's iframe logic with unrelated page layout logic in the same file).
- Every folder that exists has a clear, singular purpose that could be explained in one sentence.
- The structure should be self-explanatory enough that a new developer (or a fresh instance of the coding agent) can infer where new code belongs without being told explicitly every time.

## Reference

These principles are consistent with widely-cited software engineering standards on Separation of Concerns and current (2025-2026) community consensus on React/TypeScript project organization, which favor feature-based/hybrid structures over flat type-based folders for anything beyond trivial projects.
