"use client";

import { Moon, Sun, CloudMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

/* S1 note — this file previously carried six hex literals in a `themes`
   array, painted as colour swatches through an inline style attribute.
   That is the only hex in components/ and it fails the token check.

   The swatches are gone rather than tokenised: the tokens live on :root /
   .dark / .dim, and there is no .light class to scope a light swatch back
   in while a dark theme is active, so a faithful swatch would have meant
   adding a theme block to the verified globals.css. The per-theme icon
   already carries the same meaning, and S3 re-styles this control into the
   nav regardless. Behaviour is unchanged. */
const themes = [
  { key: "light", label: "Light", Icon: Sun },
  { key: "dim", label: "Dim", Icon: CloudMoon },
  { key: "dark", label: "Dark", Icon: Moon },
] as const;

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current = theme === "system" ? resolvedTheme : theme;

  if (!mounted) {
    return (
      <Button type="button" size="icon-sm" variant="ghost" aria-label="Theme">
        <Sun className="size-4" />
      </Button>
    );
  }

  const Icon = current === "dim" ? CloudMoon : current === "dark" ? Moon : Sun;

  return (
    <div className="relative" ref={ref}>
      <Button
        type="button"
        size="icon-sm"
        variant="ghost"
        aria-label="Theme"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <Icon className="size-4" />
      </Button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-40 rounded-card border border-line bg-surface p-1 shadow-lg">
          {themes.map(({ key, label, Icon: ThemeIcon }) => (
            <button
              key={key}
              onClick={() => {
                setTheme(key);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-3 rounded-control px-3 py-2 text-left text-sm transition-colors hover:bg-surface-2 ${
                current === key ? "font-medium text-ink" : "text-ink-muted"
              }`}
            >
              <ThemeIcon className="size-4 shrink-0" />
              <span>{label}</span>
              {current === key && (
                <span className="ml-auto text-xs" aria-hidden>
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
