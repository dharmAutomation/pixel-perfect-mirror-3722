import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FileText, Handshake, Linkedin, Mic, Route as RouteIcon, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/lib/site-content";
import { CtaBand, PageHero, Reveal, SectionHeading } from "@/components/site/sections";
import { CompanyShowcase } from "@/components/site/CompanyShowcase";

export const Route = createFileRoute("/referral-network")({
  head: () => ({
    meta: [
      { title: "Career Opportunities & Referral Network — Zebryl" },
      {
        name: "description",
        content: "Interview preparation, industry guidance and referral assistance to help you reach your next career move.",
      },
      { property: "og:title", content: "Career Opportunities & Referral Network — Zebryl" },
      { property: "og:description", content: "Your Skills. Your Opportunities. Your Next Career Move." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReferralPage,
});

const STEPS = [
  { title: "Resume building", Icon: FileText, text: "ATS-friendly resumes that highlight your projects." },
  { title: "Profile optimization", Icon: Linkedin, text: "LinkedIn and Naukri profiles recruiters notice." },
  { title: "Mock interviews", Icon: Mic, text: "Technical and HR rounds with honest feedback." },
  { title: "Career guidance", Icon: RouteIcon, text: "Choose the right roles and companies for you." },
  { title: "Referral assistance", Icon: Handshake, text: "Help reaching opportunities through our network." },
  { title: "Mentorship", Icon: Users, text: "Ongoing support until you land your role." },
];

function ReferralPage() {
  const { companies, mediaUrl } = useSiteContent();
  return (
    <>
      <PageHero
        eyebrow="Career Opportunities & Referral Network"
        title={<>Your Skills. Your Opportunities. <span className="text-gradient">Your Next Career Move.</span></>}
        description="Zebryl helps students and professionals prepare for career opportunities through interview preparation, industry guidance and referral assistance."
      >
        <div className="pt-2">
          <Button asChild variant="hero" size="xl">
            <Link to="/apply">Start Your Career Journey <ArrowRight /></Link>
          </Button>
        </div>
      </PageHero>

      <section className="container-page py-24">
        <SectionHeading eyebrow="Target companies" title="Where our learners aim to work" description="We prepare you for the hiring processes of leading technology and consulting companies." />
        <div className="mt-12">
          <CompanyShowcase companies={companies} mediaUrl={mediaUrl} />
        </div>
      </section>

      <section className="bg-secondary/60 py-24">
        <div className="container-page">
          <SectionHeading eyebrow="Career support" title="How we prepare you" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {STEPS.map(({ title, text, Icon }, i) => (
              <Reveal key={title} delay={i * 50}>
                <div className="lift h-full rounded-3xl border border-border bg-card p-7 shadow-card">
                  <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-gradient-brand-soft text-primary">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Start Your Career Journey" description="Apply to a Zebryl Academy programme and get career support from day one.">
        <Button asChild variant="hero" size="xl">
          <Link to="/apply">Apply Now <ArrowRight /></Link>
        </Button>
      </CtaBand>
    </>
  );
}
