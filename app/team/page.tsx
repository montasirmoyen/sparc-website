import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const team = [
  {
    name: "Mohammed Khodor Firas Al-Tal",
    role: "President · Computer Science '26",
    image: "/mo.jpeg",
    website: "https://mohammedkhodoraltal.com/",
    blurb:
      "Hey there, I'm an undergraduate researcher in Computer Science and Applied Math at Suffolk University, passionate about AI for health, scientific discovery, and public benefit.",
  },
  {
    name: "Sarmad Shah",
    role: "Vice-President · Computer Science '26",
    image: "/sarmad.jpeg",
    blurb:
      "Hey, I'm a Computer Science Student at Suffolk University.",
  },
  {
    name: "Kyle Erhabor",
    role: "Treasurer · Computer Science '26",
    image: "/kyle.jpeg",
    website: "https://kyleerhabor.com/",
    blurb:
      "Hi, I'm a software developer studying Computer Science at Suffolk University in Boston, MA. I spend my days studying and developing software.",
  },
  {
    name: "Endi Fejzollari",
    role: "Secretary · Computer Science '27",
    image: "/endi.jpeg",
    blurb:
      "Hey, I'm a Computer Science Student at Suffolk University.",
  },
  {
    name: "Montasir Moyen",
    nickname: "Monty",
    role: "Founding Member · Computer Science '27",
    image: "/monty.jpg",
    website: "https://montasirmoyen.com/",
    blurb:
      "I'm a Computer Science student at Suffolk University in Boston, MA, check out my blogs @ montasirmoyen.com/blog",
  },
  {
    name: "Kanan Guliyev",
    role: "Founding Member · Computer Science '27",
    image: "/kanan.jpg",
    blurb:
      "Hey, I'm a Computer Science Student at Suffolk University.",
  },
];

export default function TeamPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex min-h-screen flex-col text-zinc-900 dark:text-zinc-50 gap-y-4">
        <section className="space-y-3">
          <h1 className="text-2xl font-semibold tracking-tight">Team</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Meet the team behind SPARC. We are a group of diverse and passionate students at Suffolk University, united by our love for technology and AI.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {team.map((member) => (
            <Card key={member.name}>
              <CardHeader className="border-b pb-0">
                <div className="flex items-center">
                  <div className="relative w-24 aspect-square overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
                    <Image
                      unoptimized
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-0.5 px-4">
                    <div>
                      <CardTitle className="text-base">
                        {member.name}
                        {member.nickname && (
                          <span className="text-zinc-500 dark:text-zinc-400 font-normal">
                            {" "}
                            ({member.nickname})
                          </span>
                        )}
                      </CardTitle>
                    </div>

                    <CardDescription className="text-xs">
                      {member.role}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                {member.blurb}
              </CardContent>
              <CardContent className="mt-4">
                {member.website && (
                  <Button asChild size="sm" variant="outline">
                    <a href={member.website} target="_blank" rel="noreferrer">
                      Visit Website
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </main>
  );
}

