import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/lib/site-content";
import { CtaBand, PageHero, Reveal } from "@/components/site/sections";
import { TrainerCard } from "@/components/site/TrainerCard";

export const Route = createFileRoute("/trainers")({
  head: () => ({
    meta: [
      { title: "Our Trainers — Meet Zebryl's Industry Experts" },
      { name: "description", content: "Meet the industry practitioners who teach at Zebryl Academy." },
      { property: "og:title", content: "Our Trainers — Meet Zebryl's Industry Experts" },
      { property: "og:description", content: "Learn software testing, automation, AI and communication from experienced trainers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TrainersPage,
});

function TrainersPage() {
  const { trainers, mediaUrl } = useSiteContent();
  return (
    <>
      <PageHero
        eyebrow="Our Trainers"
        title={<>Meet Our <span className="text-gradient">Industry Experts</span></>}
        description="Our trainers bring real project experience into every class — so you learn how things are actually done at work."
      />
      <section className="container-page py-24">
        {trainers.length === 0 ? (
          <p className="text-center text-muted-foreground">Trainer profiles are coming soon.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trainers.map((t, i) => (
              <Reveal key={t.id} delay={(i % 3) * 70}>
                <TrainerCard trainer={t} photoUrl={mediaUrl(t.photo_path)} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
      <CtaBand title="Learn from the experts" description="Join a live batch and get mentored by our trainers.">
        <Button asChild variant="hero" size="xl">
          <Link to="/academy">Explore Courses <ArrowRight /></Link>
        </Button>
      </CtaBand>
    </>
  );
}
