"use client";

/* /preview — the specimen catalogue.
 *
 * One page rendering the design system's components in all three themes side
 * by side, so a token that only works on one ground is visible immediately.
 * It is an instrument, not a marketing page: dense, single column, scannable.
 *
 * DO NOT DELETE IT AFTER LAUNCH. It is how the next e-board sees what the
 * system contains.
 *
 * The exhibits themselves live in ./exhibits. This file is the shell: the
 * three-column theme harness, the reduced-motion switch, and the contrast
 * measurement.
 */

import * as React from "react";

import { MicroLabel } from "@/components/ui/micro-label";
import { cn } from "@/lib/utils";
import {
  ColourExhibit,
  CONTRAST_PAIRS,
  EventRowExhibit,
  FilterChipExhibit,
  MicroLabelExhibit,
  PeopleCardExhibit,
  PillExhibit,
  ProjectRowExhibit,
  StubSlot,
  THEMES,
  TypeScaleExhibit,
  type ThemeName,
} from "./exhibits";

/* ── reduced motion ──────────────────────────────────────────────────── */

/* Mirrors the universal prefers-reduced-motion block at the bottom of
   globals.css, keyed off an attribute instead of the media query, so the
   reduced variants can be checked without changing an OS setting. Scoped to
   [data-reduced-motion] descendants — it can only ever affect the exhibits
   container on this page.
   Every moving part on this page is a CSS transition owned by the S2
   primitives, so flattening transition-duration is the whole of it; there is
   no JS-driven motion here to guard separately. */
const REDUCED_MOTION_CSS = `
[data-reduced-motion],
[data-reduced-motion] *,
[data-reduced-motion] *::before,
[data-reduced-motion] *::after {
  animation-duration: 0.01ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.01ms !important;
  scroll-behavior: auto !important;
}
`;

/* ── contrast measurement ────────────────────────────────────────────── */

/** `rgb(20, 24, 27)` / `rgba(…)` → [r, g, b]. Anything else → null. */
function parseRgb(value: string): [number, number, number] | null {
  const parts = value.match(/-?\d*\.?\d+/g);
  if (!parts || parts.length < 3) return null;
  const [r, g, b] = parts.slice(0, 3).map(Number);
  if ([r, g, b].some((channel) => !Number.isFinite(channel))) return null;
  return [r, g, b];
}

