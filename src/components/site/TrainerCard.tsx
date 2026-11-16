import { Briefcase, Linkedin } from "lucide-react";
import type { Trainer } from "@/lib/site-content";

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

export function TrainerCard({ trainer, photoUrl }: { trainer: Trainer; photoUrl?: string }) {
  return (
    <article className="lift flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card">
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-navy">
        {photoUrl ? (
          <img src={photoUrl} alt={trainer.full_name} loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-display text-6xl font-bold text-gradient">{initials(trainer.full_name)}</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold text-foreground">{trainer.full_name}</h3>
        <p className="mt-1 text-sm font-semibold text-primary">{trainer.designation}</p>
        {trainer.experience && (
          <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Briefcase className="size-4 text-primary" /> {trainer.experience}
          </p>
        )}
        {trainer.bio && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{trainer.bio}</p>}
        {trainer.expertise.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {trainer.expertise.map((e) => (
              <span key={e} className="rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">
                {e}
              </span>
            ))}
          </div>
        )}
        {trainer.linkedin_url && (
          <a
            href={trainer.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-primary hover:underline"
          >
            <Linkedin className="size-4" /> LinkedIn profile
          </a>
        )}
      </div>
    </article>
  );
}
