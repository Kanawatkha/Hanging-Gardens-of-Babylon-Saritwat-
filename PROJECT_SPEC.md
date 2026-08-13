# PROJECT_SPEC.md

> This file describes the full, current target for this project. There are no phases — this is the complete scope to build.

## Goal

A single-page, scroll-driven interactive timeline comparing two academic theories about the Hanging Gardens of Babylon:

- **Nineveh Theory** (Oxford / Dr. Stephanie Dalley) — positioned on the **left**.
- **Babylon Theory** (Classical sources) — positioned on the **right**.

Events from both theories are ordered by their real historical dates, not grouped by topic. Because the two theories' timelines do not overlap in years, one side will often be empty while the other has content — this is intentional and should be left visually empty, not filled with a placeholder.

## Content Source of Truth

All historical content (dates, names, event descriptions, claims, quotes) must come from the files in `docs/`. Do not invent or paraphrase from general knowledge. If a required piece of content is missing from `docs/`, leave a clear, visible placeholder rather than fabricating it.

## Page Structure

### 1. Hero Section

- Full-viewport section shown on initial load, above the timeline.
- Large centered title: "Hanging Gardens of Babylon" using the display typography from `DESIGN-elevenlabs.md`.
- Small subtitle/caption below the title, plainly explaining the page is a comparison timeline of two competing theories about the Gardens' true origin.
- Off-white/canvas background (per `DESIGN-elevenlabs.md` — no background imagery).
- No timeline line is visible yet at this stage.

### 2. Timeline Section

- As the user scrolls down, the hero content moves up and out, and the central vertical timeline line begins to appear.
- The timeline is a single vertical line running down the center of the page.
- Events are ordered strictly by real historical year, oldest first (Nineveh theory events begin first chronologically).
- For each event:
  - A short branch line extends from the central line out to the left (Nineveh) or right (Babylon) depending on which theory the event belongs to.
  - A content block appears at the end of the branch, structured as:
    - **Top:** an image placeholder/slot for an illustrative image.
    - **Bottom:** descriptive text for the event (title/year + explanatory paragraph).
  - The year of each event must be clearly labeled near its block, so the chronological gap between the two theories (~100 years) is visually apparent to the reader.
- If, at a given point in the scroll, one theory has an event and the other does not, the side with no event is left empty — no placeholder card, no filler content.

### 3. Closing / Summary Section

- After the last event in the timeline, a closing section presents a brief summary — acknowledging that the Hanging Gardens' true location remains an open academic question, without asserting one theory as definitively correct.
- Below the summary, include a source/reference list crediting the 5 source articles used for content (this is not a full site footer — no navigation, no unrelated links — just a clean reference list).
- No traditional site footer beyond this reference list.

## Scroll & Animation Behavior (Anime.js)

Use Anime.js selectively — only where it serves the storytelling. Do not attempt to use every Anime.js feature; favor a small, consistent set of techniques applied uniformly.

- **Central timeline line:** Its drawn length is scroll-linked (bound directly to scroll position/progress, e.g. via `stroke-dashoffset` on an SVG path), not a one-time triggered animation.
  - Scrolling down extends the line further.
  - Scrolling up retracts/holds the line at the corresponding scroll position — it does not "undo" as a replayed animation, it simply reflects current scroll position.
  - The line only fully replays from the start on a full page reload.
- **Branch lines:** For each event, the branch line from the central line to its content block draws in first, followed by the content block appearing — not simultaneously.
- **Content blocks:** Appear via a combined fade-in + slight blur-to-focus + upward translate (translateY) effect when scrolled into view.
- **Text content:** Long descriptive paragraphs fade in line-by-line (not character-by-character/typewriter). Short elements (event titles, years) may use a typewriter-style reveal since they are brief.
- **Grouped elements:** Use stagger for elements that should appear as a related group (e.g. image block then text block within the same event).
- **Consistency:** Easing and timing should feel uniform across the whole page, not vary wildly between sections.

## Layout & Responsive

- Desktop: full split-screen layout with the central timeline line, left column for Nineveh events, right column for Babylon events.
- Tablet/Mobile: must remain fully functional and readable — follow the responsive breakpoints and collapsing strategy defined in `DESIGN-elevenlabs.md`. The left/right split concept should be preserved as clearly as possible at smaller widths (e.g. narrower columns rather than collapsing to a single stacked column, unless screen width makes a split genuinely unreadable).
- No horizontal scrolling at any breakpoint.

## Design System

All visual styling (colors, typography, spacing, radii, elevation) must follow `DESIGN-elevenlabs.md`. Do not introduce colors, fonts, or spacing values outside of what that file defines.

## Out of Scope

- No 3D model viewer (previously planned, now removed from this project entirely).
- No navigation bar or menu.
- No quiz or interactive Q&A.
- No traditional site footer (only the closing reference list described above).
- No background imagery — canvas stays a flat off-white/canvas color per the design system, with gradient-orb atmospheric accents used only as documented in `DESIGN-elevenlabs.md` (decoration only, never as content backgrounds).
- No routing / multiple pages — this is a single scrollable page.

## Definition of Done

- Running `npm run dev` shows a single page: hero → scroll-driven comparison timeline → closing summary with references.
- Timeline line animation is correctly bound to scroll position (not a one-shot animation).
- All historical content displayed is sourced from `docs/`, with no invented facts.
- Fully responsive and functional on mobile, tablet, and desktop with no horizontal scroll.
- No console errors.
- Visual styling matches the tokens and components defined in `DESIGN-elevenlabs.md`.
