"use client";

/* /preview — the exhibits.
 *
 * Specimen catalogue for the design system. Every exhibit here is built from
 * the S2 primitives in components/ui/ — nothing in this file re-implements a
 * card, a pill, a chip or (especially) an expand. If you find yourself adding
 * a second expand mechanism, stop: components/ui/expand.tsx is the only one.
 *
 * CONTENT RULE. No name, date, role, term or count is typed into this file.
 * Every demo entry is selected from lib/content by PREDICATE (see the DEMO
 * block below), so when the roster changes this page follows it. The only
 * literal strings here are UI chrome: section labels, token names, and the
 * "SPARC" / "Aa" type specimens.
 *
 * Bundle note: importing the content modules into a client component ships
 * them to the browser. That is fine here and nowhere else — /preview is
 * noindexed, internal, and not on any user path.
 */

import * as React from "react";
import Image from "next/image";

import { Expand, ExpandTrigger } from "@/components/ui/expand";
import { FilterChip } from "@/components/ui/filter-chip";
import { MicroLabel } from "@/components/ui/micro-label";
import { Pill } from "@/components/ui/pill";
import { PosterText } from "@/components/ui/poster-text";
import { SurfaceCard } from "@/components/ui/surface-card";
import { events } from "@/lib/content/events";
import { members } from "@/lib/content/members";
import { projects } from "@/lib/content/projects";
import type { Member, Project, SparcEvent } from "@/lib/content/types";
import { cn } from "@/lib/utils";

/* ── themes ──────────────────────────────────────────────────────────── */

/* All three are FORCING classes in globals.css, so a `.light` container
   inside a `.dark` page paints light. That is what makes the side-by-side
   columns possible at all. */
export const THEMES = ["light", "dark", "dim"] as const;
export type ThemeName = (typeof THEMES)[number];

/* ── demo entries, selected by predicate ─────────────────────────────── */

/* A current member who has held a previous office — exercises the
   role_history line inside the expand. */
const DEMO_CURRENT: Member =
  members.find((m) => m.status === "current" && m.role_history.length > 0) ??
  members[0];

/* An alumni — exercises the desaturated photo, muted name and the "Alumni"
   word under the class line. */
const DEMO_ALUMNI: Member =
  members.find((m) => m.status === "alumni") ?? members[members.length - 1];

const DEMO_EVENT: SparcEvent = events[0];
const DEMO_PROJECT: Project = projects[0];

/* Badge and tag vocabularies, read off the data rather than listed here. A
   badge that nobody carries does not appear; none is invented to fill a gap. */
const BADGE_VALUES = Array.from(new Set(members.flatMap((m) => m.badges)));
const EVENT_KINDS = Array.from(new Set(events.map((e) => e.kind)));
const PROJECT_STATUSES = Array.from(new Set(projects.map((p) => p.status)));

/* Filter-chip specimens. The label IS the stored value ("current", "founding",
   "personal"), so nothing is renamed on the way to the screen, and the counts
   are real — `personal` is 0, which is exactly the case a filter row has to
   survive. */
const DEMO_CHIPS: Array<{ id: string; count: number }> = [
  { id: "current", count: members.filter((m) => m.status === "current").length },
  { id: "alumni", count: members.filter((m) => m.status === "alumni").length },
  {
    id: "founding",
    count: members.filter((m) => m.badges.includes("founding")).length,
  },
  { id: "team", count: projects.filter((p) => p.kind === "team").length },
  { id: "personal", count: projects.filter((p) => p.kind === "personal").length },
];

/* Dates are formatted from the real Date, never written out. Both the server
   render and the client render build the Date with the local-time constructor
   and format in the same zone, so the two agree. */
const DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

/* ── shared bits ─────────────────────────────────────────────────────── */

/** A labelled empty slot for a component that does not exist yet. */
export function StubSlot({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-16 place-items-center rounded-card border border-dashed border-line-strong bg-surface-1 p-4 text-center">
      <MicroLabel as="p">{children}</MicroLabel>
    </div>
  );
}

function ExhibitCaption({ children }: { children: React.ReactNode }) {
  return (
    <MicroLabel as="p" className="mt-3 mb-1.5 block first:mt-0">
      {children}
    </MicroLabel>
  );
}

