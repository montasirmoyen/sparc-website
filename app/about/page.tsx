import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight">About SPARC</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Placeholder about text. Use this page to describe why the Suffolk Computing AI Research
          Club (SPARC) exists, what makes it unique at Suffolk University, and what kinds of
          students it&apos;s for.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Mission</CardTitle>
            <CardDescription>Why the club exists</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              Placeholder for a concise mission statement. Talk about advancing AI literacy,
              building real projects, and creating a space for research-minded students across
              majors.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Focus Areas</CardTitle>
            <CardDescription>What SPARC explores</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            <p>Use bullet-style paragraphs to describe things like:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Applied machine learning and generative AI projects.</li>
              <li>Research reading groups and paper discussions.</li>
              <li>Workshops on tools, MLOps, and modern dev practices.</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 md:grid-cols-[3fr,2fr] md:items-start">
        <Card>
          <CardHeader>
            <CardTitle>Club Story</CardTitle>
            <CardDescription>How SPARC started and where it&apos;s going</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            <p>
              Placeholder narrative about the origin of the club, early meetings, and the moment it
              transitioned from unofficial to recognized at Suffolk.
            </p>
            <p>
              Add a short timeline or highlight key milestones here: first event, first project,
              first collaboration with a department or external org, etc.
            </p>
          </CardContent>
        </Card>

        <div className="h-52 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/80 text-xs text-zinc-500 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400 md:h-full">
          {/* Replace with a real photo from /public, e.g. /about-sparc.jpg */}
          <div className="flex h-full items-center justify-center px-5 text-center">
            Image placeholder for a club photo or Suffolk campus shot. Put the final image in
            /public and update the src.
          </div>
        </div>
      </section>
    </div>
  );
}

