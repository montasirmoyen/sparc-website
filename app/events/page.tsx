import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function EventsPage() {
  const upcomingEvents = [
    {
      title: "SPARC Website Intro Panel",
      date: "February 12, 2026",
      type: "Panel",
      description:
        "Join us for an introductory panel discussion about the SPARC website and how members can get involved.",
    },
  ];

  const pastHighlight = {
    title: "Professor Z. Huang's Guest Lecture on ML",
    date: "February 5, 2026",
    type: "Guest",
    description:
      "We had the privilege of having Professor Z. Huang, a professor in the Computer Science department, for a guest lecture on machine learning research. Professor Huang shared insights from their latest work in natural language processing and engaged in a lively Q&A session with our members. It was an inspiring event that sparked great discussions and motivated many of us to dive deeper into ML research.",
  };

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
      <div className="flex min-h-screen flex-col text-zinc-900 dark:text-zinc-50 gap-y-6 sm:gap-y-8">
        <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="space-y-3">
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Events</h1>
            <p className="max-w-2xl text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Stay posted for upcoming SPARC events! We host workshops, talks, panels, and social gatherings to build community and share knowledge. Check back here for the latest updates on what we have planned.
            </p>
          </div>
          {/* 
          <Button size="sm" variant="outline">
            Add your event calendar link here
          </Button>
          */}
        </section>

        <div className="relative h-48 sm:h-56 rounded-lg bg-transparent md:h-64">
          <Image
            unoptimized
            src="/sparc-events.jpeg"
            alt="SPARC Event Image"
            fill
            className="rounded-2xl object-cover"
          />
        </div>

        <section className="grid gap-4 sm:gap-6 md:grid-cols-[3fr,2fr] md:items-start">
          <div className="space-y-4">
            <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
              Upcoming
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {upcomingEvents.map((event) => (
                <Card key={event.title}>
                  <CardHeader>
                    <CardTitle className="text-sm sm:text-base">{event.title}</CardTitle>
                    <CardDescription className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
                      <span>{event.date}</span>
                      <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] sm:text-[11px] font-medium text-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 w-fit">
                        {event.type}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs sm:text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                      {event.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
            PAST
          </h2>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm sm:text-base">{pastHighlight.title}</CardTitle>
              <CardDescription className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
                <span>{pastHighlight.date}</span>
                <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] sm:text-[11px] font-medium text-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 w-fit">
                  {pastHighlight.type}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs sm:text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
              <p>{pastHighlight.description}</p>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}

