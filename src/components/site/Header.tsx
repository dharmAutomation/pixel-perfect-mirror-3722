import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Rocket, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "./Logo";
import { NAV_LINKS } from "./nav-links";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Main">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-lg px-2.5 py-2 text-[13.5px] font-semibold text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-primary"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 xl:flex">
          <Button asChild variant="outline" size="sm" className="h-9 rounded-lg">
            <Link to="/apply">Apply for Course</Link>
          </Button>
          <Button asChild variant="hero" size="sm" className="h-9 rounded-lg">
            <Link to="/start-project">Start Your Project</Link>
          </Button>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="xl:hidden" aria-label="Open menu">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[86vw] max-w-sm">
            <SheetHeader>
              <SheetTitle className="text-left">
                <span className="font-display tracking-[0.14em]">ZEBRYL</span>
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-2 flex flex-col px-4" aria-label="Mobile">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: l.to === "/" }}
                  className="rounded-lg px-3 py-3 text-base font-semibold text-foreground hover:bg-muted data-[status=active]:text-primary"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 flex flex-col gap-2 px-4">
              <Button asChild variant="outline" size="lg" onClick={() => setOpen(false)}>
                <Link to="/apply">
                  <GraduationCap /> Apply for Course
                </Link>
              </Button>
              <Button asChild variant="hero" size="lg" onClick={() => setOpen(false)}>
                <Link to="/start-project">
                  <Rocket /> Start Your Project
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
