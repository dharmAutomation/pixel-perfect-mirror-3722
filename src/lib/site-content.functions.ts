import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import type { SiteContent } from "./site-content";

const SIGNED_URL_TTL = 60 * 60 * 24 * 7; // 7 days

/** Public, read-only content for every page. Uses the publishable key + public RLS policies. */
export const getSiteContent = createServerFn({ method: "GET" }).handler(async (): Promise<SiteContent> => {
  const url = process.env["SUPABASE_URL"]!;
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  const supabase = createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });

  const [settings, courses, services, trainers, companies, testimonials] = await Promise.all([
    supabase.from("site_settings").select("*").eq("id", 1).maybeSingle(),
    supabase.from("courses").select("*").order("sort_order"),
    supabase.from("services").select("*").order("sort_order"),
    supabase.from("trainers").select("*").order("sort_order"),
    supabase.from("referral_companies").select("*").order("sort_order"),
    supabase.from("testimonials").select("*").order("sort_order"),
  ]);
  for (const r of [settings, courses, services, trainers, companies, testimonials]) {
    if (r.error) throw new Error(r.error.message);
  }

  // Collect every media path and sign them in one request (media bucket is private).
  const paths = new Set<string>();
  if (settings.data?.founder_photo_path) paths.add(settings.data.founder_photo_path);
  trainers.data?.forEach((t) => t.photo_path && paths.add(t.photo_path));
  companies.data?.forEach((c) => c.logo_path && paths.add(c.logo_path));
  testimonials.data?.forEach((t) => t.photo_path && paths.add(t.photo_path));

  const media: Record<string, string> = {};
  if (paths.size > 0) {
    const { data } = await supabase.storage.from("media").createSignedUrls([...paths], SIGNED_URL_TTL);
    const publicBase = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.replace(/\/+$/, "");
    data?.forEach((d) => {
      if (!d.path || !d.signedUrl) return;
      let signed = d.signedUrl;
      // Browser-facing URL must use the public backend URL.
      const idx = signed.indexOf("/storage/v1/");
      if (publicBase && idx >= 0) signed = publicBase + signed.slice(idx);
      else if (publicBase && signed.startsWith("/")) signed = `${publicBase}/storage/v1${signed}`;
      media[d.path] = signed;
    });
  }

  return {
    settings: settings.data ?? null,
    courses: courses.data ?? [],
    services: services.data ?? [],
    trainers: trainers.data ?? [],
    companies: companies.data ?? [],
    testimonials: testimonials.data ?? [],
    media,
  };
});
