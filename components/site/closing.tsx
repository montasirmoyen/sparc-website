import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export const MAIL = "mailto:sparc@studentorgs.suffolk.edu";
export const FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLScYYJFywXjQNGTlct-dIeZEdtWD25A9lmVbTzhxZm4nOpmlDg/viewform?usp=publish-editor";

type ClosingProps = {
  heading?: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
};

/**
 * The closing band and the footer. Rendered by every route rather than by the
 * layout, because the heading and the call to action change per page while the
 * footer beneath them does not.
 */
export function Closing({ heading, children, actions }: ClosingProps) {
  return (
    <section className="band ink close">
      <div className="pad">
        <h2>
          {heading ?? (
            <>
              Get in the <em>next frame.</em>
            </>
          )}
        </h2>
        <p>
          {children ??
            "No prior experience required, no wrong major. The application is a short form; if you would rather ask something first, a person answers the email."}
        </p>
        <div className="acts">
          {actions ?? (
            <>
              <Link className="btn" href="/join">
                Apply to join
              </Link>
              <a className="btn line" href={MAIL}>
                Email the club
              </a>
            </>
          )}
        </div>
        <footer>
          <div className="cols">
            <span>
              <Image
                className="mark"
                src="/img/sparc-logo.png"
                alt=""
                width={18}
                height={18}
              />
              Suffolk Programming, AI &amp; Research Club · 73 Tremont Rm 8065 ·
              Boston
            </span>
            <span>
              <a href="https://www.linkedin.com/company/suffolk-sparc/">
                LinkedIn
              </a>{" "}
              · <a href="https://github.com/SU-SPARC">GitHub</a> ·{" "}
              <a href={MAIL}>Email</a>
            </span>
            <span>© 2026 SPARC</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
