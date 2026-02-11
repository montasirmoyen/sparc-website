import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
      <div className="flex min-h-screen flex-col text-zinc-900 dark:text-zinc-50 gap-y-6 sm:gap-y-8">
        <section className="space-y-3">
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Projects</h1>
          <p className="max-w-2xl text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Learn about our real world applications, research, and tools built by SPARC members. Our projects are hands-on opportunities to apply machine learning concepts, collaborate with peers, and create impactful solutions. 
          </p>
        </section>

        <div className="relative h-48 sm:h-56 rounded-lg bg-transparent md:h-64">
          <Image
            unoptimized
            src="/sparc-projects.jpeg"
            alt="SPARC Projects Image"
            fill
            className="rounded-2xl object-cover"
          />
        </div>

        <section className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.name} size="sm">
              <CardHeader className="mb-2 border-b-0 pb-0">
                <div className="flex items-start sm:items-center justify-between gap-2">
                  <CardTitle className="text-xs sm:text-sm leading-tight">{project.name}</CardTitle>
                  <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] sm:text-[11px] font-medium text-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 whitespace-nowrap flex-shrink-0">
                    {project.status}
                  </span>
                </div>
                <CardDescription className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em]">
                  {project.timeframe}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-xs sm:text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                {project.description}
              </CardContent>
              <CardFooter className="mt-2 sm:mt-3 border-t-0 pt-0 text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400">
                Optional: add links to GitHub, demos, or papers here.
              </CardFooter>
            </Card>
          ))}
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm sm:text-base">Propose a Project</CardTitle>
              <CardDescription className="text-xs">How members can pitch ideas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs sm:text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
              <p>
                We encourage all members to propose project ideas! Whether you have a specific problem you want to solve, a research question you want to explore, or a tool you think would benefit the community, we want to hear about it. To propose a project, simply fill out our project proposal form with your idea, motivation, and any resources or collaborators you have in mind. The SPARC leadership team will review proposals on a rolling basis and provide feedback and support to help bring your project to life.
              </p>
            </CardContent>
            <CardFooter className="justify-start gap-2">
              <Button size="sm" variant="outline" className="text-xs">
                View Form
              </Button>
            </CardFooter>
          </Card>
        </section>
      </div>
    </main>
  );
}

