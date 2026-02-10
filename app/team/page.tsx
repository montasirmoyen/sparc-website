import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const team = [
  {
    name: "Mohammed Khodor Firas Al-Tal",
    role: "President · Computer Science '26",
    image: "/mo.jpeg",
    website: "https://mohammedkhodoraltal.com/",
    blurb:
      "Mohammed Al‑Tal is an undergraduate researcher in Computer Science and Applied Math at Suffolk University, passionate about AI for health, scientific discovery, and public benefit.",
  },
  {
    name: "Sarmad Shah",
    role: "Vice-President · Computer Science '26",
    image: "/sarmad.jpeg",
    blurb:
      "\"Pakistan Zindabad!\" - Sarmad",
  },
  {
    name: "Kyle Erhabor",
    role: "Treasurer · Computer Science '26",
    image: "/kyle.jpeg",
    blurb:
      "A software developer studying Computer Science at Suffolk University in Boston, MA. I spend my days studying and developing software.",
  },
  {
    name: "Endi Fejzollari",
    role: "Secretary · Computer Science '27",
    image: "/endi.jpeg",
    blurb:
      "Computer Science Student at Suffolk University.",
  },
];

export default function TeamPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight">Team</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Use this page to recognize the students who created SPARC when it was a small and
          unofficial group. Replace the placeholders below with real names, roles, and stories.
        </p>
      </section>

      <section className="grid gap-2 md:grid-cols-3">
        {team.map((member) => (
          <Card key={member.name}>
            <CardHeader className="border-b-0 pb-0">
              <div className="flex items-center gap-3">
                <div className="relative w-24 h-24 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
                  {/* Replace src with a real image in /public */}
                  <Image
                  unoptimized
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-0.5">
                  <CardTitle className="text-base">{member.name}</CardTitle>
                  <CardDescription className="text-xs">
                    {member.role}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-3 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
              {member.blurb}
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}

