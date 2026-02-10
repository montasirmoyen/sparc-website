import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteShell } from "@/components/site-shell";
import { ConstellationBackground } from "@/components/constellation-background";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SPARC | Suffolk Computing AI Research Club",
  description:
    "Suffolk Computing AI Research Club (SPARC) – student-led community for AI, computing, and research at Suffolk University.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ConstellationBackground>
            <SiteShell>{children}</SiteShell>
          </ConstellationBackground>
        </ThemeProvider>
      </body>
    </html>
  );
}

