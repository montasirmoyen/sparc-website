import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Closing } from "@/components/site/closing";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Blog",
  "Three write-ups from SPARC: the CollegiateX internships, the campus navigator the club shipped, and Professor Huang's guest lecture in Room 8065.",
);

/**
 * Three posts about things that actually happened. Dates sit in the meta line
 * at 11px rather than in the headings — the club posts when there is something
 * to post, and a blog that advertises its own staleness is worse than none.
 */
const posts = [
  {
    slug: "lecture",
    src: "lecture",
    width: 1200,
    height: 944,
    alt: "A talk in progress in Room 8065, members seated in the front rows",
    meta: "February 2026",
    tag: "Guest lecture",
    title: "Professor Huang stayed past the hour",
    body: [
      "Professor Z. Huang from the Computer Science department came to Room 8065 to talk about machine learning research — specifically the natural language processing work coming out of the department.",
      "The talk was the scheduled part. The Q&A was not: it ran past the hour and kept going, most of it on how a student gets from coursework into research at all.",
      "Meetings like this are why the room is booked. A guest lecture costs one evening to organize and it is the fastest way for a member to find out whether a field is worth a semester before committing one to it.",
    ],
    link: { href: "/events", label: "Every night in 8065", internal: true },
  },
  {
    slug: "collegiatex",
    src: "collegiatex",
    width: 1600,
    height: 797,
    alt: "The CollegiateX product homepage on desktop",
    meta: "Fall 2025",
    tag: "Internships",
    title: "Every member got an internship",
    body: [
      "In the fall of 2025 Mohammed Al-Tal, then the club's president, brought CollegiateX to SPARC. It was not a workshop or a case study. The startup took the club on and every member got an internship building their mobile app.",
      "What that turned into: sprints against a real backlog, code review by someone outside the club, and feedback from a stakeholder with a product to ship. Members contributed features and UX flows to the app.",
      "It is still the clearest answer to what the club is for. Plenty of students read about agile process. Very few sit inside a real one before they graduate.",
    ],
    link: { href: "https://collegiatex.com/", label: "CollegiateX", internal: false },
  },
  {
    slug: "campus-map",
    src: "campus-map",
    width: 1600,
    height: 799,
    alt: "The Smart Campus Navigator interface showing a searchable campus map",
    meta: "Spring 2025",
    tag: "Projects",
    title: "The first thing we shipped was a map",
    body: [
      "Before the club was SPARC it was CSMA, and the first group project was a campus navigator. Suffolk's buildings are scattered across downtown Boston, so a new student's problem is not abstract: they cannot find the room.",
      "The club built an interactive campus map with place search and attached a club finder that matched students to organizations by interest. It went out as a working prototype with team documentation, not a slide deck.",
      "It is small next to what came after. It also set the rule the club still runs on: a deadline somebody outside the room cares about.",
    ],
    link: {
      href: "https://github.com/MohammedAlTal/Suffolk_CSMA",
      label: "Source on GitHub",
      internal: false,
    },
  },
];

export default function BlogPage() {
  return (
    <>
      <main id="main">
        <section className="band lead" id="log">
          <div className="pad">
            <div className="band-head">
              <h1>
                The <em>log</em>
              </h1>
              <p className="aside">
                Three things that happened, written up by the people who were in
                the room. Not a news feed — the club posts when there is
                something to post.
              </p>
            </div>

            <div className="work">
              {posts.map((post) => (
                <article className="job" id={post.slug} key={post.slug}>
                  <div className="job-img">
                    <Image
                      src={`/img/${post.src}.jpg`}
                      alt={post.alt}
                      width={post.width}
                      height={post.height}
                      loading="lazy"
                    />
                  </div>
                  <div className="job-txt">
                    <div className="job-meta">
                      <span className="frame-no">{post.meta}</span>
                      <span className="tag">{post.tag}</span>
                    </div>
                    <h3>
                      {post.link.internal ? (
                        <Link href={post.link.href}>{post.title}</Link>
                      ) : (
                        <a href={post.link.href}>{post.title}</a>
                      )}
                    </h3>
                    {post.body.map((paragraph) => (
                      <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                    ))}
                    <p className="frame-no">
                      {post.link.internal ? (
                        <Link href={post.link.href}>{post.link.label} →</Link>
                      ) : (
                        <a href={post.link.href}>{post.link.label} →</a>
                      )}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Closing />
    </>
  );
}
