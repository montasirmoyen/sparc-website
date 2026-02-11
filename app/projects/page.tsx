import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProjectsPage() {
  const projects = [
    {
      name: "Smart Campus Navigator & Club Finder",
      status: "Completed",
      timeframe: "Spring 2025",
      description:
        "Our first ever group project focused on creating a smart campus navigation system and club finder to enhance student experience.",
    },
    {
      name: "CollegiateX Internship",
      status: "Completed",
      timeframe: "Fall 2025",
      description:
        "In the fall 2025, Mohammed, the president of SPARC, collaborated with CollegiateX and granted everyone at the club an internship to build their mobile app.",
    },
    {
      name: "SPARC Website",
      status: "Idea / Proposal",
      timeframe: "Spring 2026",
      description:
        "A group of SPARC members is proposing to build and maintain a public website for the club, showcasing our mission, team, projects, and resources for members. This would be a great opportunity to learn web development and create something that represents SPARC to the wider community.",
    },
  ];

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex min-h-screen flex-col text-zinc-900 dark:text-zinc-50">
        <section className="space-y-3">
          <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Placeholder overview of SPARC projects. Describe the balance between research,
            experimentation, and building things that are useful to students or the wider community.
          </p>
        </section>

        <section className="grid gap-2 md:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.name} size="sm">
              <CardHeader className="mb-2 border-b-0 pb-0">
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-sm">{project.name}</CardTitle>
                  <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
                    {project.status}
                  </span>
                </div>
                <CardDescription className="text-[11px] uppercase tracking-[0.18em]">
                  {project.timeframe}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                {project.description}
              </CardContent>
              <CardFooter className="mt-3 border-t-0 pt-0 text-[11px] text-zinc-500 dark:text-zinc-400">
                Optional: add links to GitHub, demos, or papers here.
              </CardFooter>
            </Card>
          ))}
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Propose a Project</CardTitle>
              <CardDescription>How members can pitch ideas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
              <p>
                Placeholder instructions for proposing new projects. Describe how you collect ideas
                (e.g., forms, Discord channels, meetings) and how you decide what to run each
                semester.
              </p>
            </CardContent>
            <CardFooter className="justify-start gap-2">
              <Button size="sm" variant="outline">
                Link to a project proposal form
              </Button>
            </CardFooter>
          </Card>
        </section>
      </div>
    </main>
  );
}

