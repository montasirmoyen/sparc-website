import type { Metadata } from "next";

import { Closing, FORM, MAIL } from "@/components/site/closing";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Join",
  "Apply to the Suffolk Programming, AI & Research Club. No prior experience required, all majors welcome, applications read as they arrive.",
);

export default function JoinPage() {
  return (
    <>
      <main id="main">
        <section className="band lead" id="join">
          <div className="pad">
            <div className="band-head">
              <h1>
                The form is <em>open.</em>
              </h1>
              <p className="aside">
                No prior experience required and no wrong major. Applications
                are read as they arrive.
              </p>
            </div>

            <div className="story">
              <div>
                <p className="big">
                  The form asks for the basics: who you are, what you are
                  interested in, and anything you have built before.
                </p>
                <div className="acts">
                  <a className="btn" href={FORM}>
                    Open the application form
                  </a>
                  <a
                    className="btn dark"
                    href={`${MAIL}?subject=Question%20about%20joining`}
                  >
                    Ask a question first
                  </a>
                </div>
              </div>
              <div className="nothing">
                <b>What happens after you send it</b>
                <p>
                  Leadership reads applications on a rolling basis and follows
                  up with next steps. There is usually an info session or a
                  short conversation so both sides can ask questions.
                </p>
                <p>
                  It is deliberately low-pressure — curiosity counts for more
                  than a CV.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="band ink" id="story">
          <div className="pad">
            <div className="band-head">
              <h2>
                Started in <em>2025.</em> Renamed in 2026.
              </h2>
            </div>
            <div className="story">
              <div>
                <p className="big">
                  SPARC was founded by students who wanted to build real things,
                  not just study theory.
                </p>
                <p>
                  It started small and grew into a community of builders from
                  across majors, held together by a shared drive to make
                  software that matters.
                </p>
                <p>
                  The club was Computational Science and Mathematics — CSMA —
                  until 2026, when it was renamed to describe what it actually
                  does: ship software, get members into internships, and stay
                  close to where technology is going.
                </p>
              </div>
              <dl>
                <dt>Who should apply</dt>
                <dd>
                  Anyone who wants to build real software, work with AI tools,
                  or get into the industry through an internship. All majors.
                  Interest and drive matter more than background.
                </dd>
                <dt>Time commitment</dt>
                <dd>
                  No fixed hours. Come to meetings, contribute to a project, or
                  just join the discussions — whatever fits the semester you are
                  having. The one ask is that you tell the team what you are up
                  for.
                </dd>
                <dt>Accessibility</dt>
                <dd>
                  No prior experience is required. Sessions are recorded and
                  members are mentored, so a late start is not a closed door.
                </dd>
                <dt>Room</dt>
                <dd>73 Tremont, Room 8065 — Boston</dd>
                <dt>Club advisor</dt>
                <dd>
                  Professor Anthony Gentilucci. Questions about club operations
                  or event planning go to him directly.{" "}
                  <a href="mailto:argentilucci@suffolk.edu">
                    argentilucci@suffolk.edu
                  </a>
                </dd>
              </dl>
            </div>
          </div>
        </section>
      </main>

      <Closing
        actions={
          <>
            <a className="btn" href={FORM}>
              Open the application form
            </a>
            <a className="btn line" href={MAIL}>
              Email the club
            </a>
          </>
        }
      >
        The application is a short form. If you would rather ask something
        first, a person answers the email.
      </Closing>
    </>
  );
}
