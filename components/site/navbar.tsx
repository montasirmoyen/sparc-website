"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/team", label: "Team" },
  { href: "/projects", label: "Projects" },
  { href: "/events", label: "Events" },
  { href: "/blog", label: "Blog" },
  { href: "/join", label: "Join", accent: true },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  // The header carries no rule at rest and a black hairline once the page has
  // moved, so nothing underlines the masthead on landing but body copy never
  // dissolves into the sticky bar. rAF-throttled; the listener is passive.
  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setScrolled(window.scrollY > 0);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Escape closes the disclosure and hands focus back to the control that
  // opened it, so keyboard users are not dropped at the top of the document.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggle.current?.focus();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Navigating with the panel open should not leave it open on the next page.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={scrolled ? "top scrolled" : "top"}>
      <div className="pad row">
        <Link className="brand" href="/">
          <Image
            className="mark"
            src="/img/sparc-logo.png"
            alt=""
            width={32}
            height={32}
            priority
          />
          <span className="stack">
            <span className="wordmark">
              SPA<i>R</i>C
            </span>
            <span className="sub">
              Suffolk Programming, AI &amp; Research Club
            </span>
          </span>
        </Link>

        <nav id="site-nav" aria-label="Main" className={open ? "open" : undefined}>
          {links.map(({ href, label, accent }) => (
            <Link
              key={href}
              href={href}
              className={accent ? "apply-lnk" : undefined}
              aria-current={pathname === href ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((value) => !value)}
          ref={toggle}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
    </header>
  );
}
