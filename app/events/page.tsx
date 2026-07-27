import type { Metadata } from "next";
import Link from "next/link";

import { Closing } from "@/components/site/closing";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Events",
  "Every meeting SPARC has held this year in Room 8065, plus the three recorded development sessions from Spring 2026.",
);

const nights = [
  {
    date: "31 Mar 2026",
    title: "SPARC Website Development I",
    blurb:
      "Part 1 of the dev discussion on building and maintaining the website. Members brought plans and left with work assigned.",
    kind: "Development",
  },
  {
    date: "12 Feb 2026",
    title: "SPARC Website Intro Panel",
    blurb:
      "Introductory panel on the website project and the routes members have into it.",
    kind: "Panel",
  },
  {
    date: "5 Feb 2026",
    title: "Professor Z. Huang on machine learning research",
    blurb:
      "Guest lecture from the Computer Science department on natural language processing work, then a Q&A that ran past the hour.",
    kind: "Guest lecture",
  },
];

const recordings = [
  {
    date: "26 Feb 2026",
    title: "Meeting 1",
    blurb: "Project updates and implementation discussion.",
    href: "https://suffolk.zoom.us/rec/play/YM0vPAyEnmg06qQFb73LIOqeUnd9X67yeQSyNJXdzkEwY0vVwo9RndIrFkl0rmV4UJTNAsH_mx9T8jj5.YWen7KysJWaujsOP?eagerLoadZvaPages=sidemenu.billing.plan_management&accessLevel=meeting&canPlayFromShare=true&from=share_recording_detail&continueMode=true&oldStyle=true&componentName=rec-play&originRequestUrl=https%3A%2F%2Fsuffolk.zoom.us%2Frec%2Fshare%2FjGnuwrQ-G0zXyDXA59_caQ3csajOglqWP7PbkDq0uKWIp-dY-Ty_vTLrIay41wCv.f6L6cPvH2Zs29L60",
  },
  {
    date: "24 Mar 2026",
    title: "Meeting 2",
    blurb: "Planning and the next set of milestones.",
    href: "https://suffolk.zoom.us/rec/play/OVjfXxrQKRNvOOhjp7zAcx5pHCTUHQ3w2FhEN0SRORkWo7BcFtoH3edi0NKLOeO4xyrcy3jBIX4PxW_n.9Wg9uEz-vEWMVDfa?eagerLoadZvaPages=sidemenu.billing.plan_management&accessLevel=meeting&canPlayFromShare=true&from=share_recording_detail&continueMode=true&oldStyle=true&componentName=rec-play&originRequestUrl=https%3A%2F%2Fsuffolk.zoom.us%2Frec%2Fshare%2FdTUmT8tGpGdRxRpJPIiAIOEHpPA9us7CADcmqsHNAOmGqovD0qOOh9ZsQA_VcujY.BjJrVRW8NNpaCBAk",
  },
  {
    date: "3 Apr 2026",
    title: "Meeting 3",
    blurb: "Coding session on the website's frontend tasks.",
    href: "https://suffolk.zoom.us/rec/share/6FIftvYGrz3OemUrGQOm-ShzaOKu4hJSZqD75zzHDJvbY33wlDhM50ceavXfR_jW.JF2MxqyOxNq1Aks3",
  },
];

export default function EventsPage() {
  return (
    <>
      <main id="main">
        <section className="band lead" id="nights">
          <div className="pad">
            <div className="band-head">
              <h1>
                Nights in <em>8065</em>
              </h1>
              <p className="aside">
                Every meeting the club has held this year, in the same room,
                with the same red chairs.
              </p>
            </div>

            <div className="nights">
              {nights.map((night) => (
                <article className="night" key={night.title}>
                  <div className="d">{night.date}</div>
                  <div>
                    <h3>{night.title}</h3>
                    <p>{night.blurb}</p>
                  </div>
                  <div className="k">{night.kind}</div>
                </article>
              ))}
            </div>

            <div className="nothing">
              <b>Nothing on the calendar yet</b>
              <p>
                The next term&apos;s dates go up once Room 8065 is booked — this
                page will not advertise a night the club cannot hold.
              </p>
              <p>
                The three development meetings below were recorded and the links
                are open. <Link href="/join">Apply</Link> and the calendar comes
                with it.
              </p>
            </div>
          </div>
        </section>

        <section className="band" id="recordings">
          <div className="pad">
            <div className="band-head">
              <h2>
                On <em>tape</em>
              </h2>
              <p className="aside">
                Zoom recordings from the Spring 2026 development meetings. No
                sign-in, no request needed.
              </p>
            </div>
            <div className="nights">
              {recordings.map((recording) => (
                <article className="night" key={recording.title}>
                  <div className="d">{recording.date}</div>
                  <div>
                    <h3>{recording.title}</h3>
                    <p>{recording.blurb}</p>
                  </div>
                  <div className="k">
                    <a href={recording.href}>Watch recording</a>
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
