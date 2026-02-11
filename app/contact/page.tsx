import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ContactPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex min-h-screen flex-col text-zinc-900 dark:text-zinc-50">
        <section className="space-y-3">
          <h1 className="text-2xl font-semibold tracking-tight">Contact</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Placeholder overview of how to get in touch with SPARC. Replace the items below with your
            actual email, Discord, Instagram, or other channels.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          <Card size="sm">
            <CardHeader className="mb-2 border-b-0 pb-0">
              <CardTitle className="text-sm">Email</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
              <p>Replace this placeholder with your official club email address.</p>
              <Button asChild size="sm" variant="outline">
                <a href="mailto:placeholder@suffolk.edu">Email SPARC</a>
              </Button>
            </CardContent>
          </Card>

          <Card size="sm">
            <CardHeader className="mb-2 border-b-0 pb-0">
              <CardTitle className="text-sm">Social / Discord</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
              <p>
                Use this card to link to your Discord server, Instagram, or any other place members
                stay connected.
              </p>
              <Button size="sm" variant="outline">
                Add social or Discord invite link
              </Button>
            </CardContent>
          </Card>

          <Card size="sm">
            <CardHeader className="mb-2 border-b-0 pb-0">
              <CardTitle className="text-sm">Faculty / Department</CardTitle>
            </CardHeader>
            <CardContent className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
              Placeholder text for any faculty advisor details, relevant department contacts, or how
              staff can reach SPARC.
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Location & Meeting Times</CardTitle>
              <CardDescription>Where to find SPARC on campus</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
              <p>
                Placeholder details for weekly meeting time, room, or building. You can also mention
                how to stay updated when the schedule changes.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}

