"use client";

/* /projects — the type list and its hover preview.
 *
 * A24 pattern: the index is TYPE, not thumbnails. Rows are hairline-ruled
 * lines of Martian; the cover image is a preview that appears beside the list
 * on hover, one at a time, and never enters the layout.
 *
 * Holds no content of its own. `projects` is passed in from the server page,
 * already sorted; every visible string comes from lib/content/projects.ts.
 *
 * ── the preview mechanism ────────────────────────────────────────────────
 *
 * ONE piece of state — `active`, a single accession ref or null. That is what
 * enforces "one at a time": a second preview cannot be shown because there is
 * nowhere to record a second ref. All covers render into one stack inside one
 * frame; the one whose ref matches `active` sits at opacity 1 and every other
 * at 0, with no transition on the images themselves, so at any instant exactly
 * one is visible. Moving between rows is a hard cut, deliberately.
 *
 * The frame is the only thing that animates: opacity + transform, 200ms,
 * ease-out. Timeline, hovering a row from rest:
 *   0ms    opacity 0, translateY(8px), scale(.98)   — frame idle
 *   0ms    `active` set; the matching cover is already at opacity 1
 *   200ms  opacity 1, translateY(0), scale(1)       — frame at rest
 * Leaving the list runs the same 200ms in reverse. Row-to-row costs nothing:
 * `onPointerLeave` lives on the <ol>, not on each row, so crossing a hairline
 * never fires it and the frame stays put while the cover swaps underneath.
 *
 * ── capability gate ──────────────────────────────────────────────────────
 *
 * The whole preview layer is gated on `(hover: hover) and (pointer: fine)`,
 * read through matchMedia rather than CSS because the gate governs whether
 * the layer MOUNTS, not merely how it paints — on a touch device the covers
 * are never requested at all. Initial state is false on both server and first
 * client render, so hydration matches and /projects still prerenders static.
 *
 * On touch, or on any pointer that cannot hover, the preview simply does not
 * appear. Nothing is lost: the preview is a picture of a project whose ref,
 * title, semester and summary are all already on the line, and the row links
 * out to the real thing.
 *
 * ── reduced motion ───────────────────────────────────────────────────────
 *
 * prefers-reduced-motion: reduce → the preview still appears (it is the same
 * information, and withholding it would make reduced-motion users see less),
 * but with no motion whatsoever: the transition and the translate/scale
 * classes are both dropped, so the frame is either present or absent. The
 * universal block in globals.css would already flatten the duration; this
 * removes the transform too, so nothing travels even one frame.
 */

import * as React from "react";
import Image from "next/image";

import { MicroLabel } from "@/components/ui/micro-label";
import type { Project } from "@/lib/content/types";
import { cn } from "@/lib/utils";

/* The superscript is the YEAR, per SPEC ("the year as a superscript"), and it
   is read out of `term` — never stored twice and never typed here. The full
   term keeps its own place in the micro-label. If a term ever arrives without
   a four-digit year the superscript is dropped rather than guessed. */
const YEAR = /\b(\d{4})\b/;

function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia(query);
    const sync = () => setMatches(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [query]);

  return matches;
}

