import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Closing, MAIL } from "@/components/site/closing";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Projects",
  "Three products built and shipped by SPARC members: the Smart Campus Navigator, the CollegiateX mobile app, and the club's own website.",
);

const projects = [
  {
    src: "campus-map",
    width: 1600,
    height: 799,
    alt: "The Smart Campus Navigator interface showing a searchable campus map",
    tag: "Shipped · Spring 2025",
    href: "https://github.com/MohammedAlTal/Suffolk_CSMA",
    name: "Smart Campus Navigator & Club Finder",
    blurb:
      "The club's first group project: a campus navigation system and club finder, built to make Suffolk easier to move through.",
    did: [
      "Interactive campus map with place search",
      "Club discovery matched to student interests",
      "Working prototype delivered with team documentation",
    ],
  },
  {
    src: "collegiatex",
    width: 1600,
    height: 797,
    alt: "The CollegiateX product homepage on desktop",
    tag: "Shipped · Fall 2025",
    href: "https://collegiatex.com/",
    name: "CollegiateX Mobile App",
    blurb:
      "Mohammed, the club president, brought in CollegiateX — and every member got an internship building their mobile app.",
    did: [
      "Real internship placement with an external startup",
      "Shipped features and UX flows for the mobile app",
      "Agile cycles, code review, stakeholder feedback",
    ],
  },
  {
    src: "sparc-website",
    width: 1600,
    height: 796,
    alt: "The SPARC website homepage as currently published",
    tag: "Shipped · Spring 2026",
    href: "https://sparc-su.vercel.app",
    name: "SPARC Website",
    blurb:
      "A member team built and now maintains the club's public site — mission, team, projects, and resources for members.",
    did: [
      "Information architecture and page structure defined",
      "Reusable, responsive UI components implemented",
      "Long-term maintenance and contribution workflow planned",
    ],
  },
];

export default function ProjectsPage() {
  return (
    <>
      <main id="main">
        <section className="band lead" id="work">
          <div className="pad">
            <div className="band-head">
              <h1>
                Three products. <em>Real users.</em> No exercises.
              </h1>
              <p className="aside">
                Software built and shipped by members. Each one had a deadline
                someone outside the club cared about.
              </p>
            </div>

            <div className="work">
              {projects.map((project, i) => (
                <article className="job" key={project.src}>
                  <div className="job-img">
                    <Image
                      src={`/img/${project.src}.jpg`}
                      alt={project.alt}
                      width={project.width}
                      height={project.height}
                      loading="lazy"
                    />
                  </div>
                  <div className="job-txt">
                    <div className="job-meta">
                      <span className="frame-no">
                        Frame {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="tag">{project.tag}</span>
                    </div>
                    <h3>
                      <a href={project.href}>{project.name}</a>
                    </h3>
                    <p>{project.blurb}</p>
                    <ul>
                      {project.did.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Closing
        heading={
          <>
            Pitch the <em>next one.</em>
          </>
        }
        actions={
          <>
            <a className="btn" href={`${MAIL}?subject=Project%20pitch`}>
              Pitch a project
            </a>
            <Link className="btn line" href="/join">
              Apply to join
            </Link>
          </>
        }
      >
        Small utility, mobile app, or something bigger. Send the idea and a
        short motivation; proposals are reviewed as they arrive.
      </Closing>
    </>
  );
}