/* ── people card ─────────────────────────────────────────────────────── */

/* ILLUSTRATIVE COMPOSITION — NOT the production card.
 *
 * P1 owns the real PersonCard for /about. This exists so the card's *states*
 * (collapsed, expanded, current, alumni) can be reviewed against three grounds
 * before that page is written, and it is replaced wholesale at the S7 re-run.
 * It is assembled only from SurfaceCard + Expand + ExpandTrigger + Pill +
 * MicroLabel; the layout follows design/people-badges.html (photo, class line
 * with the + level to it, reserved name/role blocks, expand below).
 */
function PersonCardExhibit({
  member,
  defaultOpen,
}: {
  member: Member;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  const bodyId = React.useId();
  const isAlumni = member.status === "alumni";

  return (
    <SurfaceCard
      as="article"
      open={open}
      padded={false}
      className="overflow-hidden"
    >
      <div className="aspect-square overflow-hidden bg-surface-2">
        {member.photo ? (
          <Image
            src={member.photo}
            /* Decorative: the name sits right below it. */
            alt=""
            width={320}
            height={320}
            className={cn(
              "h-full w-full object-cover",
              /* Alumni state, per SPEC's card-state description. */
              isAlumni && "saturate-[.25] contrast-[.95]",
            )}
          />
        ) : null}
      </div>

      <div className="px-3.5 pt-3 pb-4">
        <div className="flex items-start justify-between gap-2.5">
          <MicroLabel as="p" className="mt-1 block min-w-0">
            Class of {member.class_year}
            {isAlumni ? <span className="block">Alumni</span> : null}
          </MicroLabel>
          <ExpandTrigger
            open={open}
            controls={bodyId}
            onOpenChange={setOpen}
            aria-label={`More about ${member.name}`}
          />
        </div>

        <h3
          className={cn(
            "mt-1.5 text-lg font-medium [overflow-wrap:anywhere]",
            isAlumni && "text-ink-muted",
          )}
        >
          {member.name}
          {member.nickname ? (
            <span className="block text-sm font-normal">{member.nickname}</span>
          ) : null}
        </h3>

        <p className="mt-1 text-sm [overflow-wrap:anywhere]">
          {member.role}
          {member.role_term ? (
            <span className="whitespace-nowrap"> {member.role_term}</span>
          ) : null}
        </p>

        <Expand open={open} id={bodyId}>
          <div className="flex flex-col gap-2.5">
            {member.role_history.length > 0 ? (
              <MicroLabel as="p" className="block">
                {member.role_history.join(" · ")}
              </MicroLabel>
            ) : null}
            {member.bio ? (
              <p className="text-sm text-ink-muted">{member.bio}</p>
            ) : null}
            {/* Renders straight off the array. An empty badges array renders
                nothing — no placeholder badge is manufactured to fill it. */}
            {member.badges.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {member.badges.map((badge) => (
                  <Pill key={badge} variant="filled" className="uppercase">
                    {badge}
                  </Pill>
                ))}
              </div>
            ) : null}
          </div>
        </Expand>
      </div>
    </SurfaceCard>
  );
}

export function PeopleCardExhibit() {
  return (
    <div>
      <ExhibitCaption>current · collapsed</ExhibitCaption>
      <PersonCardExhibit member={DEMO_CURRENT} defaultOpen={false} />
      <ExhibitCaption>current · expanded</ExhibitCaption>
      <PersonCardExhibit member={DEMO_CURRENT} defaultOpen />
      <ExhibitCaption>alumni · collapsed</ExhibitCaption>
      <PersonCardExhibit member={DEMO_ALUMNI} defaultOpen={false} />
      <ExhibitCaption>alumni · expanded</ExhibitCaption>
      <PersonCardExhibit member={DEMO_ALUMNI} defaultOpen />
    </div>
  );
}

/* ── pills ───────────────────────────────────────────────────────────── */

