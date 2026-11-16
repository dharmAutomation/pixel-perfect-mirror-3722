import { Instagram, Linkedin, MessageCircle } from "lucide-react";
import { useSiteContent, whatsappLink } from "@/lib/site-content";
import { cn } from "@/lib/utils";

export function SocialLinks({ className }: { className?: string }) {
  const { settings } = useSiteContent();
  const items = [
    { href: settings?.linkedin_url, label: "LinkedIn", Icon: Linkedin },
    { href: settings?.instagram_url, label: "Instagram", Icon: Instagram },
    { href: whatsappLink(settings?.whatsapp), label: "WhatsApp", Icon: MessageCircle },
  ].filter((i) => !!i.href);
  if (items.length === 0) return null;
  return (
    <div className={cn("flex gap-2", className)}>
      {items.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href!}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="inline-flex size-10 items-center justify-center rounded-xl border border-navy-border text-navy-muted transition-colors hover:border-primary hover:text-navy-foreground"
        >
          <Icon className="size-4" />
        </a>
      ))}
    </div>
  );
}
