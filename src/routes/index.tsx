import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  Building2,
  CalendarCheck,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Handshake,
  Linkedin,
  MessagesSquare,
  Mic,
  MonitorPlay,
  Presentation,
  Rocket,
  Route as RouteIcon,
  UserCheck,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import { useSiteContent } from "@/lib/site-content";
import { CtaBand, Reveal, SectionHeading } from "@/components/site/sections";
import { ServiceCard } from "@/components/site/ServiceCard";
import { TrainerCard } from "@/components/site/TrainerCard";
import { CompanyShowcase } from "@/components/site/CompanyShowcase";
import { WhyChooseSection } from "@/components/site/WhyChoose";
import { TestimonialsSection } from "@/components/site/Testimonials";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ZEBRYL — Your Technology Partner for Learning and Innovation" },
      {
        name: "description",
        content:
          "Learn industry-ready IT skills with Zebryl Academy or build your website, app or AI solution with Zebryl Technologies.",
      },
      { property: "og:title", content: "ZEBRYL — Your Technology Partner for Learning and Innovation" },
      {
        property: "og:description",
        content: "IT training & career development, plus end-to-end software development and AI solutions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const ACADEMY_BENEFITS = [
  { label: "Industry-experienced trainers", Icon: GraduationCap },
  { label: "Live interactive classes", Icon: MonitorPlay },
  { label: "Real-time industry projects", Icon: Rocket },
  { label: "One-to-one doubt-clearing sessions", Icon: MessagesSquare },
  { label: "Practical assignments", Icon: ClipboardCheck },
  { label: "Weekly assessments", Icon: CalendarCheck },
  { label: "Student presentations", Icon: Presentation },
  { label: "Resume building", Icon: FileText },
  { label: "LinkedIn and Naukri profile optimization", Icon: Linkedin },
  { label: "Mock interviews", Icon: Mic },
  { label: "Interview preparation", Icon: BookOpenCheck },
  { label: "Career guidance", Icon: RouteIcon },
  { label: "Job referral assistance", Icon: Handshake },
];