export function PillExhibit() {
  return (
    <div>
      <ExhibitCaption>filled</ExhibitCaption>
      <div className="flex flex-wrap gap-1.5">
        {BADGE_VALUES.map((badge) => (
          <Pill key={badge} variant="filled" className="uppercase">
            {badge}
          </Pill>
        ))}
        {EVENT_KINDS.map((kind) => (
          <Pill key={kind} variant="filled" className="uppercase">
            {kind}
          </Pill>
        ))}
      </div>

      <ExhibitCaption>outline</ExhibitCaption>
      <div className="flex flex-wrap gap-1.5">
        {PROJECT_STATUSES.map((status) => (
          <Pill key={status} className="uppercase">
            {status}
          </Pill>
        ))}
        {EVENT_KINDS.map((kind) => (
          <Pill key={kind} className="uppercase">
            {kind}
          </Pill>
        ))}
      </div>

      {/* The wrap rules are the thing to check here: a pill in a narrow
          column must wrap, never clip. */}
      <ExhibitCaption>long label · wrap behaviour</ExhibitCaption>
      <div className="max-w-52">
        <Pill variant="filled" className="uppercase">
          {DEMO_PROJECT.title}
        </Pill>
      </div>
    </div>
  );
}

/* ── filter chips ────────────────────────────────────────────────────── */

export function FilterChipExhibit() {
  const [pressed, setPressed] = React.useState<string[]>([]);

  return (
    <div>
      <ExhibitCaption>interactive · aria-pressed</ExhibitCaption>
      <div className="flex flex-wrap gap-1.5">
        {DEMO_CHIPS.map((chip) => (
          <FilterChip
            key={chip.id}
            pressed={pressed.includes(chip.id)}
            count={chip.count}
            className="uppercase"
            onPressedChange={(next) =>
              setPressed((current) =>
                next
                  ? [...current, chip.id]
                  : current.filter((id) => id !== chip.id),
              )
            }
          >
            {chip.id}
          </FilterChip>
        ))}
      </div>
    </div>
  );
}

/* ── event row ───────────────────────────────────────────────────────── */

