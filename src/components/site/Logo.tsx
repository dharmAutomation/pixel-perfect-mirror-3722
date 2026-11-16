import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex size-9 items-center justify-center rounded-xl bg-gradient-brand shadow-glow",
        className,
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="size-5 text-primary-foreground" fill="none">
        <path d="M5 5h14L6.5 19H19" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link to="/" className={cn("group inline-flex items-center gap-2.5", className)} aria-label="ZEBRYL home">
      <LogoMark className="transition-transform duration-300 group-hover:rotate-[-6deg]" />
      <span
        className={cn(
          "font-display text-xl font-bold tracking-[0.14em]",
          tone === "light" ? "text-navy-foreground" : "text-foreground",
        )}
      >
        ZEBRYL
      </span>
    </Link>
  );
}
