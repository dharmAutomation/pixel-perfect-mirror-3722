import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import type { Tables } from "@/integrations/supabase/types";
import { getSiteContent } from "./site-content.functions";

export type Course = Tables<"courses">;
export type Service = Tables<"services">;
export type Trainer = Tables<"trainers">;
export type Company = Tables<"referral_companies">;
export type Testimonial = Tables<"testimonials">;
export type SiteSettings = Tables<"site_settings">;

export interface SiteContent {
  settings: SiteSettings | null;
  courses: Course[];
  services: Service[];
  trainers: Trainer[];
  companies: Company[];
  testimonials: Testimonial[];
  /** storage path -> signed URL */
  media: Record<string, string>;
}

export const siteContentQuery = queryOptions({
  queryKey: ["site-content"],
  queryFn: () => getSiteContent(),
  staleTime: 60_000,
});

export function useSiteContent() {
  const { data } = useSuspenseQuery(siteContentQuery);
  const mediaUrl = (path: string | null | undefined) => (path ? data.media[path] : undefined);
  return { ...data, mediaUrl };
}

export function whatsappLink(number: string | null | undefined, text?: string) {
  if (!number) return undefined;
  const digits = number.replace(/[^0-9]/g, "");
  if (!digits) return undefined;
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}
