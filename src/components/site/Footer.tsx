import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";

const col = "space-y-3 text-sm";
const linkCls = "text-navy-muted transition-colors hover:text-navy-foreground";

export function Footer() {
  return (
    <footer className="bg-gradient-navy text-navy-foreground">
      <div className="container-page grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="space-y-5">
          <Logo tone="light" />
          <p className="font-display text-lg font-semibold text-gradient">Learn. Build. Innovate. Grow.</p>
          <p className="max-w-xs text-sm leading-relaxed text-navy-muted">
            IT training that makes you industry-ready, and software &amp; AI solutions that move businesses forward.
          </p>
          <SocialLinks />
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-navy-foreground">Academy</h3>
          <ul className={col}>
            <li><Link to="/academy" className={linkCls}>All Courses</Link></li>
            <li><Link to="/apply" className={linkCls}>Apply Now</Link></li>
            <li><Link to="/referral-network" className={linkCls}>Career Development</Link></li>
            <li><Link to="/trainers" className={linkCls}>Our Trainers</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-navy-foreground">Technologies</h3>
          <ul className={col}>
            <li><Link to="/solutions" hash="website-development" className={linkCls}>Website Development</Link></li>
            <li><Link to="/solutions" hash="web-application-development" className={linkCls}>Web Applications</Link></li>
            <li><Link to="/solutions" hash="mobile-application-development" className={linkCls}>Mobile Applications</Link></li>
            <li><Link to="/solutions" hash="ai-agent-development" className={linkCls}>AI Agent Development</Link></li>
            <li><Link to="/start-project" className={linkCls}>Contact for Project</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-navy-foreground">Company</h3>
          <ul className={col}>
            <li><Link to="/about" className={linkCls}>About Us</Link></li>
            <li><Link to="/referral-network" className={linkCls}>Referral Network</Link></li>
            <li><Link to="/contact" className={linkCls}>Contact Us</Link></li>
            <li><Link to="/privacy" className={linkCls}>Privacy Policy</Link></li>
            <li><Link to="/terms" className={linkCls}>Terms and Conditions</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-border">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-navy-muted sm:flex-row">
          <p>© {new Date().getFullYear()} ZEBRYL. All rights reserved.</p>
          <Link to="/auth" className={linkCls}>Admin login</Link>
        </div>
      </div>
    </footer>
  );
}
