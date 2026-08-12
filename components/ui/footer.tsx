"use client";

/* Footer — one horizontal band at a locked height, plus a strip.
 *
 *   [mark] [SPARC + tagline] ......... [About & team · Projects · Events ·
 *                                       Join │ icons]
 *
 * Translated from design/footer-v9.html. That file's custom property names
 * drifted from the token layer (see the correction table in
 * design/COMPONENTS.md) and none of them exist; the real semantic tokens are
 * used here. Its base64 photo blob is not copied either — the mask reads the
 * .webp already in public/images.
 *
 * It is a client component because it measures: the wordmark is sized from
 * the poster face's INK, which only the browser can report.
 *
 * No theme switcher here. That control belongs in the nav.
 */

import Link from "next/link";
import * as React from "react";
import { FaDiscord, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

import { MicroLabel } from "@/components/ui/micro-label";
import { SparcMark } from "@/components/ui/sparc-mark";

const LINKS = [
  { href: "/about", label: "About & team" },
  { href: "/projects", label: "Projects" },
  { href: "/events", label: "Events" },
  { href: "/join", label: "Join" },
];

/* Every destination is one already present in the repo: the first three come
   from the footer this file replaces, GitHub from app/contact/page.tsx. */
const SOCIALS = [
  {
    href: "https://www.linkedin.com/company/suffolk-programming-ai-research-club",
    label: "SPARC on LinkedIn",
    Icon: FaLinkedin,
  },
  { href: "https://discord.gg/W8veDYAku6", label: "SPARC on Discord", Icon: FaDiscord },
  { href: "https://github.com/SU-SPARC", label: "SPARC on GitHub", Icon: FaGithub },
  {
    href: "mailto:sparc@studentorgs.suffolk.edu",
    label: "Email SPARC",
    Icon: FaEnvelope,
  },
];

const EMAIL = "sparc@studentorgs.suffolk.edu";

/* globals.css exposes the width axis as a token but no utility for it. */
const WIDTH_NORMAL: React.CSSProperties = {
  fontVariationSettings: '"wdth" var(--wdth-normal)',
};

/* The three things Tailwind cannot express, and nothing else.
 *
 * 1. --sparc-foot-h. One number drives the band. It is component layout, not
 *    a design token, so it is declared here rather than in globals.css.
 *    Below ~112px the tagline starts crowding the wordmark and should move
 *    down to the strip; 120px is the tested default.
 *
 * 2. The photo mask. `background-clip: text` still wants the -webkit- prefix
 *    for older Safari, and the whole thing has to sit inside @supports so
 *    that the FAILURE MODE IS A SOLID ACCENT WORDMARK, never invisible text
 *    — which is why `color` is set to the accent on the base rule and only
 *    turned transparent inside the @supports block. background-color is
 *    repeated inside that block for the same reason one level down: it is
 *    clipped to the glyphs like every other background layer, so if the
 *    image 404s or does not cover the full text box, the uncovered letters
 *    render solid accent instead of nothing.
 *
 *    The demo masked a PRE-CROPPED band of sparc-vc-4. The repo asset is the
 *    full square frame, so the crop is done here instead. Zoom 500% shows a
 *    20%-tall slice; measured, the wordmark box is 3.87:1, so a square frame
 *    scaled to 5x the box height stays wider than the text and the glyphs
 *    are never left uncovered. y 55% lands that slice on the row of people
 *    (they run from ~44% to ~72% of the frame) rather than on the ceiling.
 *    Retune with these three variables if the asset is ever re-cropped.
 *
 * 3. The pre-hydration font-size. 0.72 x the band height is what the
 *    measurement below resolves to at the default 120px, so the server paint
 *    and the measured paint agree and there is no jump; at any other height
 *    the effect corrects it after mount.
 */
const FOOTER_CSS = `
.sparc-footer{
  --sparc-foot-h:120px;
  --sparc-mask-zoom:500%;
  --sparc-mask-x:50%;
  --sparc-mask-y:55%;
}
.sparc-footer-word{
  font-size:calc(var(--sparc-foot-h) * 0.72);
  color:var(--color-accent);
}
@supports ((-webkit-background-clip:text) or (background-clip:text)){
  .sparc-footer-word{
    background-color:var(--color-accent);
    background-image:url("/images/sparc-vc-4.webp");
    background-size:auto var(--sparc-mask-zoom);
    background-position:var(--sparc-mask-x) var(--sparc-mask-y);
    background-repeat:no-repeat;
    -webkit-background-clip:text;
    background-clip:text;
    color:transparent;
    -webkit-text-fill-color:transparent;
  }
}
`;

const Footer = () => {
  const slotRef = React.useRef<HTMLDivElement>(null);
  const wordRef = React.useRef<HTMLParagraphElement>(null);

  /* Ink-bounds auto-fit — design/COMPONENTS.md "Ultra needs .poster, always".
   *
   * Ultra's em box is not its ink: sizing the wordmark by the em box leaves
   * the caps floating, and bottom-aligning by ink clips them (13px of clip at
   * 74px available, which is why the demo exists). So measure the real ink
   * with canvas, size from that, then translate the baseline into place.
   *
   * The .poster class has already trimmed the box with negative margins, so
   * the correction is measured against the margin the browser actually
   * computed rather than assumed — that keeps the alignment honest while
   * Ultra is still loading and the fallback face is on screen.
   *
   * Runs in an effect only: canvas and getComputedStyle do not exist on the
   * server, and the server paint is a visible accent wordmark either way. */
  React.useEffect(() => {
    const slot = slotRef.current;
    const word = wordRef.current;
    if (!slot || !word) return;

    const fit = () => {
      const avail = slot.clientHeight;
      if (avail <= 0) return;

      const ctx = document.createElement("canvas").getContext("2d");
      if (!ctx) return;

      const probe = 200;
      const family = getComputedStyle(word).fontFamily;
      if (!family) return;
      ctx.font = `400 ${probe}px ${family}`;

      const m = ctx.measureText("SPARC");
      const a = m.actualBoundingBoxAscent / probe; // ink above the baseline
      const d = m.actualBoundingBoxDescent / probe; // ink below it
      const ink = a + d;
      /* Old engines report no actualBoundingBox*. Leaving the CSS size in
         place is the right failure: it is visible and roughly right. */
      if (!Number.isFinite(ink) || ink <= 0) return;

      const fA = (m.fontBoundingBoxAscent ?? m.actualBoundingBoxAscent) / probe;
      const fD = (m.fontBoundingBoxDescent ?? m.actualBoundingBoxDescent) / probe;

      const pad = 1;
      let size = (avail - pad * 2) / ink;

      /* Height is the usual constraint, but not on a phone: the tagline
         beside it wraps, the column narrows, and a height-fitted wordmark
         would run out past the band's clip. measureText's advance scales
         linearly, so one comparison catches it. */
      const availW = slot.clientWidth;
      const widthAtSize = (m.width / probe) * size;
      if (availW > 0 && widthAtSize > availW) size *= availW / widthAtSize;

      word.style.fontSize = `${size}px`;

      /* Where the ink currently starts, in slot coordinates: the .poster
         trim (a negative margin, in px now that the size is set) plus the
         baseline's offset inside the line box, minus the ascent. */
      const marginTop = parseFloat(getComputedStyle(word).marginTop) || 0;
      const baselineInBox = size * ((1 - fA - fD) / 2 + fA);
      const inkTop = marginTop + baselineInBox - a * size;
      /* Equals `pad` in the height-limited case and centres the leftover
         when the width clamp above shrank the type. */
      const top = (avail - size * ink) / 2;
      word.style.transform = `translateY(${top - inkTop}px)`;
    };

    fit();

    /* The slot changes height when the band collapses at a breakpoint or the
       tagline rewraps; the face swap changes the ink without changing the
       slot, so both triggers are needed. */
    const ro = new ResizeObserver(fit);
    ro.observe(slot);

    let live = true;
    document.fonts?.ready.then(() => {
      if (live) fit();
    });

    return () => {
      live = false;
      ro.disconnect();
    };
  }, []);

  return (
    <footer className="sparc-footer border-t border-line bg-surface">
      <style>{FOOTER_CSS}</style>

      <div className="mx-auto max-w-page px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-5 overflow-hidden rounded-card bg-surface-1 px-6 py-4 xl:h-[var(--sparc-foot-h)] xl:flex-nowrap xl:gap-6">
          {/* The mark tracks the band height, and stays solid accent: a photo
              fill inside a 13.6-unit stroke reads as noise. */}
          <SparcMark className="h-16 w-auto shrink-0 text-accent sm:h-[84px] xl:h-full" />

          {/* Not shrink-0: on a phone the tagline wraps and this column has
              to give, or the band clips it. The wordmark follows, because
              the fit below is clamped by this column's width as well as its
              height. Taller box below sm to buy back the wrapped lines. */}
          <div className="flex h-24 min-w-0 flex-1 flex-col justify-center gap-1 sm:h-[84px] xl:h-full">
            <div ref={slotRef} className="relative min-h-0 flex-1 overflow-hidden">
              {/* Ultra, and therefore .poster — see globals.css. */}
              <p
                ref={wordRef}
                className="sparc-footer-word poster absolute left-0 top-0 whitespace-nowrap"
              >
                SPARC
              </p>
            </div>
            <MicroLabel
              as="p"
              className="shrink-0 whitespace-normal sm:whitespace-nowrap"
            >
              Suffolk Programming, AI &amp; Research Club
            </MicroLabel>
          </div>

          <div className="flex w-full flex-col items-start gap-3.5 sm:flex-row sm:items-center sm:gap-5 xl:ml-auto xl:w-auto">
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="border-b border-transparent pb-[3px] text-sm text-ink transition-colors hover:border-accent hover:text-accent-text"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* A hairline, not a gap: "these are a different kind of link". */}
            <ul className="flex items-center gap-2 sm:border-l sm:border-line sm:pl-5">
              {SOCIALS.map(({ href, label, Icon }) => (
                <li key={href}>
                  {/* bg-chip / border-chip-line are theme-constant dark — that
                      is what those two tokens exist for — so the glyph cannot
                      come off the neutral ramp, which would invert with the
                      theme and vanish into the tile. text-surface is the light
                      end on light, text-ink is the light end on dark and dim;
                      both clear 13:1 here. .lift carries the -2px hover and is
                      capability-gated in globals.css. */}
                  <a
                    href={href}
                    aria-label={label}
                    {...(href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="lift grid size-8 place-items-center rounded-control border border-chip-line bg-chip text-surface transition-colors hover:border-accent hover:bg-accent hover:text-on-accent dark:text-ink"
                  >
                    <Icon aria-hidden className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Strip. Room and email only — the demo's "Suffolk University …
            Boston MA" line has no source in the repo, so it is not invented
            back. "73 Tremont, Room 8065" is the repo's room string with the
            comma the data form omits. */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-1">
          <MicroLabel as="p">73 Tremont, Room 8065</MicroLabel>
          <a
            href={`mailto:${EMAIL}`}
            className="text-label text-ink-muted transition-colors hover:text-accent-text"
            style={WIDTH_NORMAL}
          >
            {EMAIL}
          </a>
          {/* ink-muted, not ink-faint: this is 13px text, so it owes 4.5:1
              and ink-faint does not clear it — see micro-label.tsx. */}
          <p className="w-full text-label text-ink-muted" style={WIDTH_NORMAL}>
            {`© ${new Date().getFullYear()} SPARC. All rights reserved.`}
          </p>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
