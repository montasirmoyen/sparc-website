import type { Metadata } from "next";

export const SITE_URL = "https://sparc-su.vercel.app";

const DESCRIPTION =
  "Suffolk Programming, AI & Research Club (SPARC), a student-led club at Suffolk University where we build software, do AI agentic coding, discuss tech, and connect members with real-world internships.";

/**
 * Per-route metadata.
 *
 * Next merges metadata shallowly per top-level key, so a route that declares
 * only `openGraph.title` replaces the layout's whole openGraph object and
 * silently drops the image, url and siteName. Building the full object here
 * keeps every route's card intact.
 */
export function pageMetadata(page: string, description = DESCRIPTION): Metadata {
  return titledMetadata(`SPARC: ${page}`, description);
}

/** The layout's fallback. Routes all set their own, so this is what a route
 *  that forgets to would inherit — and 404s. */
export const baseMetadata: Metadata = titledMetadata(
  "SPARC — Suffolk Programming, AI & Research Club",
);

function titledMetadata(title: string, description = DESCRIPTION): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: SITE_URL,
      siteName: "SPARC",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/img/frame-01.jpg`,
          width: 640,
          height: 640,
          alt: "The full club standing together in the lab for a group photograph",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/img/frame-01.jpg`],
    },
  };
}
