import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function EventsPage() {
  const upcomingEvents = [
    {
      title: "Placeholder Event 1",
      date: "Month 00, 2026",
      type: "Workshop",
      description:
        "Short description of an intro or intermediate SPARC event – for example, an applied AI workshop or reading group.",
    },
    {
      title: "Placeholder Event 2",
      date: "Month 00, 2026",
      type: "Talk / Panel",
      description:
        "Short description of a guest speaker, faculty talk, or industry panel hosted by SPARC.",
    },
  ];

  const pastHighlight = {
    title: "Past Event Highlight",
    description:
      "Use this area to describe a memorable past event, such as your first unofficial meetup, a project showcase, or a collaboration with another group.",
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold tracking-tight">Events</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Placeholder copy for how SPARC runs events. Describe formats like workshops, lightning
            talks, paper discussions, hack nights, and socials.
          </p>
        </div>
        <Button size="sm" variant="outline">
          Add your event calendar link here
        </Button>
      </section>

      <section className="grid gap-6 md:grid-cols-[3fr,2fr] md:items-start">
        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
            Upcoming
          </h2>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <Card key={event.title}>
                <CardHeader>
                  <CardTitle className="text-base">{event.title}</CardTitle>
                  <CardDescription className="flex items-center justify-between text-xs">
                    <span>{event.date}</span>
                    <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
                      {event.type}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {event.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">{pastHighlight.title}</CardTitle>
            <CardDescription>Past events and archives</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
            <p>{pastHighlight.description}</p>
            <p>
              You can link to photo albums, slide decks, or recordings here. Or include a small list
              of notable past events with dates.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

