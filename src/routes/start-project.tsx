import { useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useSiteContent } from "@/lib/site-content";
import { BUDGETS, TIMELINES, inquirySchema, isDuplicateSubmission, type InquiryInput } from "@/lib/validation";
import { CheckList, PageHero } from "@/components/site/sections";
import { Field, FormCard, NativeSelect, SuccessPanel, inputCls } from "@/components/site/form-fields";

export const Route = createFileRoute("/start-project")({
  validateSearch: (search: Record<string, unknown>): { service?: string } => ({
    service: typeof search.service === "string" ? search.service : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Start Your Project — Free Consultation | Zebryl Technologies" },
      { name: "description", content: "Tell us about your website, app or AI project and get a free consultation from Zebryl Technologies." },
      { property: "og:title", content: "Start Your Project — Zebryl Technologies" },
      { property: "og:description", content: "Request a free consultation for your next digital product." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StartProjectPage,
});

function StartProjectPage() {
  const { service } = Route.useSearch();
  const { services, settings } = useSiteContent();
  const submissionKey = useRef<string>(crypto.randomUUID());
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const projectTypes = Array.from(
    new Set([...services.map((s) => s.title), ...(settings?.home_tech_services ?? []), "Other"]),
  );
  const preset = services.find((s) => s.slug === service)?.title ?? "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InquiryInput>({ resolver: zodResolver(inquirySchema), defaultValues: { project_type: preset } });

  const onSubmit = handleSubmit(async (raw) => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const v = inquirySchema.parse(raw);
      const { error } = await supabase.from("project_inquiries").insert({
        submission_key: submissionKey.current,
        full_name: v.full_name,
        company_name: v.company_name,
        email: v.email,
        phone: v.phone,
        project_type: v.project_type,
        description: v.description,
        budget: v.budget,
        timeline: v.timeline,
        reference_website: v.reference_website ?? null,
      });
      if (error && !isDuplicateSubmission(error)) throw error;
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      console.error(e);
      toast.error("We couldn’t send your request. Please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <>
      <PageHero
        eyebrow="Zebryl Technologies"
        title={<>Start Your <span className="text-gradient">Project</span></>}
        description="Share a few details about what you want to build. We’ll get back to you to schedule a free consultation."
      />
      <section className="container-page grid gap-10 py-16 lg:grid-cols-[1fr_320px]">
        {done ? (
          <SuccessPanel
            title="Consultation requested!"
            actions={
              <>
                <Button asChild variant="hero" size="lg"><Link to="/solutions">Explore services</Link></Button>
                <Button asChild variant="outline" size="lg"><Link to="/">Go to homepage</Link></Button>
              </>
            }
          >
            Thanks for reaching out. Our team will review your project details and contact you shortly.
          </SuccessPanel>
        ) : (
          <FormCard>
            <form onSubmit={onSubmit} noValidate className="space-y-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="full_name" label="Full Name" required error={errors.full_name?.message}>
                  <Input id="full_name" autoComplete="name" className={inputCls} aria-invalid={!!errors.full_name} {...register("full_name")} />
                </Field>
                <Field id="company_name" label="Company Name" required error={errors.company_name?.message}>
                  <Input id="company_name" autoComplete="organization" className={inputCls} aria-invalid={!!errors.company_name} {...register("company_name")} />
                </Field>
                <Field id="email" label="Email Address" required error={errors.email?.message}>
                  <Input id="email" type="email" autoComplete="email" className={inputCls} aria-invalid={!!errors.email} {...register("email")} />
                </Field>
                <Field id="phone" label="Contact Number" required error={errors.phone?.message}>
                  <Input id="phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210" className={inputCls} aria-invalid={!!errors.phone} {...register("phone")} />
                </Field>
                <Field id="project_type" label="Project Type" required error={errors.project_type?.message} className="sm:col-span-2">
                  <NativeSelect id="project_type" options={projectTypes} aria-invalid={!!errors.project_type} {...register("project_type")} />
                </Field>
                <Field id="description" label="Project Description" required error={errors.description?.message} className="sm:col-span-2">
                  <Textarea id="description" rows={6} className="rounded-xl aria-[invalid=true]:border-destructive" placeholder="What are you building? Who is it for? Any key features?" aria-invalid={!!errors.description} {...register("description")} />
                </Field>
                <Field id="budget" label="Estimated Budget" required error={errors.budget?.message}>
                  <NativeSelect id="budget" options={BUDGETS} aria-invalid={!!errors.budget} {...register("budget")} />
                </Field>
                <Field id="timeline" label="Expected Timeline" required error={errors.timeline?.message}>
                  <NativeSelect id="timeline" options={TIMELINES} aria-invalid={!!errors.timeline} {...register("timeline")} />
                </Field>
                <Field id="reference_website" label="Reference Website" optional error={errors.reference_website?.message} className="sm:col-span-2">
                  <Input id="reference_website" type="url" placeholder="https://example.com" className={inputCls} aria-invalid={!!errors.reference_website} {...register("reference_website")} />
                </Field>
              </div>
              <div className="flex justify-end border-t border-border pt-6">
                <Button type="submit" variant="hero" size="xl" disabled={submitting} className="w-full sm:w-auto">
                  {submitting ? <><Loader2 className="animate-spin" /> Sending…</> : <><Send /> Request a Consultation</>}
                </Button>
              </div>
            </form>
          </FormCard>
        )}
        <aside className="h-fit rounded-[1.75rem] bg-gradient-navy p-7 text-navy-foreground shadow-elevated lg:sticky lg:top-24">
          <h2 className="text-xl font-bold">What happens next?</h2>
          <CheckList
            tone="dark"
            className="mt-5"
            items={[
              "We review your requirements",
              "A free consultation call to understand your goals",
              "A clear proposal with scope, timeline and cost",
              "Kick-off and regular progress updates",
            ]}
          />
        </aside>
      </section>
    </>
  );
}
