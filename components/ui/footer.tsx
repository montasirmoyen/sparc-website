export default function Footer() {
    return (
        <footer className="border-t border-zinc-200 bg-white/80 py-3 sm:py-4 text-xs text-zinc-500 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80 dark:text-zinc-400">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-center sm:text-left sm:flex-row sm:px-6 lg:px-8">
                <p className="text-[11px] sm:text-xs">
                    © {new Date().getFullYear()} Suffolk Computing AI Research Club
                    (SPARC). All rights reserved.
                </p>
                <p className="text-[10px] sm:text-[11px]">
                    Suffolk University · Boston, MA · sparc@studentorgs.suffolk.edu
                </p>
            </div>
        </footer>
    )
}