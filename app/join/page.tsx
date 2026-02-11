import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function JoinPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex min-h-screen flex-col text-zinc-900 dark:text-zinc-50 gap-y-4">
        <section className="grid gap-6 md:grid-cols-[3fr,2fr] md:items-center">
          <div className="space-y-4">
            <h1 className="text-2xl font-semibold tracking-tight">
              Join SPARC
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Join SPARC to explore machine learning and AI research, work on real projects, and connect with fellow students. All experience levels welcome!
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-600 dark:text-zinc-400">
              <span className="rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
                Recruiting
              </span>
              <span>We are openly recruiting new members for Spring 2026.</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="sm">
                <a
                  href="https://example.com/sparc-application"
                  target="_blank"
                  rel="noreferrer"
                >
                  Apply
                </a>
              </Button>
              <Button asChild size="sm" variant="outline">
                <a href="mailto:sparc@studentorgs.suffolk.edu">
                  Email us with questions
                </a>
              </Button>
            </div>
          </div>

          <div className="relative h-56 rounded-lg bg-transparent md:h-64">
            <Image
              unoptimized
              src="/sparc-join.jpeg"
              alt="SPARC Join Image"
              fill
              className="rounded-2xl object-cover"
            />
          </div>

          <Card size="sm">
            <CardHeader>
              <CardTitle className="text-base">Recruitment Process</CardTitle>
              <CardDescription>How joining works</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
              <p>
                Simply fill out our application form with some basic info about yourself, your interests, and any relevant experience. Our leadership team will review applications on a rolling basis and follow up with next steps. We typically hold an info session and/or interview to get to know applicants better and answer any questions. We want to make the process as welcoming and low-pressure as possible, so don&apos;t worry about having tons of experience – we value curiosity and enthusiasm above all!
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
              Join SPARC if you are passionate about machine learning, AI, and data science. We welcome students from all majors and backgrounds who are eager to learn, collaborate, and contribute to projects and research.
              attract – by interest, not just major.
            </CardContent>
          </Card>
          <Card size="sm">
            <CardHeader className="mb-2 border-b-0 pb-0">
              <CardTitle className="text-sm">Time commitment</CardTitle>
            </CardHeader>
            <CardContent className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
              We understand everyone has different schedules and commitments, so we don&apos;t require a specific time commitment. We encourage members to get involved in whatever way works best for them, whether that&apos;s attending meetings, contributing to projects, or just participating in discussions. We do ask that members stay engaged and communicate with the team about their availability and interests.
            </CardContent>
          </Card>
          <Card size="sm">
            <CardHeader className="mb-2 border-b-0 pb-0">
              <CardTitle className="text-sm">Accessibility</CardTitle>
            </CardHeader>
            <CardContent className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
              SPARC is committed to being welcoming and accessible to all students. No prior experience is required to join, and we offer recorded sessions and mentorship to support your learning and growth.
              experience not required, recorded sessions, mentorship).
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}

