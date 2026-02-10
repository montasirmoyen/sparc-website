import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 py-6">
      <section className="grid gap-8 md:grid-cols-[3fr,2fr] md:items-center">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            Suffolk University · Student Club
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Suffolk Computing AI Research Club
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Placeholder hero copy. Describe SPARC&apos;s mission here: exploring
            AI, building projects, and fostering a community of students
            interested in research and real-world applications.
          </p>
        </div>
        <div className="relative h-56 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/80 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 md:h-64">
          {/* Replace this with a real club hero image from /public */}
          <Image
          unoptimized
            src="/sparc-1.jpg"
            alt="SPARC Hero Image"
            fill
            className="rounded-2xl object-cover"
          />
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 bg-white/80 p-4 text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
          <h2 className="mb-1 text-sm font-semibold">Research & Learning</h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Placeholder text for how SPARC approaches research, reading groups,
            and keeping up with the latest in AI.
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white/80 p-4 text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
          <h2 className="mb-1 text-sm font-semibold">Projects</h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Placeholder text for project work: hackathons, internal tools,
            research prototypes, and collaborations.
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white/80 p-4 text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
          <h2 className="mb-1 text-sm font-semibold">Community</h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Placeholder text for events, socials, mentorship, and how new
            members get involved.
          </p>
        </div>
      </section>
    </div>
  );
}