function EventRow({
  event,
  defaultOpen,
}: {
  event: SparcEvent;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  const bodyId = React.useId();

  return (
    <SurfaceCard as="article" open={open}>
      <div className="flex items-start justify-between gap-2.5">
        <div className="min-w-0">
          <MicroLabel as="p" className="block">
            {event.ref} · {DATE_FORMAT.format(event.starts_at)}
            {event.location ? ` · ${event.location}` : ""}
          </MicroLabel>
          <h3 className="mt-1.5 text-lg font-medium [overflow-wrap:anywhere]">
            {event.title}
          </h3>
        </div>
        <ExpandTrigger
          open={open}
          controls={bodyId}
          onOpenChange={setOpen}
          aria-label={`More about ${event.title}`}
        />
      </div>
      <Expand open={open} id={bodyId}>
        <div className="flex flex-col gap-2.5">
          <div className="flex flex-wrap gap-1.5">
            <Pill className="uppercase">{event.kind}</Pill>
          </div>
          {event.description ? (
            <p className="text-sm text-ink-muted">{event.description}</p>
          ) : null}
        </div>
      </Expand>
    </SurfaceCard>
  );
}

export function EventRowExhibit() {
  return (
    <div>
      <ExhibitCaption>collapsed</ExhibitCaption>
      <EventRow event={DEMO_EVENT} defaultOpen={false} />
      <ExhibitCaption>expanded</ExhibitCaption>
      <EventRow event={DEMO_EVENT} defaultOpen />
    </div>
  );
}

/* ── project row ─────────────────────────────────────────────────────── */

function ProjectRow({
  project,
  defaultOpen,
}: {
  project: Project;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  const bodyId = React.useId();

  return (
    <SurfaceCard as="article" open={open}>
      <div className="flex items-start justify-between gap-2.5">
        <div className="min-w-0">
          <MicroLabel as="p" className="block">
            {project.ref} · {project.term}
          </MicroLabel>
          <h3 className="mt-1.5 text-lg font-medium [overflow-wrap:anywhere]">
            {project.title}
          </h3>
        </div>
        <ExpandTrigger
          open={open}
          controls={bodyId}
          onOpenChange={setOpen}
          aria-label={`More about ${project.title}`}
        />
      </div>
      <Expand open={open} id={bodyId}>
        <div className="flex flex-col gap-2.5">
          <div className="flex flex-wrap gap-1.5">
            <Pill className="uppercase">{project.kind}</Pill>
            <Pill className="uppercase">{project.status}</Pill>
          </div>
          {project.summary ? (
            <p className="text-sm text-ink-muted">{project.summary}</p>
          ) : null}
          {project.highlights.length > 0 ? (
            <ul className="flex list-disc flex-col gap-1 pl-4 text-sm text-ink-muted">
              {project.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </Expand>
    </SurfaceCard>
  );
}

export function ProjectRowExhibit() {
  return (
    <div>
      <ExhibitCaption>collapsed</ExhibitCaption>
      <ProjectRow project={DEMO_PROJECT} defaultOpen={false} />
      <ExhibitCaption>expanded</ExhibitCaption>
      <ProjectRow project={DEMO_PROJECT} defaultOpen />
    </div>
  );
}

/* ── micro-labels ────────────────────────────────────────────────────── */

export function MicroLabelExhibit() {
  return (
    <div className="flex flex-col gap-2.5">
      {/* Default colour is ink-muted, NOT ink-faint — a micro-label carries
          content at 13px and so owes 4.5:1. See the header of
          components/ui/micro-label.tsx before "fixing" that. */}
      <MicroLabel as="p" className="block">
        Class of {DEMO_CURRENT.class_year}
      </MicroLabel>
      <MicroLabel as="p" className="block">
        {DATE_FORMAT.format(DEMO_EVENT.starts_at)}
        {DEMO_EVENT.location ? ` · ${DEMO_EVENT.location}` : ""}
      </MicroLabel>
      <MicroLabel as="p" className="block">
        {DEMO_PROJECT.ref} · {DEMO_PROJECT.term}
      </MicroLabel>
      {/* Inline against body copy — the width-axis snap back to normal is the
          thing to look at here. */}
      <p className="text-sm text-ink-muted">
        <MicroLabel>{DEMO_PROJECT.status}</MicroLabel> {DEMO_PROJECT.summary}
      </p>
    </div>
  );
}

/* ── type scale ──────────────────────────────────────────────────────── */

/* Class names are written out in full: Tailwind finds utilities by scanning
   source text, so a constructed `text-${step}` would never be generated. */
const TYPE_STEPS = [
  { cls: "text-xs", name: "text-xs", px: "13px" },
  { cls: "text-sm", name: "text-sm", px: "14px" },
  { cls: "text-base", name: "text-base", px: "16px" },
  { cls: "text-lg", name: "text-lg", px: "19px" },
  { cls: "text-xl", name: "text-xl", px: "23px" },
  { cls: "text-2xl", name: "text-2xl", px: "28px" },
  { cls: "text-3xl", name: "text-3xl", px: "33px" },
  { cls: "text-4xl", name: "text-4xl", px: "40px" },
  { cls: "text-label uppercase", name: "text-label", px: "13px" },
] as const;

const POSTER_STEPS = [
  { size: "sm", name: "text-poster-sm", px: "48px", specimen: "SPARC" },
  { size: "md", name: "text-poster-md", px: "72px", specimen: "SPARC" },
  { size: "lg", name: "text-poster-lg", px: "104px", specimen: "Aa" },
] as const;

/* ULTRA EXEMPTION. Site-wide, the poster face appears exactly three times —
   the hero, the footer wordmark and the /about statement. /preview is a
   noindexed internal specimen catalogue, not a page anyone browses, so the
   three poster steps below are shown here for review and do NOT count against
   that budget. Nothing else on this page uses Ultra; the headings are Martian.
   "SPARC" and "Aa" are specimen chrome, not content. */
export function TypeScaleExhibit() {
  return (
    <div>
      <ExhibitCaption>mono ramp · Martian</ExhibitCaption>
      <div className="flex flex-col">
        {TYPE_STEPS.map((step) => (
          <div
            key={step.name}
            className="flex items-baseline justify-between gap-3 border-b border-line py-2"
          >
            <span className={cn("min-w-0 truncate", step.cls)}>SPARC</span>
            <MicroLabel className="flex-none">
              {step.name} · {step.px}
            </MicroLabel>
          </div>
        ))}
      </div>

      <ExhibitCaption>poster · Ultra</ExhibitCaption>
      <div className="flex flex-col">
        {POSTER_STEPS.map((step) => (
          /* Label above rather than beside: measured in the browser, "SPARC"
             at 72px is 286px of ink and the column's content box is 398px, so
             a label sharing the line clips the specimen. overflow-hidden is
             the backstop at narrower widths. */
          <div
            key={step.name}
            className="overflow-hidden border-b border-line py-3"
          >
            <MicroLabel as="p" className="mb-2 block">
              {step.name} · {step.px}
            </MicroLabel>
            <PosterText size={step.size}>{step.specimen}</PosterText>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── colour ramp + measured contrast ─────────────────────────────────── */

/* The ramp, by semantic name. Nothing here reaches past the semantic layer to
   a raw --n-* value; that is the whole point of the layer. */
const RAMP = [
  { cls: "bg-surface", name: "surface" },
  { cls: "bg-surface-1", name: "surface-1" },
  { cls: "bg-surface-2", name: "surface-2" },
  { cls: "bg-line", name: "line" },
  { cls: "bg-line-strong", name: "line-strong" },
  { cls: "bg-ink-faint", name: "ink-faint" },
  { cls: "bg-ink-muted", name: "ink-muted" },
  { cls: "bg-ink", name: "ink" },
  { cls: "bg-accent-quiet", name: "accent-quiet" },
  { cls: "bg-accent", name: "accent" },
  { cls: "bg-chip", name: "chip" },
] as const;

/* Each pair renders as ONE element carrying both roles, so the measurement
   reads `color` and `background-color` off the same node — no palette table
   is written down anywhere in this file, and a token that only works on one
   ground shows up as a failing number in exactly one column.
   `min`: 4.5 for text, 3.0 for the non-text hairline. */
export const CONTRAST_PAIRS = [
  { id: "ink", cls: "bg-surface text-ink", name: "ink / surface", min: 4.5 },
  {
    id: "ink-muted",
    cls: "bg-surface text-ink-muted",
    name: "ink-muted / surface",
    min: 4.5,
  },
  {
    id: "accent-text",
    cls: "bg-surface text-accent-text",
    name: "accent-text / surface",
    min: 4.5,
  },
  {
    id: "on-accent",
    cls: "bg-accent text-on-accent",
    name: "on-accent / accent",
    min: 4.5,
  },
  {
    id: "line-strong",
    cls: "bg-surface text-line-strong",
    name: "line-strong / surface",
    min: 3,
  },
] as const;

/** The key written to data-swatch and read back out of the ratios map. */
export function swatchKey(theme: ThemeName, pairId: string) {
  return `${theme}:${pairId}`;
}

export function ColourExhibit({
  theme,
  ratios,
}: {
  theme: ThemeName;
  /** Empty until the measuring effect has run; missing entries render "—". */
  ratios: Record<string, number>;
}) {
  return (
    <div>
      <ExhibitCaption>ramp</ExhibitCaption>
      <div className="flex flex-col gap-1">
        {RAMP.map((step) => (
          <div key={step.name} className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className={cn(
                "h-6 w-12 flex-none rounded-control border border-line",
                step.cls,
              )}
            />
            <MicroLabel className="min-w-0 truncate">{step.name}</MicroLabel>
          </div>
        ))}
      </div>

      <ExhibitCaption>measured contrast</ExhibitCaption>
      <div className="flex flex-col gap-1">
        {CONTRAST_PAIRS.map((pair) => {
          const ratio = ratios[swatchKey(theme, pair.id)];
          const measured = typeof ratio === "number";
          const passes = measured && ratio >= pair.min;
          return (
            <div key={pair.id} className="flex items-center gap-2">
              <span
                data-swatch={swatchKey(theme, pair.id)}
                aria-hidden="true"
                className={cn(
                  "grid h-6 w-12 flex-none place-items-center rounded-control border border-line text-sm",
                  pair.cls,
                )}
              >
                Aa
              </span>
              <MicroLabel className="min-w-0 flex-1 truncate">
                {pair.name}
              </MicroLabel>
              <span className="flex-none text-sm tabular-nums">
                {measured ? ratio.toFixed(1) : "—"}
              </span>
              <MicroLabel
                className={cn("flex-none", measured && !passes && "text-accent-text")}
              >
                {measured ? (passes ? "pass" : "fail") : ""}
              </MicroLabel>
            </div>
          );
        })}
      </div>
    </div>
  );
}