export function ProjectIndex({ projects }: { projects: Project[] }) {
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [active, setActive] = React.useState<string | null>(null);

  /* No layer, no state changes. */
  const show = (ref: string) => {
    if (canHover) setActive(ref);
  };

  /* Focus parity: a keyboard user gets the same preview a mouse user gets, so
     the image is not hover-only information. Restricted to :focus-visible so a
     mouse click on a row does not re-trigger what hover already showed. */
  const showOnFocusVisible = (
    event: React.FocusEvent<HTMLAnchorElement>,
    ref: string,
  ) => {
    if (event.target.matches(":focus-visible")) show(ref);
  };

  /* Both clears live on the list, not on the row. Pointer: crossing from one
     row to the next never leaves the <ol>. Focus: React's onBlur is focusout
     and bubbles, so the relatedTarget check means tabbing down the list keeps
     the frame up and only leaving it entirely takes the frame down. */
  const clearOnListBlur = (event: React.FocusEvent<HTMLOListElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setActive(null);
  };

  return (
    <div className="relative">
      <ol onPointerLeave={() => setActive(null)} onBlur={clearOnListBlur}>
        {projects.map((project) => {
          /* repo first, live second — SP-001 is a repo, SP-002/003 are live
             sites. A project carrying neither renders as plain type. */
          const href = project.repo_url ?? project.live_url;
          const year = project.term.match(YEAR)?.[1] ?? null;

          return (
            <li
              key={project.ref}
              /* `relative` is what the stretched link below anchors to. */
              className="relative border-t border-line last:border-b"
              onPointerEnter={() => show(project.ref)}
            >
              {/* The right padding reserves the preview column at lg. It is a
                  static reservation, not a reaction to hover, so mounting the
                  layer never reflows a single line of type. */}
              <div className="py-8 lg:py-10 lg:pr-[22rem]">
                <MicroLabel as="p">
                  {project.ref} · {project.term}
                </MicroLabel>

                {/* SPEC sets the index at text-4xl. That is the desktop size:
                    Martian's advance is wide enough that 40px on a 360px
                    viewport gives about twelve characters to the line, so the
                    ramp steps down below lg. The ramp already carries -0.05em
                    at text-4xl — the "heavy negative tracking" is the token,
                    and adding tracking-tighter on top would only restate the
                    same value. No poster face here by design. */}
                <h2 className="mt-3 text-2xl font-medium sm:text-3xl lg:text-4xl">
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      onFocus={(event) => showOnFocusVisible(event, project.ref)}
                      /* Stretched link: the accessible name stays the title
                         alone while the whole row is the click target. Colour
                         change only, and deliberately not transitioned — the
                         preview is the one moving thing on this page. */
                      className="after:absolute after:inset-0 after:content-[''] hover:text-accent-text focus-visible:text-accent-text"
                    >
                      {project.title}
                    </a>
                  ) : (
                    project.title
                  )}
                  {year && (
                    <>
                      {" "}
                      {/* top-0 cancels Preflight's sup offset so the year sits
                          against the cap line rather than floating mid-word. */}
                      <sup className="top-0 align-top text-label text-ink-muted">
                        {year}
                      </sup>
                    </>
                  )}
                </h2>

                {project.summary && (
                  <p className="mt-4 max-w-text text-sm text-ink-muted">
                    {project.summary}
                  </p>
                )}

                {/* `highlights` and `status` are deliberately not rendered.
                    Status reads "completed" on all three, so a pill would
                    print the same word three times and distinguish nothing —
                    it earns its place the day a project is in_progress.
                    Highlights are three sentences per row; stacked under three
                    titles they turn the index back into the document this page
                    was rewritten to stop being. Both stay in the data for the
                    per-project page the gallery TODOs already anticipate. */}
              </div>
            </li>
          );
        })}
      </ol>

      {canHover && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[20rem] lg:block"
        >
          {/* Sticky inside a full-height absolute layer: the preview follows
              the reader down a long list without any scroll listener. top-24
              clears the sticky h-16 navbar. */}
          <div className="sticky top-24">
            <div
              className={cn(
                "relative aspect-[16/10] overflow-hidden rounded-card border border-line bg-surface-2",
                /* The only properties that change on this element are opacity
                   and transform; both are compositor-only. */
                !reduced && "transition duration-200 ease-out",
                active ? "opacity-100" : "opacity-0",
                !reduced &&
                  (active
                    ? "translate-y-0 scale-100"
                    : "translate-y-2 scale-[0.98]"),
              )}
            >
              {projects.map(
                (project) =>
                  project.cover && (
                    <Image
                      key={project.ref}
                      src={project.cover}
                      /* Decorative: the layer is aria-hidden and every fact in
                         it is already on the row. */
                      alt=""
                      fill
                      sizes="320px"
                      className={cn(
                        "object-cover",
                        active === project.ref ? "opacity-100" : "opacity-0",
                      )}
                    />
                  ),
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
