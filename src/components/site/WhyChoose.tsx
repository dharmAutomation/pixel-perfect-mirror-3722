import {
  BrainCircuit,
  Briefcase,
  Compass,
  Cpu,
  GraduationCap,
  Hammer,
  Layers,
  Medal,
  Target,
  Users,
} from "lucide-react";
import { Reveal, SectionHeading } from "./sections";

const ITEMS = [
  { title: "Industry-focused learning", Icon: Target },
  { title: "Practical implementation", Icon: Hammer },
  { title: "Experienced trainers", Icon: GraduationCap },
  { title: "Real-time project exposure", Icon: Briefcase },
  { title: "Personalized mentorship", Icon: Users },
  { title: "Career guidance", Icon: Compass },
  { title: "Modern technology stack", Icon: Cpu },
  { title: "AI-first approach", Icon: BrainCircuit },
  { title: "End-to-end software solutions", Icon: Layers },
  { title: "Quality-driven development", Icon: Medal },
];

export function WhyChooseSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-navy py-24 text-navy-foreground">
      <div className="grid-pattern pointer-events-none absolute inset-0 opacity-40" />
      <div className="container-page relative">
        <SectionHeading
          tone="dark"
          eyebrow="Why Zebryl"
          title={
            <>
              Why choose <span className="text-gradient">ZEBRYL?</span>
            </>
          }
          description="One partner for the skills you need and the products you want to build."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {ITEMS.map(({ title, Icon }, i) => (
            <Reveal key={title} delay={i * 50}>
              <div className="glass-card h-full rounded-2xl p-5 transition-colors hover:bg-navy-foreground/10">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-gradient-brand">
                  <Icon className="size-5 text-primary-foreground" />
                </span>
                <p className="mt-4 font-display text-[15px] font-semibold leading-snug">{title}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
