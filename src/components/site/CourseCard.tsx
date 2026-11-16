import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock, MonitorPlay, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getIcon } from "@/lib/icons";
import type { Course } from "@/lib/site-content";
import { CheckList } from "./sections";

export function CourseCard({ course }: { course: Course }) {
  const Icon = getIcon(course.icon);
  return (
    <article
      id={course.slug}
      className="lift group flex h-full scroll-mt-24 flex-col rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8"
    >
      <div className="flex items-start gap-4">
        <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-brand-soft text-primary">
          <Icon className="size-6" />
        </span>
        <div className="space-y-1.5">
          <h3 className="text-xl font-bold leading-snug text-foreground">{course.title}</h3>
          <p className="text-sm text-muted-foreground">{course.short_description}</p>
        </div>
      </div>

      <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{course.description}</p>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-muted px-4 py-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Clock className="size-3.5" /> Duration
          </div>
          <div className="mt-1 text-sm font-semibold text-foreground">{course.duration || "To be announced"}</div>
        </div>
        <div className="rounded-2xl bg-muted px-4 py-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <MonitorPlay className="size-3.5" /> Mode
          </div>
          <div className="mt-1 text-sm font-semibold text-foreground">{course.training_mode || "To be announced"}</div>
        </div>
      </div>

      {course.technologies.length > 0 && (
        <div className="mt-6">
          <h4 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-foreground">Technologies covered</h4>
          <div className="flex flex-wrap gap-1.5">
            {course.technologies.map((t) => (
              <span key={t} className="rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {course.skills.length > 0 && (
        <div className="mt-6">
          <h4 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-foreground">Skills you will learn</h4>
          <CheckList items={course.skills} />
        </div>
      )}

      {course.project_details && (
        <div className="mt-6 rounded-2xl border border-primary/20 bg-gradient-brand-soft p-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-foreground">
            <Rocket className="size-3.5" /> Real-time project
          </div>
          <p className="mt-1.5 text-sm text-foreground">{course.project_details}</p>
        </div>
      )}

      <div className="mt-auto pt-7">
        <Button asChild variant="hero" size="lg" className="w-full">
          <Link to="/apply" search={{ course: course.slug }}>
            Apply Now <ArrowRight />
          </Link>
        </Button>
      </div>
    </article>
  );
}
