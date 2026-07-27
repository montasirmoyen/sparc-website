import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Closing, MAIL } from "@/components/site/closing";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Home",
  "Suffolk Programming, AI & Research Club, photographed. Twenty-one frames from Room 8065, three shipped projects, twelve people on the wall.",
);

/** The contact sheet. The first seven land in row one at desktop and get priority. */
const sheet = [
  { src: "frame-01", alt: "The full club standing together in the lab for a group photograph" },
  { src: "frame-02", alt: "Members seated at tables with laptops open, facing the front screen" },
  { src: "frame-03", alt: "Three members turned from a round table of red chairs" },
  { src: "frame-04", alt: "A member presenting from the podium beside a slide reading Why Build with SPARC" },
  { src: "frame-05", alt: "A member at a laptop with the campus map project on the screen behind" },
  { src: "frame-06", alt: "The club lined up for a group photograph at the end of the contest" },
  { src: "frame-07", alt: "Two members working across a table from each other, laptops open" },
  { src: "frame-08", alt: "Four members in front of a projected countdown reading 24:12" },
  { src: "frame-09", alt: "A member working alone at the long table, a second laptop open beside them" },
  { src: "frame-10", alt: "The room mid-contest, timers running on both screens" },
  { src: "frame-11", alt: "A talk in progress, members seated in the front rows" },
  { src: "frame-12", alt: "Members leaning over a laptop together at a round table" },
  { src: "frame-13", alt: "Members at a table of monitors with slides on the wall screen" },
  { src: "frame-14", alt: "Members working at the desks along the wall" },
  { src: "frame-15", alt: "A member at the front screen while others work from the table" },
  { src: "frame-16", alt: "Laptops open around a round table, red chairs pushed back" },
  { src: "frame-17", alt: "A laptop and monitor showing code during a build session" },
  { src: "frame-18", alt: "Two members at the workstations along the window" },
  { src: "frame-19", alt: "A monitor and webcam set up at the front of the room" },
  { src: "frame-20", alt: "A member alone at a workstation with the clock at 52:42" },
  { src: "frame-21", alt: "The room seen from the back during the contest" },
];

const posts = [
  {
    slug: "lecture",
    title: "Professor Huang stayed past the hour",
    meta: "February 2026 · Guest lecture",
    alt: "A talk in progress in Room 8065, members seated in the front rows",
    width: 1200,
    height: 944,
  },
  {
    slug: "collegiatex",
    title: "Every member got an internship",
    meta: "Fall 2025 · Internships",
    alt: "The CollegiateX product homepage on desktop",
    width: 1600,
    height: 797,
  },
  {
    slug: "campus-map",
    title: "The first thing we shipped was a map",
    meta: "Spring 2025 · Projects",
    alt: "The Smart Campus Navigator interface showing a searchable campus map",
    width: 1600,
    height: 799,
  },
];

export default function Home() {
  return (
    <>
      <main id="main">
        {/* SIGNATURE: the contact sheet */}
        <section
          className="sheet"
          id="sheet"
          aria-label="Contact sheet: twenty-one frames from Room 8065"
        >
          <h2 className="sr">Twenty-one frames from Room 8065</h2>
          <div className="sheet-grid">
            {sheet.map((frame, i) => (
              <figure key={frame.src} style={{ "--i": i } as CSSProperties}>
                <Image
                  src={`/img/${frame.src}.jpg`}
                  alt={frame.alt}
                  width={640}
                  height={640}
                  priority={i < 7}
                  loading={i < 7 ? undefined : "lazy"}
                />
                <figcaption>{String(i + 1).padStart(2, "0")}</figcaption>
              </figure>
            ))}
          </div>
          <div className="sheet-over">
            <div className="inner">
              <p className="kicker">
                Suffolk University · Room 8065 · Est. 2025
              </p>
              <h1 className="huge">
                Suffolk Programming, <em>AI</em> &amp; Research Club
              </h1>
              <p>
                Twelve people, one room, three shipped products. SPARC builds
                and ships real software, works with AI agentic coding tools, and
                gets its members into real internships. Every major welcome —
                the photographs are all from Room 8065.
              </p>
              <div className="acts">
                <Link className="btn" href="/join">
                  Apply to join
                </Link>
                <Link className="btn line" href="/projects">
                  See what we shipped
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* what this is */}
        <section className="band lead">
          <div className="pad">
            <div className="band-head">
              <h2>
                Room <em>8065,</em> most weeks
              </h2>
              <p className="aside">
                Open to every major. The only thing asked of a member is that
                they want to build something and put it in front of people.
              </p>
            </div>
            <div className="story">
              <div>
                <p className="big">
                  The club exists to give students hands-on experience building
                  real software and shipping it to actual users.
                </p>
                <p>
                  Meetings run at 73 Tremont, Room 8065 — the room in every
                  photograph above, red chairs and all. Sessions are recorded
                  for anyone who could not make it.
                </p>
              </div>
              <dl>
                <dt>Mission</dt>
                <dd>
                  Open to all majors. Hands-on experience building real software
                  and shipping it to actual users.
                </dd>
                <dt>Focus</dt>
                <dd>
                  AI agentic coding · shipping real products used by real people
                  · tech talks on industry trends · internship and career
                  pathways
                </dd>
                <dt>Room</dt>
                <dd>73 Tremont, Room 8065 — Boston</dd>
                <dt>Ask a question</dt>
                <dd>
                  A person answers the club email.{" "}
                  <a href={MAIL}>sparc@studentorgs.suffolk.edu</a>
                </dd>
              </dl>
            </div>
          </div>
        </section>

        {/* from the log */}
        <section className="band">
          <div className="pad">
            <div className="band-head">
              <h2>
                From the <em>log</em>
              </h2>
              <p className="aside">
                What the club has actually done, written up by the people who
                were in the room.
              </p>
            </div>
            <div className="posts">
              {posts.map((post) => (
                <Link
                  className="post"
                  key={post.slug}
                  href={`/blog#${post.slug}`}
                >
                  <Image
                    src={`/img/${post.slug}.jpg`}
                    alt={post.alt}
                    width={post.width}
                    height={post.height}
                    loading="lazy"
                  />
                  <span className="id">
                    <b>{post.title}</b>
                    <span>{post.meta}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Closing />
    </>
  );
}
