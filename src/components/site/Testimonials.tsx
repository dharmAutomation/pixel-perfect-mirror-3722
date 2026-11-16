import { Quote } from "lucide-react";
import { useSiteContent } from "@/lib/site-content";
import { SectionHeading } from "./sections";
import { initials } from "./TrainerCard";

export function TestimonialsSection() {
  const { testimonials, mediaUrl } = useSiteContent();
  if (testimonials.length === 0) return null;
  return (
    <section className="container-page py-20">
      <SectionHeading
        eyebrow="Testimonials"
        title="What learners and clients say"
        description="Feedback from students of Zebryl Academy and clients of Zebryl Technologies."
      />
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => {
          const photo = mediaUrl(t.photo_path);
          return (
            <figure key={t.id} className="relative flex flex-col rounded-3xl border border-border bg-card p-7 shadow-card">
              {t.is_sample && (
                <span className="absolute right-5 top-5 rounded-full bg-warning/20 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-warning-foreground">
                  Sample
                </span>
              )}
              <Quote className="size-7 text-primary/40" />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-foreground">“{t.feedback}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                {photo ? (
                  <img src={photo} alt={t.name} loading="lazy" className="size-11 rounded-full object-cover" />
                ) : (
                  <span className="inline-flex size-11 items-center justify-center rounded-full bg-gradient-brand text-sm font-bold text-primary-foreground">
                    {initials(t.name)}
                  </span>
                )}
                <div>
                  <div className="text-sm font-bold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {t.kind === "client" ? "Client" : "Student"}
                    {t.role_or_company ? ` · ${t.role_or_company}` : ""}
                  </div>
                </div>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
