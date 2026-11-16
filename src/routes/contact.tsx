import { useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, GraduationCap, Instagram, Linkedin, Loader2, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useSiteContent, whatsappLink } from "@/lib/site-content";
import { contactSchema, isDuplicateSubmission, type ContactInput } from "@/lib/validation";
import { PageHero } from "@/components/site/sections";
import { Field, FormCard, NativeSelect, SuccessPanel, inputCls } from "@/components/site/form-fields";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact ZEBRYL — Academy & Business Inquiries" },
      { name: "description", content: "Get in touch with Zebryl Academy for course enquiries or Zebryl Technologies for project discussions." },
      { property: "og:title", content: "Contact ZEBRYL" },
      { property: "og:description", content: "Course enquiries and business project discussions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const TYPES = [
  { value: "academy", label: "Academy inquiry (courses & admissions)" },
  { value: "business", label: "Business inquiry (projects & services)" },
  { value: "general", label: "General question" },
];

function ContactPage() {
  const { settings } = useSiteContent();
  const submissionKey = useRef<string>(crypto.randomUUID());
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema), defaultValues: { inquiry_type: "general" } });

  const onSubmit = handleSubmit(async (raw) => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const v = contactSchema.parse(raw);
      const { error } = await supabase.from("contact_messages").insert({
        submission_key: submissionKey.current,
        full_name: v.full_name,
        email: v.email,
        phone: v.phone ?? null,
        inquiry_type: v.inquiry_type,
        message: v.message,
      });
      if (error && !isDuplicateSubmission(error)) throw error;
      setDone(true);
    } catch (e) {
      console.error(e);
      toast.error("We couldn’t send your message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  });

  const wa = whatsappLink(settings?.whatsapp, "Hello Zebryl, I'd like to know more.");
  const details = [
    settings?.contact_email && { Icon: Mail, label: "Email", value: settings.contact_email, href: `mailto:${settings.contact_email}` },
    settings?.phone && { Icon: Phone, label: "Phone", value: settings.phone, href: `tel:${settings.phone.replace(/\s/g, "")}` },
    settings?.location && { Icon: MapPin, label: "Location", value: settings.location },
    settings?.linkedin_url && { Icon: Linkedin, label: "LinkedIn", value: "Follow us on LinkedIn", href: settings.linkedin_url },
    settings?.instagram_url && { Icon: Instagram, label: "Instagram", value: "Follow us on Instagram", href: settings.instagram_url },
  ].filter(Boolean) as { Icon: typeof Mail; label: string; value: string; href?: string }[];

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title={<>Let’s <span className="text-gradient">talk</span></>}
        description="Questions about a course or a project? Send us a message and our team will get back to you."
      />
      <section className="container-page grid gap-10 py-16 lg:grid-cols-[1fr_380px]">
        {done ? (
          <SuccessPanel title="Message sent!" actions={<Button asChild variant="outline" size="lg"><Link to="/">Go to homepage</Link></Button>}>
            Thanks for contacting ZEBRYL. We’ll reply to your email soon.
          </SuccessPanel>
        ) : (
          <FormCard>
            <form onSubmit={onSubmit} noValidate className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="full_name" label="Full Name" required error={errors.full_name?.message}>
                  <Input id="full_name" autoComplete="name" className={inputCls} aria-invalid={!!errors.full_name} {...register("full_name")} />
                </Field>
                <Field id="email" label="Email Address" required error={errors.email?.message}>
                  <Input id="email" type="email" autoComplete="email" className={inputCls} aria-invalid={!!errors.email} {...register("email")} />
                </Field>
                <Field id="phone" label="Phone Number" optional error={errors.phone?.message}>
                  <Input id="phone" type="tel" className={inputCls} aria-invalid={!!errors.phone} {...register("phone")} />
                </Field>
                <Field id="inquiry_type" label="Inquiry Type" required error={errors.inquiry_type?.message}>
                  <NativeSelect id="inquiry_type" options={TYPES} placeholder="Select type…" {...register("inquiry_type")} />
                </Field>
                <Field id="message" label="Message" required error={errors.message?.message} className="sm:col-span-2">
                  <Textarea id="message" rows={6} className="rounded-xl aria-[invalid=true]:border-destructive" aria-invalid={!!errors.message} {...register("message")} />
                </Field>
              </div>
              <div className="flex justify-end">
                <Button type="submit" variant="hero" size="xl" disabled={submitting} className="w-full sm:w-auto">
                  {submitting ? <><Loader2 className="animate-spin" /> Sending…</> : <><Send /> Send Message</>}
                </Button>
              </div>
            </form>
          </FormCard>
        )}

        <aside className="space-y-5">
          <div className="grid gap-3">
            <Link to="/apply" className="lift flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-card">
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground"><GraduationCap className="size-5" /></span>
              <div><div className="font-bold">Academy inquiry</div><div className="text-sm text-muted-foreground">Apply for a course</div></div>
            </Link>
            <Link to="/start-project" className="lift flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-card">
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-navy text-primary-glow"><Building2 className="size-5" /></span>
              <div><div className="font-bold">Business inquiry</div><div className="text-sm text-muted-foreground">Discuss your project</div></div>
            </Link>
          </div>
          <div className="rounded-[1.75rem] bg-gradient-navy p-7 text-navy-foreground shadow-elevated">
            <h2 className="text-lg font-bold">Contact details</h2>
            {details.length === 0 ? (
              <p className="mt-3 text-sm text-navy-muted">Our contact details will be published here soon. Meanwhile, please use the form.</p>
            ) : (
              <ul className="mt-5 space-y-4">
                {details.map(({ Icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-3">
                    <Icon className="mt-0.5 size-5 text-primary-glow" />
                    <div>
                      <div className="text-xs uppercase tracking-wider text-navy-muted">{label}</div>
                      {href ? (
                        <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-sm font-semibold hover:underline">{value}</a>
                      ) : (
                        <div className="text-sm font-semibold">{value}</div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {wa && (
              <Button asChild variant="hero" size="lg" className="mt-6 w-full">
                <a href={wa} target="_blank" rel="noopener noreferrer"><MessageCircle /> Chat on WhatsApp</a>
              </Button>
            )}
          </div>
        </aside>
      </section>
    </>
  );
}
