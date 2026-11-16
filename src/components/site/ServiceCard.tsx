import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getIcon } from "@/lib/icons";
import type { Service } from "@/lib/site-content";
import { CheckList } from "./sections";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = getIcon(service.icon);
  return (
    <article
      id={service.slug}
      className="lift group relative flex h-full scroll-mt-24 flex-col overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-card"
    >
      <div className="pointer-events-none absolute -right-12 -top-12 size-36 rounded-full bg-gradient-brand opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20" />
      <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-navy text-primary-glow shadow-card">
        <Icon className="size-6" />
      </span>
      <h3 className="mt-5 text-xl font-bold text-foreground">{service.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
      <CheckList items={service.features} className="mt-5" />
      <div className="mt-auto pt-7">
        <Button asChild variant="outline" size="lg" className="w-full group-hover:border-primary group-hover:text-primary">
          <Link to="/start-project" search={{ service: service.slug }}>
            Discuss Your Project <ArrowRight />
          </Link>
        </Button>
      </div>
    </article>
  );
}
