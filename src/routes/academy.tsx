import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/lib/site-content";
import { CheckList, CtaBand, PageHero, Reveal, SectionHeading } from "@/components/site/sections";
import { CourseCard } from "@/components/site/CourseCard";

export const Route = createFileRoute("/academy")({
  head: () => ({
    meta: [
      { title: "Zebryl Academy — IT Courses with Real-Time Projects" },
      {
        name: "description",
        content:
          "Full Stack, Automation Testing with AI, Software Testing, AI & LLM, DevOps and Spoken English courses with live classes and career support.",
      },
      { property: "og:title", content: "Zebryl Academy — IT Courses with Real-Time Projects" },
      { property: "og:description", content: "Industry-ready IT training with live classes, real projects, mock interviews and referral assistance." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AcademyPage,
});

const READY = [
  "Practical, hands-on learning",
  "Real-time industry projects",
  "Experienced trainers",
  "Doubt-clearing sessions",
  "Interview preparation",
  "Resume building",
  "Mock interviews",
  "Career mentorship",
  "Job referral assistance",
  "Professional communication training",
];

function AcademyPage() {
  const { courses } = useSiteContent();
  return (
    <>
      <PageHero
        eyebrow="Zebryl Academy"
        title={<>Learn &amp; build your <span className="text-gradient">IT career</span></>}
        description="Get trained by industry professionals, work on real-time projects, improve your technical skills and prepare for IT job opportunities."
      >
        <div className="flex flex-wrap gap-3 pt-2">
          <Button asChild variant="hero" size="xl">
            <Link to="/apply">Apply for a Course <ArrowRight /></Link>
          </Button>
          <Button asChild variant="glass" size="xl">
            <a href="#courses">Browse courses</a>
          </Button>
        </div>
      </PageHero>

      <section id="courses" className="container-page scroll-mt-20 py-24">
        <SectionHeading eyebrow="Programmes" title="Our courses" description="Choose a track, learn with live classes and graduate with real project experience." />
        {courses.length === 0 ? (
          <p className="mt-12 text-center text-muted-foreground">New batches are being planned. Please check back soon.</p>
        ) : (
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {courses.map((c, i) => (
              <Reveal key={c.id} delay={(i % 2) * 80}>
                <CourseCard course={c} />
              </Reveal>
            ))}
          </div>
        )}
      </section>

      <section className="bg-gradient-navy py-24 text-navy-foreground">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <SectionHeading
            tone="dark"
            align="left"
            eyebrow="Career readiness"
            title={<>Don&apos;t Just Learn Skills. <span className="text-gradient">Become Industry Ready.</span></>}
            description="Our training goes beyond the syllabus. From your first class to your first interview, we work alongside you to build the skills, portfolio and confidence that employers look for."
          />
          <div className="glass-card rounded-3xl p-8">
            <CheckList items={READY} tone="dark" className="sm:grid-cols-2" />
          </div>
        </div>
      </section>

      <CtaBand title="Start your learning journey" description="Apply in a few minutes — our team will contact you with batch details and a demo session.">
        <Button asChild variant="hero" size="xl">
          <Link to="/apply">Apply Now <ArrowRight /></Link>
        </Button>
      </CtaBand>
    </>
  );
}
