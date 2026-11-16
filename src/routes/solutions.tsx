import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ClipboardList, Code2, LifeBuoy, PenTool, Rocket, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/lib/site-content";
import { CtaBand, PageHero, Reveal, SectionHeading } from "@/components/site/sections";
import { ServiceCard } from "@/components/site/ServiceCard";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Zebryl Technologies — Software Development & AI Solutions" },
      {
        name: "description",
        content:
          "Websites, web apps, mobile apps, AI agents, LLM solutions, e-commerce and QA automation for startups and businesses.",
      },
      { property: "og:title", content: "Zebryl Technologies — Software Development & AI Solutions" },
      { property: "og:description", content: "Transform your ideas into powerful digital solutions with Zebryl Technologies." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SolutionsPage,
});

const PROCESS = [
  { title: "Requirement Analysis", text: "We understand your goals, users and constraints.", Icon: ClipboardList },
  { title: "Planning and UI/UX Design", text: "Architecture, roadmap and user-centred designs.", Icon: PenTool },
  { title: "Development", text: "Clean, scalable code in iterative milestones.", Icon: Code2 },
  { title: "Testing and Quality Assurance", text: "Manual and automated testing at every stage.", Icon: ShieldCheck },
  { title: "Deployment", text: "Secure, smooth launch to production.", Icon: Rocket },
  { title: "Maintenance and Support", text: "Monitoring, updates and ongoing improvements.", Icon: LifeBuoy },
];

function SolutionsPage() {
  const { services } = useSiteContent();
  return (
    <>
      <PageHero
        eyebrow="Zebryl Technologies"
        title={<>Transform Your Ideas Into <span className="text-gradient">Powerful Digital Solutions.</span></>}
        description="We help startups, entrepreneurs and businesses build scalable digital products using modern technologies and AI-powered solutions."
      >
        <div className="flex flex-wrap gap-3 pt-2">
          <Button asChild variant="hero" size="xl">
            <Link to="/start-project">Get a Free Consultation <ArrowRight /></Link>
          </Button>
          <Button asChild variant="glass" size="xl">
            <a href="#services">View services</a>
          </Button>
        </div>
      </PageHero>

      <section id="services" className="container-page scroll-mt-20 py-24">
        <SectionHeading eyebrow="Services" title="What we build" description="End-to-end delivery — from strategy and design to development, testing and launch." />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 70}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-secondary/60 py-24">
        <div className="container-page">
          <SectionHeading eyebrow="How we work" title="Our development process" description="A transparent, milestone-driven process so you always know what’s next." />
          <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROCESS.map(({ title, text, Icon }, i) => (
              <Reveal key={title} delay={i * 60}>
                <li className="lift relative h-full rounded-3xl border border-border bg-card p-7 shadow-card">
                  <span className="absolute right-6 top-5 font-display text-5xl font-bold text-gradient-brand opacity-25">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand title="Have a project in mind?" description="Share your idea and we’ll get back with a free consultation and a clear plan.">
        <Button asChild variant="hero" size="xl">
          <Link to="/start-project">Discuss Your Project <ArrowRight /></Link>
        </Button>
      </CtaBand>
    </>
  );
}
