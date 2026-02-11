import Image from "next/image";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
      <div className="flex min-h-screen flex-col text-zinc-900 dark:text-zinc-50 gap-y-6 sm:gap-y-8">
        <section className="grid gap-6 sm:gap-8 md:grid-cols-[3fr,2fr] md:items-center">
          <div className="space-y-4">
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              Suffolk University · Student Club
            </p>
            <h1 className="text-balance text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
              Suffolk Computing AI Research Club
            </h1>
            <p className="max-w-xl text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              SPARC is a student club at Suffolk University focused on applied machine learning and AI research. We build real projects, host workshops, and create a space for students across majors to explore the world of AI together.
            </p>
          </div>
        </section>

        <div className="relative h-48 sm:h-56 rounded-2xl bg-transparent md:h-64">
          <Image
            unoptimized
            src="/sparc-1.jpg"
            alt="SPARC Hero Image"
            fill
            className="rounded-2xl object-cover"
          />
        </div>

        <section className="grid gap-4 sm:gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-zinc-200 bg-white/80 p-3 sm:p-4 text-xs sm:text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
            <h2 className="mb-2 text-xs sm:text-sm font-semibold">Research & Learning</h2>
            <p className="text-[11px] sm:text-xs text-zinc-600 dark:text-zinc-400">
              Explore the latest AI and machine learning research through discussions, workshops, and hands-on learning.
            </p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white/80 p-3 sm:p-4 text-xs sm:text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
            <h2 className="mb-2 text-xs sm:text-sm font-semibold">Projects</h2>
            <p className="text-[11px] sm:text-xs text-zinc-600 dark:text-zinc-400">
              Build real-world AI applications, from generative models to chatbots. All skill levels welcome.
            </p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white/80 p-3 sm:p-4 text-xs sm:text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
            <h2 className="mb-2 text-xs sm:text-sm font-semibold">Community</h2>
            <p className="text-[11px] sm:text-xs text-zinc-600 dark:text-zinc-400">
              Connect with fellow students interested in AI. Social events, panels, and collaboration opportunities.
            </p>
          </div>
        </section>

        <div className="relative h-48 sm:h-56 rounded-2xl bg-transparent md:h-64">
          <Image
            unoptimized
            src="/sparc-2.jpg"
            alt="SPARC Hero Image"
            fill
            className="rounded-2xl object-cover"
          />
        </div>
      </div>
    </main>
  );
}
