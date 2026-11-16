import { useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileUp, Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useSiteContent } from "@/lib/site-content";
import {
  EXPERIENCE_LEVELS,
  HEARD_FROM,
  JOB_STATUSES,
  QUALIFICATIONS,
  TRAINING_MODES,
  applicationSchema,
  isDuplicateSubmission,
  safeFileName,
  validateResume,
  type ApplicationInput,
} from "@/lib/validation";
import { PageHero } from "@/components/site/sections";
import { Field, FormCard, NativeSelect, SuccessPanel, inputCls } from "@/components/site/form-fields";

export const Route = createFileRoute("/apply")({
  validateSearch: (search: Record<string, unknown>): { course?: string } => ({
    course: typeof search.course === "string" ? search.course : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Apply for a Course — Zebryl Academy" },
      { name: "description", content: "Apply to a Zebryl Academy programme. Our team will contact you with batch details and a demo session." },
      { property: "og:title", content: "Apply for a Course — Zebryl Academy" },
      { property: "og:description", content: "Start your IT career with live classes, real projects and career support." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ApplyPage,
});

function ApplyPage() {
  const { course } = Route.useSearch();
  const { courses } = useSiteContent();
  const submissionKey = useRef<string>(crypto.randomUUID());
  const [resume, setResume] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const initialCourse = courses.find((c) => c.slug === course)?.slug ?? "";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicationInput>({
    resolver: zodResolver(applicationSchema),
    defaultValues: { course_slug: initialCourse },
  });

  const onSubmit = handleSubmit(async (raw) => {
    const resErr = validateResume(resume);
    setResumeError(resErr);
    if (resErr || !resume) return;
    if (submitting) return;
    setSubmitting(true);
    try {
      const values = applicationSchema.parse(raw);
      const selected = courses.find((c) => c.slug === values.course_slug);
      const key = submissionKey.current;
      const path = `${key}/${safeFileName(resume.name)}`;
      const up = await supabase.storage.from("resumes").upload(path, resume, { upsert: false, contentType: resume.type || undefined });
      // A retry of the same submission re-uses the same path; "already exists" means the file is already saved.
      if (up.error && !/exists|duplicate/i.test(up.error.message)) throw up.error;

      const { error } = await supabase.from("course_applications").insert({
        submission_key: key,
        full_name: values.full_name,
        email: values.email,
        mobile: values.mobile,
        whatsapp: values.whatsapp,
        qualification: values.qualification,
        job_status: values.job_status,
        experience: values.experience,
        course_id: selected?.id ?? null,
        course_name: selected?.title ?? values.course_slug,
        training_mode: values.training_mode,
        linkedin_url: values.linkedin_url ?? null,
        resume_path: path,
        resume_name: resume.name.slice(0, 200),
        heard_from: values.heard_from,
        referral_name: values.referral_name ?? null,
      });
      if (error && !isDuplicateSubmission(error)) throw error;
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      console.error(e);
      toast.error("We couldn’t submit your application. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <>
      <PageHero
        eyebrow="Zebryl Academy"
        title={<>Apply for a <span className="text-gradient">Course</span></>}
        description="Fill in your details and upload your resume. Our admissions team will reach out with batch details and a free demo session."
      />
      <section className="container-page max-w-4xl py-16">
        {done ? (
          <SuccessPanel
            title="Application submitted!"
            actions={
              <>
                <Button asChild variant="hero" size="lg"><Link to="/academy">Back to courses</Link></Button>
                <Button asChild variant="outline" size="lg"><Link to="/">Go to homepage</Link></Button>
              </>
            }
          >
            Thank you for applying to Zebryl Academy. Our team will review your application and contact you on your email and
            WhatsApp shortly.
          </SuccessPanel>
        ) : (
          <FormCard>
            <form onSubmit={onSubmit} noValidate className="space-y-10">
              <fieldset className="space-y-5">
                <legend className="mb-1 font-display text-lg font-bold">Personal details</legend>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="full_name" label="Full Name" required error={errors.full_name?.message} className="sm:col-span-2">
                    <Input id="full_name" autoComplete="name" className={inputCls} aria-invalid={!!errors.full_name} {...register("full_name")} />
                  </Field>
                  <Field id="email" label="Email Address" required error={errors.email?.message} className="sm:col-span-2">
                    <Input id="email" type="email" autoComplete="email" className={inputCls} aria-invalid={!!errors.email} {...register("email")} />
                  </Field>
                  <Field id="mobile" label="Mobile Number" required error={errors.mobile?.message}>
                    <Input id="mobile" type="tel" autoComplete="tel" placeholder="+91 98765 43210" className={inputCls} aria-invalid={!!errors.mobile} {...register("mobile")} />
                  </Field>
                  <Field id="whatsapp" label="WhatsApp Number" required error={errors.whatsapp?.message}>
                    <Input id="whatsapp" type="tel" placeholder="+91 98765 43210" className={inputCls} aria-invalid={!!errors.whatsapp} {...register("whatsapp")} />
                  </Field>
                </div>
              </fieldset>

              <fieldset className="space-y-5">
                <legend className="mb-1 font-display text-lg font-bold">Background</legend>
                <div className="grid gap-5 sm:grid-cols-3">
                  <Field id="qualification" label="Highest Qualification" required error={errors.qualification?.message}>
                    <NativeSelect id="qualification" options={QUALIFICATIONS} aria-invalid={!!errors.qualification} {...register("qualification")} />
                  </Field>
                  <Field id="job_status" label="Current Job Status" required error={errors.job_status?.message}>
                    <NativeSelect id="job_status" options={JOB_STATUSES} aria-invalid={!!errors.job_status} {...register("job_status")} />
                  </Field>
                  <Field id="experience" label="Total Experience" required error={errors.experience?.message}>
                    <NativeSelect id="experience" options={EXPERIENCE_LEVELS} aria-invalid={!!errors.experience} {...register("experience")} />
                  </Field>
                </div>
                <Field id="linkedin_url" label="LinkedIn Profile URL" optional error={errors.linkedin_url?.message}>
                  <Input id="linkedin_url" type="url" placeholder="https://www.linkedin.com/in/your-name" className={inputCls} aria-invalid={!!errors.linkedin_url} {...register("linkedin_url")} />
                </Field>
                <Field id="resume" label="Upload Updated Resume" required error={resumeError ?? undefined} hint="PDF, DOC or DOCX — up to 5 MB">
                  <label
                    htmlFor="resume"
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-input bg-muted/50 px-4 py-4 text-sm transition-colors hover:border-primary hover:bg-accent"
                  >
                    <FileUp className="size-5 text-primary" />
                    <span className="truncate font-medium text-foreground">{resume ? resume.name : "Choose a file…"}</span>
                  </label>
                  <input
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    className="sr-only"
                    onChange={(e) => {
                      const f = e.target.files?.[0] ?? null;
                      setResume(f);
                      setResumeError(f ? validateResume(f) : null);
                    }}
                  />
                </Field>
              </fieldset>

              <fieldset className="space-y-5">
                <legend className="mb-1 font-display text-lg font-bold">Course preference</legend>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="course_slug" label="Interested Course" required error={errors.course_slug?.message}>
                    <NativeSelect
                      id="course_slug"
                      options={courses.map((c) => ({ value: c.slug, label: c.title }))}
                      aria-invalid={!!errors.course_slug}
                      {...register("course_slug")}
                    />
                  </Field>
                  <Field id="training_mode" label="Preferred Training Mode" required error={errors.training_mode?.message}>
                    <NativeSelect id="training_mode" options={TRAINING_MODES} aria-invalid={!!errors.training_mode} {...register("training_mode")} />
                  </Field>
                  <Field id="heard_from" label="How did you hear about Zebryl?" required error={errors.heard_from?.message}>
                    <NativeSelect id="heard_from" options={HEARD_FROM} aria-invalid={!!errors.heard_from} {...register("heard_from")} />
                  </Field>
                  <Field id="referral_name" label="Referral Name" optional error={errors.referral_name?.message}>
                    <Input id="referral_name" className={inputCls} {...register("referral_name")} />
                  </Field>
                </div>
              </fieldset>

              <div className="flex flex-col-reverse items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
                <p className="text-xs text-muted-foreground">
                  By submitting, you agree to our <Link to="/privacy" className="underline">Privacy Policy</Link>.
                </p>
                <Button type="submit" variant="hero" size="xl" disabled={submitting} className="w-full sm:w-auto">
                  {submitting ? <><Loader2 className="animate-spin" /> Submitting…</> : <><Send /> Submit Application</>}
                </Button>
              </div>
            </form>
          </FormCard>
        )}
      </section>
    </>
  );
}
