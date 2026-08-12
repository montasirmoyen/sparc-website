/* MicroLabel — the small uppercase line above or beside content: class
 * years, dates, rooms, semesters, project ids. Server-safe.
 *
 * Consumed by: app/about (class line), app/events (date + room),
 * app/projects (project meta).
 *
 * Four things it exists to stop being re-guessed:
 *  - size: text-label (13px, the floor). Never a sub-13px arbitrary size.
 *  - tracking: text-label already carries its letter-spacing. No tracking
 *    utility here, or it gets applied twice.
 *  - width axis: body copy runs condensed, labels snap back to normal width.
 *    globals.css exposes no utility for that (its only width rule is the
 *    base-layer one for <small>/<figcaption>), so it is set inline here
 *    against the same token globals uses. Not a raw ramp value.
 *  - colour: text-ink-muted, and NOT text-ink-faint. This looks like the
 *    wrong default and is not — please do not "fix" it back. A micro-label
 *    carries content (dates, rooms, class years), so at 13px it is small
 *    text and owes 4.5:1. ink-faint maps to the same ramp step as
 *    line-strong and measures 4.3:1 on surface — fine for a hairline, short
 *    of the requirement for text. ink-muted measures 6.3:1. A genuinely
 *    decorative label can still opt down by passing text-ink-faint through
 *    className.
 */

import * as React from "react";
import { cn } from "@/lib/utils";

type MicroLabelElement = "span" | "p" | "div" | "dt" | "dd" | "h2" | "h3";

export interface MicroLabelProps extends React.HTMLAttributes<HTMLElement> {
  as?: MicroLabelElement;
}

const WIDTH_AXIS: React.CSSProperties = {
  fontVariationSettings: '"wdth" var(--wdth-normal)',
};

export function MicroLabel({
  as = "span",
  className,
  style,
  children,
  ...props
}: MicroLabelProps) {
  const Comp = as as React.ElementType;
  return (
    <Comp
      className={cn("text-label uppercase text-ink-muted", className)}
      style={{ ...WIDTH_AXIS, ...style }}
      {...props}
    >
      {children}
    </Comp>
  );
}
