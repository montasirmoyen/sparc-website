import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/site/navbar";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("Home");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* forcedTheme pins the site to light for this phase. The redesign is a
            composition of light and dark bands rather than a light theme, so a
            global inversion would turn the ink bands light and flatten the
            contact sheet. next-themes stays installed so the toggle can come
            back once the club decides. */}
        <ThemeProvider
          attribute="class"
          forcedTheme="light"
          themes={["light", "dark", "dim"]}
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
