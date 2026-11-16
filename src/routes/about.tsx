import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, GraduationCap, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import aboutTeam from "@/assets/about-team.jpg";
import { useSiteContent } from "@/lib/site-content";
import { CtaBand, PageHero, Reveal, SectionHeading } from "@/components/site/sections";
import { initials } from "@/components/site/TrainerCard";
import { WhyChooseSection } from "@/components/site/WhyChoose";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About ZEBRYL — Empowering People and Businesses Through Technology" },
      {
        name: "description",
        content: "Learn about Zebryl Academy and Zebryl Technologies, and meet our founder Dharmendra Pandey.",
      },
      { property: "og:title", content: "About ZEBRYL" },
      { property: "og:description", content: "Empowering people and businesses through technology." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { settings, mediaUrl } = useSiteContent();
  const founderPhoto = mediaUrl(settings?.founder_photo_path);
  const founderName = settings?.founder_name ?? "Dharmendra Pandey";
  return (
    <>
      <PageHero
        eyebrow="About Zebryl"
        title={<>Empowering People and Businesses <span className="text-gradient">Through Technology.</span></>}
        description="Zebryl is a technology training and software development company that helps individuals build successful IT careers and helps businesses develop innovative digital products."
      />

      <section className="container-page grid items-center gap-12 py-24 lg:grid-cols-2">
        <Reveal>
          <img
            src={aboutTeam}
            alt="Learners collaborating on a project"
            loading="lazy"
            width={1600}
            height={1072}
            className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-elevated"
          />
        </Reveal>
        <div className="space-y-6">
          <SectionHeading align="left" eyebrow="Two divisions" title="One technology partner" />
          <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground"><GraduationCap className="size-5" /></span>
              <h3 className="text-lg font-bold">Zebryl Academy</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Our mission is to help students, freshers and working professionals develop practical IT skills and become
              industry-ready through structured training and real-time projects.
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-navy text-primary-glow"><Building2 className="size-5" /></span>
              <h3 className="text-lg font-bold">Zebryl Technologies</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Our mission is to help startups and businesses build scalable digital products, websites, mobile applications and
              AI-powered solutions.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-secondary/60 py-24">
        <div className="container-page">
          <div className="mx-auto grid max-w-5xl items-center gap-10 rounded-[2rem] border border-border bg-card p-6 shadow-elevated sm:p-10 md:grid-cols-[280px_1fr]">
            <div className="aspect-square overflow-hidden rounded-3xl bg-gradient-navy">
              {founderPhoto ? (
                <img src={founderPhoto} alt={founderName} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center font-display text-7xl font-bold text-gradient">{initials(founderName)}</div>
              )}
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Founder</span>
              <h2 className="mt-2 text-3xl font-bold">{founderName}</h2>
              <p className="mt-1 font-semibold text-muted-foreground">{settings?.founder_title}</p>
              {settings?.founder_bio && <p className="mt-5 leading-relaxed text-muted-foreground">{settings.founder_bio}</p>}
              {settings?.founder_linkedin_url && (
                <a href={settings.founder_linkedin_url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                  <Linkedin className="size-4" /> Connect on LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <WhyChooseSection />

      <CtaBand title="Let’s build what’s next" description="Whether you want to learn or build, we’d love to hear from you.">
        <Button asChild variant="hero" size="xl"><Link to="/contact">Contact Us <ArrowRight /></Link></Button>
      </CtaBand>
    </>
  );
}
