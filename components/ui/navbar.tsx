
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
    return (
        <header className="border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/80">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-zinc-900 text-sm font-semibold text-zinc-50 shadow-sm dark:bg-zinc-50 dark:text-zinc-900">
                        SP
                    </div>
                    <div className="flex flex-col leading-tight">
                        <span className="text-sm font-semibold tracking-tight">
                            SPARC
                        </span>
                        <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                            Suffolk Computing AI Research Club
                        </span>
                    </div>
                </Link>

                <nav className="hidden items-center gap-1 text-sm font-medium sm:flex">
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
                        className="hidden sm:inline-flex"
                    >
                        <Link href="/join">Apply</Link>
                    </Button>
                </div>
            </div>
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

