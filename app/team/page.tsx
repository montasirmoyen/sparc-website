import { Fragment } from "react";
import type { Metadata } from "next";
import Image from "next/image";

import { Closing } from "@/components/site/closing";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Team",
  "Twelve members of the Suffolk Programming, AI & Research Club, printed at the same size: officers for 2026–27, the officers before them, and the founding members.",
);

/** Portrait crops vary in source resolution, so each carries its own size. */
const team = [
  {
    src: "kanan",
    size: 604,
    name: "Kanan Guliyev",
    role: "President 2026–27 · 2027",
    links: [["linkedin", "https://www.linkedin.com/in/kananguliyev/"]],
  },
  {
    src: "monty",
    size: 800,
    name: "Montasir “Monty” Moyen",
    role: "Vice-president, project lead · 2027",
    links: [
      ["site", "https://montasirmoyen.com/"],
      ["linkedin", "https://www.linkedin.com/in/montasirmoyen/"],
    ],
  },
  {
    src: "bex",
    size: 800,
    name: "Bexultan Abila",
    role: "Treasurer 2026–27 · 2027",
    links: [["linkedin", "https://www.linkedin.com/in/beksabila/"]],
  },
  {
    src: "endi",
    size: 640,
    name: "Endi Fejzollari",
    role: "Secretary · 2027",
    links: [
      ["linkedin", "https://www.linkedin.com/in/endi-fejzollari-716aab181/"],
    ],
  },
  {
    src: "allan",
    size: 800,
    name: "Allan Nguyen",
    role: "Social media · 2027",
    links: [
      ["site", "https://www.allandng.com/"],
      ["linkedin", "https://www.linkedin.com/in/allan-nguyen-b2236529b/"],
    ],
  },
  {
    src: "mo",
    size: 440,
    name: "Mohammed Khodor Firas Al-Tal",
    role: "President 2025–26 · 2026",
    links: [
      ["site", "https://mohammedkhodoraltal.com/"],
      ["linkedin", "https://www.linkedin.com/in/mohammed-al-tal/"],
    ],
  },
  {
    src: "sarmad",
    size: 400,
    name: "Sarmad Shah",
    role: "Vice-president 2025–26 · 2026",
    links: [["linkedin", "https://www.linkedin.com/in/sarmadshah03/"]],
  },
  {
    src: "kyle",
    size: 680,
    name: "Kyle Erhabor",
    role: "Treasurer 2025–26 · 2026",
    links: [
      ["site", "https://kyleerhabor.com/"],
      ["linkedin", "https://www.linkedin.com/in/kyleerhabor/"],
    ],
  },
  {
    src: "andrew",
    size: 680,
    name: "Andrew Yuen",
    role: "Founding member · 2027",
    links: [["linkedin", "https://www.linkedin.com/in/andrew-yuen-su/"]],
  },
  {
    src: "anthony",
    size: 640,
    name: "Anthony Sek",
    role: "Founding member · 2026",
    links: [["linkedin", "https://www.linkedin.com/in/anthony1sek/"]],
  },
  {
    src: "yunus",
    size: 440,
    name: "Yunus Abdurahman",
    role: "Founding member · 2027",
    links: [["linkedin", "https://www.linkedin.com/in/yunus-abdurahman/"]],
  },
  {
    src: "margulan",
    size: 800,
    name: "Margulan Kudaibergen",
    role: "Founding member · 2028",
    links: [["linkedin", "https://www.linkedin.com/in/margulan-kudaibergen/"]],
  },
];

export default function TeamPage() {
  return (
    <>
      <main id="main">
        <section className="band ink lead" id="wall">
          <div className="pad">
            <div className="band-head">
              <h1>
                The <em>wall</em>
              </h1>
              <p className="aside">
                Everyone on the record, printed at the same size. Officers
                elected for 2026–27, then the officers before them, then the
                founding members.
              </p>
            </div>
          </div>
          <div className="pad">
            <div className="wall">
              {team.map((member) => (
                <div className="face" key={member.src}>
                  <Image
                    src={`/img/${member.src}.jpg`}
                    alt={member.name}
                    width={member.size}
                    height={member.size}
                    loading="lazy"
                  />
                  <div className="id">
                    <b>{member.name}</b>
                    <span>{member.role}</span>
                    {member.links.map(([label, href], i) => (
                      <Fragment key={href}>
                        {i > 0 && " "}
                        <a href={href}>{label}</a>
                      </Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Closing />
    </>
  );
}
