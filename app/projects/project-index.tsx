"use client";

/* /projects — the type list, its hover preview and the row expand.
 *
 * A24 pattern: the index is TYPE, not thumbnails. Rows are hairline-ruled
 * lines of Martian; the cover image is a preview that appears beside the list
 * on hover, one at a time, and never enters the layout.
 *
 * Holds no content of its own. `projects` is passed in from the server page,
 * already sorted; every visible string comes from lib/content/projects.ts,
 * except two labels lifted from the page this replaces and cited at their use.
 *
 * ── the row ──────────────────────────────────────────────────────────────
 *
 * Collapsed, a row is the micro-label and the title and nothing else — the
 * accession line stays a line. The title IS the trigger: a <button> carrying
 * aria-expanded + aria-controls, styled exactly as the title was, opening the
 * row in place rather than leaving the page. Everything the reader needs to
 * know what the project is or was — the summary, what the team did, the link
 * out — lives in the expanded body.
 *
 * The expand is components/ui/expand.tsx and nothing here re-implements it:
 * there is exactly one grid-template-rows animation in this codebase and it
 * lives there. Its reduced-motion behaviour comes from the universal block in
 * globals.css, so no JS guard is needed or wanted for it.
 *
 * Rows open independently — any number at once, same as the /about member
 * cards. Open state and the preview are unrelated: the preview keys off
 * pointerenter on the <li> and never reads `open`, so hovering a closed row
 * and hovering an open one do the same thing.
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
 * title and semester are already on the line, and opening the row gives the
 * summary, what was built, and the link out to the real thing.
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

import { Expand, ExpandIcon } from "@/components/ui/expand";
import { MicroLabel } from "@/components/ui/micro-label";
import type { Project } from "@/lib/content/types";
import { cn } from "@/lib/utils";

/* The superscript is the YEAR, per SPEC ("the year as a superscript"), and it
   is read out of `term` — never stored twice and never typed here. The full
   term keeps its own place in the micro-label. If a term ever arrives without
   a four-digit year the superscript is dropped rather than guessed. */
const YEAR = /\b(\d{4})\b/;

/* The one link treatment on this page. Same class string as the /events rows
   (app/events/events-record.tsx:59-60) and the 404's route links
   (app/not-found.tsx:43) so the three do not drift. `hover:` is already
   wrapped in a pointer-capability query by Tailwind v4, so it never fires on
   touch, and the colour transition is covered by the global reduced-motion
   block. */
const LINK_CLASS =
  "inline-block rounded-control border border-line bg-surface-1 px-3 py-2 text-sm text-ink transition-colors duration-200 ease-out hover:border-line-strong";

/* ── one row ─────────────────────────────────────────────────────────────
 *
 * Its own component because it owns `open`, and a hook cannot be called from
 * a map callback. The preview handlers stay in the parent — there is still
 * exactly ONE `active`, and this row only reports pointer/focus events up.
 */
