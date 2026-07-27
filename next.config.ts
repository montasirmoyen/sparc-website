import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,

  // The redesign has no /about or /contact. Their content did not disappear:
  //
  //   /about   -> /      mission, focus and the room are the definition list
  //                      in Home's "Room 8065, most weeks" band. The founding
  //                      story and the CSMA rename moved to /join.
  //   /contact -> /join  the email is Join's secondary action, the room is in
  //                      its list, and the club advisor is an entry there too.
  //
  // Permanent, because both URLs have been public and are linked from the
  // club's own posts.
  async redirects() {
    return [
      { source: "/about", destination: "/", permanent: true },
      { source: "/contact", destination: "/join", permanent: true },
    ];
  },
};

export default nextConfig;
