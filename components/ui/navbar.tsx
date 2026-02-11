"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/80">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:gap-6 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                    <div className="flex size-8 sm:size-9 items-center justify-center rounded-lg bg-zinc-900 text-xs sm:text-sm font-semibold text-zinc-50 shadow-sm dark:bg-zinc-50 dark:text-zinc-900">
                        SP
                    </div>
                    <div className="hidden sm:flex flex-col leading-tight">
                        <span className="text-sm font-semibold tracking-tight">
                            SPARC
                        </span>
                        <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                            Suffolk Computing AI Research Club
                        </span>
                    </div>
                </Link>

                <nav className="hidden items-center gap-1 text-sm font-medium lg:flex">
                    <NavLink href="/">Home</NavLink>
                    <NavLink href="/about">About</NavLink>
                    <NavLink href="/team">Team</NavLink>
                    <NavLink href="/events">Events</NavLink>
                    <NavLink href="/projects">Projects</NavLink>
                    <NavLink href="/join">Join</NavLink>
                    <NavLink href="/contact">Contact</NavLink>
                </nav>

                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <Button
                        asChild
                        size="sm"
                        className="hidden lg:inline-flex"
                    >
                        <Link href="/join">Apply</Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon-sm"
                        className="lg:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <X className="size-5" />
                        ) : (
                            <Menu className="size-5" />
                        )}
                    </Button>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="border-t border-zinc-200 bg-white/95 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/95 lg:hidden">
                    <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 text-sm font-medium">
                        <MobileNavLink href="/" onClick={() => setMobileMenuOpen(false)}>Home</MobileNavLink>
                        <MobileNavLink href="/about" onClick={() => setMobileMenuOpen(false)}>About</MobileNavLink>
                        <MobileNavLink href="/team" onClick={() => setMobileMenuOpen(false)}>Team</MobileNavLink>
                        <MobileNavLink href="/events" onClick={() => setMobileMenuOpen(false)}>Events</MobileNavLink>
                        <MobileNavLink href="/projects" onClick={() => setMobileMenuOpen(false)}>Projects</MobileNavLink>
                        <MobileNavLink href="/join" onClick={() => setMobileMenuOpen(false)}>Join</MobileNavLink>
                        <MobileNavLink href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</MobileNavLink>
                        <div className="border-t border-zinc-200 pt-3 dark:border-zinc-800 mt-2">
                            <Button
                                asChild
                                className="w-full"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <Link href="/join">Apply</Link>
                            </Button>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    )
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Button
      asChild
      variant="ghost"
      size="sm"
      className="px-3 text-sm font-medium text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}

function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Button
      asChild
      variant="ghost"
      className="justify-start px-3 text-sm font-medium text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
      onClick={onClick}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}

