import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const founders = [
  {
    name: "Founder Name 1",
    role: "Co-founder · Placeholder role",
    image: "/founder-1.jpg",
    blurb:
      "Short placeholder blurb about this founding member, their background, and why they helped start SPARC.",
  },
  {
    name: "Founder Name 2",
    role: "Co-founder · Placeholder role",
    image: "/founder-2.jpg",
    blurb:
      "Short placeholder blurb about this founding member, focusing on early meetings and ideas.",
  },
  {
    name: "Founder Name 3",
    role: "Founding member · Placeholder role",
    image: "/founder-3.jpg",
    blurb:
      "Short placeholder blurb about this founding member and their contributions to the first projects or events.",
  },
];

export default function TeamPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight">Founding Team</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Use this page to recognize the students who created SPARC when it was a small and
          unofficial group. Replace the placeholders below with real names, roles, and stories.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {founders.map((founder) => (
          <Card key={founder.name}>
            <CardHeader className="border-b-0 pb-0">
              <div className="flex items-center gap-3">
                <div className="relative size-12 overflow-hidden rounded-full border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
                  {/* Replace src with a real image in /public */}
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="space-y-0.5">
                  <CardTitle className="text-base">{founder.name}</CardTitle>
                  <CardDescription className="text-xs">
                    {founder.role}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-3 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
              {founder.blurb}
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}