function ProjectRow({
  project,
  onShow,
}: {
  project: Project;
  /** Reports "this row wants the preview" up to the single `active` owner. */
  onShow: (ref: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const bodyId = React.useId();

  /* repo first, live second — SP-001 is a repo, SP-002/003 are live sites. A
     project carrying neither renders its body without a link. */
  const href = project.repo_url ?? project.live_url;
  const year = project.term.match(YEAR)?.[1] ?? null;

  /* Focus parity: a keyboard user gets the same preview a mouse user gets, so
     the image is not hover-only information. Restricted to :focus-visible so a
     mouse click on the title does not re-trigger what hover already showed.
     Unchanged from the anchor this button replaces, down to the guard. */
  const showOnFocusVisible = (event: React.FocusEvent<HTMLButtonElement>) => {
    if (event.target.matches(":focus-visible")) onShow(project.ref);
  };

  return (
    <li
      className="border-t border-line last:border-b"
      onPointerEnter={() => onShow(project.ref)}
    >
      {/* The right padding reserves the preview column at lg. It is a static
          reservation, not a reaction to hover, so mounting the layer never
          reflows a single line of type. */}
      <div className="py-8 lg:py-10 lg:pr-[22rem]">
        {/* `relative` anchors the stretched pseudo-element below, and it is on
            this header block rather than on the <li> deliberately: the click
            surface must cover the micro-label and the title, and must NOT lie
            over the expanded body, where it would swallow the link. */}
        <div className="relative">
          <MicroLabel as="p">
            {project.ref} · {project.term}
          </MicroLabel>

          {/* SPEC sets the index at text-4xl. That is the desktop size:
              Martian's advance is wide enough that 40px on a 360px viewport
              gives about twelve characters to the line, so the ramp steps down
              below lg. The ramp already carries -0.05em at text-4xl — the
              "heavy negative tracking" is the token, and adding
              tracking-tighter on top would only restate the same value. No
              poster face here by design. */}
          <h2 className="mt-3 text-2xl font-medium sm:text-3xl lg:text-4xl">
            {/* The title IS the trigger, so aria-expanded and aria-controls
                live here and nowhere else — not on the <li>, not on <Expand>.
                Nothing interactive is nested inside it: the only children are
                text and an aria-hidden icon, and the whole-row click surface
                is a ::after pseudo-element of this button, not a DOM node
                wrapping one. */}
            <button
              type="button"
              aria-expanded={open}
              aria-controls={bodyId}
              onClick={() => setOpen((previous) => !previous)}
              onFocus={showOnFocusVisible}
              /* Colour change only, and deliberately not transitioned — the
                 preview is the one moving thing on this page. The stretched
                 ::after is what makes hovering anywhere on the header light
                 the title, exactly as the stretched link used to. */
              className="flex w-full items-start justify-between gap-4 text-left after:absolute after:inset-0 after:content-[''] hover:text-accent-text focus-visible:text-accent-text"
            >
              <span>
                {project.title}
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
              </span>
              {/* The affordance. Inside the button so it inherits the hover /
                  focus-visible colour and needs no group plumbing; aria-hidden,
                  so the accessible name is the title line itself. The top
                  margin walks up with the type ramp to keep it on the cap
                  line of the first title row. */}
              <ExpandIcon
                open={open}
                className="mt-1.5 flex-none sm:mt-2.5 lg:mt-4"
              />
            </button>
          </h2>
        </div>

        {/* THE expand — components/ui/expand.tsx. Everything that used to sit
            in the collapsed row, plus what the previous revision held back. */}
        <Expand open={open} id={bodyId} className="max-w-text">
          {project.summary && (
            <p className="text-sm text-ink-muted">{project.summary}</p>
          )}

          {project.highlights.length > 0 && (
            <>
              {/* "What We Did" — app/projects/page.tsx@f4c7e1a:118
                  (pre-rewrite), the heading this same list had there.
                  MicroLabel uppercases, as it was rendered there. */}
              <MicroLabel as="p" className="mt-5 block">
                What We Did
              </MicroLabel>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-ink-muted marker:text-ink-faint">
                {project.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          )}

          {/* `status` is still not rendered, and expanding does not change the
              argument: it reads "completed" on all three, so a pill would
              print the same word in every body and distinguish nothing. A
              facet with one value across the whole set carries no information
              wherever you put it. It earns its place the day a project is
              in_progress. */}

          {href && (
            /* "View Project" — app/projects/page.tsx@f4c7e1a:134
               (pre-rewrite), the label on that page's own Button. */
            <p className="mt-5">
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className={LINK_CLASS}
              >
                View Project
              </a>
            </p>
          )}
        </Expand>
      </div>
    </li>
  );
}

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

  /* Both clears live on the list, not on the row. Pointer: crossing from one
     row to the next never leaves the <ol>. Focus: React's onBlur is focusout
     and bubbles, so the relatedTarget check means tabbing down the list keeps
     the frame up and only leaving it entirely takes the frame down. Tabbing
     from an open row's title to its "View Project" link is a move within the
     <ol>, so the frame stays on that row's cover. */
  const clearOnListBlur = (event: React.FocusEvent<HTMLOListElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setActive(null);
  };

  return (
    <div className="relative">
      <ol onPointerLeave={() => setActive(null)} onBlur={clearOnListBlur}>
        {projects.map((project) => (
          <ProjectRow key={project.ref} project={project} onShow={show} />
        ))}
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