/** WCAG 2.1 relative luminance. */
function luminance([r, g, b]: [number, number, number]) {
  const [lr, lg, lb] = [r, g, b].map((channel) => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
}

function contrastRatio(
  fg: [number, number, number],
  bg: [number, number, number],
) {
  const a = luminance(fg);
  const b = luminance(bg);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

/* ── the theme harness ───────────────────────────────────────────────── */

/**
 * One exhibit row: the same content rendered three times, each inside a
 * forcing theme class with its own ground painted. `children` is a render
 * function so an exhibit that needs to know which column it is in (the
 * contrast table) can be told.
 */
function ExhibitRow({
  id,
  label,
  note,
  children,
}: {
  id: string;
  label: string;
  note?: string;
  children: (theme: ThemeName) => React.ReactNode;
}) {
  return (
    <section aria-labelledby={`${id}-heading`} className="border-t border-line pt-4">
      <MicroLabel as="h2" id={`${id}-heading`} className="block">
        {label}
      </MicroLabel>
      {note ? (
        <p className="mt-1.5 max-w-text text-sm text-ink-muted">{note}</p>
      ) : null}
      <div className="mt-3 grid gap-3 lg:grid-cols-3">
        {THEMES.map((theme) => (
          <div
            key={theme}
            /* The theme class must sit on an element that also paints, or the
               column inherits the page's ground and proves nothing. */
            className={cn(
              theme,
              "rounded-card border border-line bg-surface p-3 text-ink",
            )}
          >
            <MicroLabel as="p" className="mb-2 block">
              {theme}
            </MicroLabel>
            {children(theme)}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── the page ────────────────────────────────────────────────────────── */

export function PreviewClient() {
  const [reducedMotion, setReducedMotion] = React.useState(false);
  const [ratios, setRatios] = React.useState<Record<string, number>>({});
  const exhibitsRef = React.useRef<HTMLDivElement>(null);

  /* Measured, not tabulated. Every swatch carries its foreground and its
     background on the same node, so getComputedStyle gives both roles as the
     browser actually resolved them for that theme column. Runs once on mount;
     the values cannot change afterwards. Until it has run, every cell reads
     "—" rather than a number nobody measured. */
  React.useEffect(() => {
    const root = exhibitsRef.current;
    if (!root) return;
    const measured: Record<string, number> = {};
    root.querySelectorAll<HTMLElement>("[data-swatch]").forEach((node) => {
      const key = node.dataset.swatch;
      if (!key) return;
      const styles = getComputedStyle(node);
      const fg = parseRgb(styles.color);
      const bg = parseRgb(styles.backgroundColor);
      if (!fg || !bg) return;
      measured[key] = contrastRatio(fg, bg);
    });
    setRatios(measured);
  }, []);

  return (
    <main className="mx-auto max-w-wide px-gutter py-12">
      <style>{REDUCED_MOTION_CSS}</style>

      <header className="border-b border-line pb-6">
        <MicroLabel as="p" className="block">
          Internal · noindex
        </MicroLabel>
        {/* Martian, not Ultra. The poster face is exempted for the type-scale
            exhibit only — see the note in ./exhibits. */}
        <h1 className="mt-2 text-3xl font-medium">Component preview</h1>
        <p className="mt-3 max-w-text text-sm text-ink-muted">
          Every component in the system, rendered in light, dark and dim at the
          same time. Demo entries are selected from the content layer by
          predicate, so this page follows the real data. Contrast values are
          measured from the rendered swatches, not copied from a table.
        </p>

        <label className="mt-5 inline-flex items-center gap-2.5 rounded-control border border-line bg-surface-1 px-3 py-2">
          <input
            type="checkbox"
            checked={reducedMotion}
            onChange={(event) => setReducedMotion(event.target.checked)}
            className="size-4 accent-accent"
          />
          <MicroLabel>Reduced motion</MicroLabel>
        </label>
      </header>

      <div
        ref={exhibitsRef}
        /* Deliberately undefined rather than false — [data-reduced-motion]
           matches an empty value but also matches "false". */
        data-reduced-motion={reducedMotion ? "" : undefined}
        className="flex flex-col gap-10 pt-10"
      >
        <ExhibitRow
          id="nav"
          label="Nav"
          note="Stubbed. S3 is rewriting the navbar; its exports are changing."
        >
          {() => (
            /* TODO(S7-rerun): mount the real <Navbar/> after S3 lands */
            <StubSlot>Navbar — S3</StubSlot>
          )}
        </ExhibitRow>

        <ExhibitRow
          id="footer"
          label="Footer"
          note="Stubbed. S3 is rewriting the footer; its exports are changing."
        >
          {() => (
            /* TODO(S7-rerun): mount the real <Footer/> after S3 lands */
            <StubSlot>Footer — S3</StubSlot>
          )}
        </ExhibitRow>

        <ExhibitRow
          id="people-card"
          label="People card"
          note="Illustrative composition of SurfaceCard + Expand + Pill + MicroLabel. P1's PersonCard is the production implementation; this exhibit is replaced at the S7 re-run. Alumni state: desaturated photo, muted name, the word under the class line."
        >
          {() => <PeopleCardExhibit />}
        </ExhibitRow>

        <ExhibitRow
          id="pills"
          label="Pill variants"
          note="Values are the stored badge, kind and status strings. The long-label row checks that a pill wraps rather than clips."
        >
          {() => <PillExhibit />}
        </ExhibitRow>

        <ExhibitRow
          id="filter-chips"
          label="Filter chips"
          note="Real toggle buttons carrying aria-pressed. Counts are computed from the content layer — one of them is legitimately zero."
        >
          {() => <FilterChipExhibit />}
        </ExhibitRow>

        <ExhibitRow id="event-row" label="Event row">
          {() => <EventRowExhibit />}
        </ExhibitRow>

        <ExhibitRow id="project-row" label="Project row">
          {() => <ProjectRowExhibit />}
        </ExhibitRow>

        <ExhibitRow
          id="buttons"
          label="Buttons"
          note="Stubbed. No redesigned button primitive exists yet."
        >
          {() => (
            /* TODO(S7-rerun): button styles land with the page tasks */
            <StubSlot>Button — not yet built</StubSlot>
          )}
        </ExhibitRow>

        <ExhibitRow
          id="micro-labels"
          label="Micro-labels"
          note="13px floor, 0.08em tracking, width axis back to normal, ink-muted by default."
        >
          {() => <MicroLabelExhibit />}
        </ExhibitRow>

        <ExhibitRow
          id="type-scale"
          label="Type scale"
          note="The full mono ramp plus the three poster sizes."
        >
          {() => <TypeScaleExhibit />}
        </ExhibitRow>

        <ExhibitRow
          id="colour"
          label="Colour ramp + measured contrast"
          note="Ratios are computed in the browser from the rendered swatches. Text pairs owe 4.5:1; line-strong is a non-text hairline and owes 3.0:1."
        >
          {(theme) => <ColourExhibit theme={theme} ratios={ratios} />}
        </ExhibitRow>
      </div>

      <p className="mt-12 border-t border-line pt-4 max-w-text text-sm text-ink-muted">
        {CONTRAST_PAIRS.length} colour pairs measured per theme.
      </p>
    </main>
  );
}
