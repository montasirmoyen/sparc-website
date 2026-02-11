export default function Footer() {
    return (
        <footer className="border-t border-zinc-200 bg-white/80 py-4 text-xs text-zinc-500 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80 dark:text-zinc-400">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 sm:flex-row sm:px-6 lg:px-8">
                <p>
                    © {new Date().getFullYear()} Suffolk Computing AI Research Club
                    (SPARC). All rights reserved.
                </p>
                <p className="text-[11px]">
                    Suffolk University · Boston, MA · Placeholder contact info
                </p>
            </div>
        </footer>
    )
}