function DivisionCard({
  tone,
  label,
  heading,
  description,
  items,
  cta,
}: {
  tone: "academy" | "tech";
  label: string;
  heading: string;
  description: string;
  items: string[];
  cta: React.ReactNode;
}) {
  const Icon = tone === "academy" ? GraduationCap : Building2;
  return (
    <div className="glass-card group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] p-6 shadow-elevated transition-transform duration-500 hover:-translate-y-1 sm:p-8">
      <div
        className={
          tone === "academy"
            ? "pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-primary/35 blur-3xl"
            : "pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-violet/35 blur-3xl"
        }
      />
      <div className="relative flex items-center gap-3">
        <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-gradient-brand shadow-glow">
          <Icon className="size-5 text-primary-foreground" />
        </span>
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary-glow">{label}</span>
      </div>
      <h2 className="relative mt-5 text-2xl font-bold text-navy-foreground sm:text-3xl">{heading}</h2>
      <p className="relative mt-3 text-[15px] leading-relaxed text-navy-muted">{description}</p>
      <div className="relative mt-6">{cta}</div>
      <div className="relative mt-7 border-t border-navy-border pt-5">
        <div className="flex flex-wrap gap-1.5">
          {items.map((i) => (
            <span key={i} className="rounded-full border border-navy-border bg-navy-foreground/5 px-2.5 py-1 text-xs font-medium text-navy-foreground/85">
              {i}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  const { settings, services, trainers, companies, mediaUrl } = useSiteContent();
  const tracks = settings?.home_academy_tracks ?? [];
  const techServices = settings?.home_tech_services ?? [];

  return (
    <>
      {/* HERO — both journeys visible immediately */}
      <section className="relative overflow-hidden bg-navy-deep">
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          width={1920}
          height={1088}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/30 via-navy-deep/55 to-navy-deep" />
        <div className="container-page relative pb-16 pt-10 sm:pt-14 lg:pb-24">
          <div className="mx-auto max-w-4xl animate-fade-up text-center">
            <h1 className="text-[2.1rem] font-bold leading-[1.1] text-navy-foreground sm:text-5xl lg:text-[3.4rem]">
              Your Technology Partner for <span className="text-gradient">Learning and Innovation</span>
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-navy-muted sm:text-lg">
              Learn industry-ready IT skills, build real-world projects, accelerate your career, or transform your business with
              innovative software solutions.
            </p>
          </div>

          <div className="mt-8 grid gap-5 lg:mt-10 lg:grid-cols-2">
            <div className="animate-fade-up" style={{ animationDelay: "120ms" }}>
              <DivisionCard
                tone="academy"
                label="Zebryl Academy"
                heading="Learn & Build Your Career"
                description="Get trained by industry professionals, work on real-time projects, improve your technical skills and prepare for IT job opportunities."
                items={tracks}
                cta={
                  <Button asChild variant="hero" size="xl">
                    <Link to="/academy">
                      Explore Courses &amp; Apply <ArrowRight />
                    </Link>
                  </Button>
                }
              />
            </div>
            <div className="animate-fade-up" style={{ animationDelay: "220ms" }}>
              <DivisionCard
                tone="tech"
                label="Zebryl Technologies"
                heading="Build Your Digital Product"
                description="From idea to launch, we provide end-to-end technology solutions for startups, businesses and enterprises."
                items={techServices}
                cta={
                  <Button asChild variant="hero" size="xl">
                    <Link to="/solutions">
                      Get a Free Consultation <ArrowRight />
                    </Link>
                  </Button>
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* ACADEMY BENEFITS */}
      <section className="container-page py-24">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              align="left"
              eyebrow="Zebryl Academy"
              title="More than a course — a complete career launchpad"
              description="Every programme combines live classes, real projects and dedicated career support so you finish job-ready, not just certified."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="lg">
                <Link to="/academy">View all courses <ArrowRight /></Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/apply">Apply now</Link>
              </Button>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {ACADEMY_BENEFITS.map(({ label, Icon }, i) => (
              <Reveal key={label} delay={i * 30}>
                <div className="lift flex h-full items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-card">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-brand-soft text-primary">
                    <Icon className="size-5" />
                  </span>
                  <span className="text-sm font-semibold text-foreground">{label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGIES */}
      <section className="bg-secondary/60 py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Zebryl Technologies"
            title="Software, apps and AI — built end to end"
            description="We help startups, entrepreneurs and businesses design, build, test and launch scalable digital products."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((s, i) => (
              <Reveal key={s.id} delay={i * 60}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="navy" size="lg">
              <Link to="/solutions">Explore all IT solutions <ArrowRight /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* REFERRAL NETWORK */}
      {companies.length > 0 && (
        <section className="container-page py-24">
          <SectionHeading
            eyebrow="Career Opportunities & Referral Network"
            title="Your Skills. Your Opportunities. Your Next Career Move."
            description="Zebryl helps students and professionals prepare for career opportunities through interview preparation, industry guidance and referral assistance."
          />
          <div className="mt-12">
            <CompanyShowcase companies={companies} mediaUrl={mediaUrl} />
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="hero" size="lg">
              <Link to="/referral-network">Start Your Career Journey <ArrowRight /></Link>
            </Button>
          </div>
        </section>
      )}

      {/* TRAINERS */}
      {trainers.length > 0 && (
        <section className="bg-secondary/60 py-24">
          <div className="container-page">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <SectionHeading
                align="left"
                eyebrow="Our Trainers"
                title="Meet Our Industry Experts"
                description="Learn directly from practitioners who work with these technologies every day."
              />
              <Button asChild variant="outline" size="lg">
                <Link to="/trainers"><Users /> All trainers</Link>
              </Button>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {trainers.slice(0, 3).map((t) => (
                <TrainerCard key={t.id} trainer={t} photoUrl={mediaUrl(t.photo_path)} />
              ))}
            </div>
          </div>
        </section>
      )}

      <WhyChooseSection />
      <TestimonialsSection />

      <CtaBand
        title="Ready to learn — or ready to build?"
        description="Tell us where you are headed. We’ll help you get there."
      >
        <Button asChild variant="hero" size="xl">
          <Link to="/apply"><UserCheck /> Apply for a Course</Link>
        </Button>
        <Button asChild variant="glass" size="xl">
          <Link to="/start-project"><BadgeCheck /> Start Your Project</Link>
        </Button>
      </CtaBand>
    </>
  );
}
