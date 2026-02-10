import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function JoinPage() {
  return (
    <div className="space-y-8">
      <section className="grid gap-6 md:grid-cols-[3fr,2fr] md:items-center">
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold tracking-tight">
            Join SPARC
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Placeholder join message. Explain who you&apos;re looking for, what commitment looks
            like, and how open the club is to different experience levels.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-600 dark:text-zinc-400">
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
              Recruiting
            </span>
            <span>Replace this with details about recruitment windows and cycles.</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="sm">
              <a
                href="https://example.com/sparc-application"
                target="_blank"
                rel="noreferrer"
              >
                Open Join Application (placeholder)
              </a>
            </Button>
            <Button asChild size="sm" variant="outline">
              <a href="mailto:placeholder@suffolk.edu">
                Email us with questions
              </a>
            </Button>
          </div>
        </div>

        <Card size="sm">
          <CardHeader>
            <CardTitle className="text-base">Recruitment Process</CardTitle>
            <CardDescription>How joining works</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
            <p>
              Use this area to describe application steps. For example: short form, quick
              conversation with current members, and a low-pressure onboarding project.
            </p>
            <p>
              You can also mention expectations around meeting attendance, communication (Discord,
              email, etc.), and opportunities for leadership.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <Card size="sm">
          <CardHeader className="mb-2 border-b-0 pb-0">
            <CardTitle className="text-sm">Who should apply</CardTitle>
          </CardHeader>
          <CardContent className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
            Placeholder bullet-style description of the kinds of students you&apos;re hoping to
            attract – by interest, not just major.
          </CardContent>
        </Card>
        <Card size="sm">
          <CardHeader className="mb-2 border-b-0 pb-0">
            <CardTitle className="text-sm">Time commitment</CardTitle>
          </CardHeader>
          <CardContent className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
            Placeholder details about weekly meeting length, project expectations, and flexibility
            during exam periods.
          </CardContent>
        </Card>
        <Card size="sm">
          <CardHeader className="mb-2 border-b-0 pb-0">
            <CardTitle className="text-sm">Accessibility</CardTitle>
          </CardHeader>
          <CardContent className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
            Placeholder copy describing how SPARC works to be welcoming and accessible (e.g., prior
            experience not required, recorded sessions, mentorship).
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

