import { z } from "zod";

export const QUALIFICATIONS = [
  "10th / 12th",
  "Diploma",
  "B.E. / B.Tech",
  "B.Sc",
  "BCA",
  "B.Com",
  "B.A.",
  "M.E. / M.Tech",
  "MCA",
  "M.Sc",
  "MBA",
  "Other",
] as const;
export const JOB_STATUSES = [
  "Student",
  "Fresher (looking for a job)",
  "Working professional (IT)",
  "Working professional (non-IT)",
  "Career break",
  "Freelancer",
] as const;
export const EXPERIENCE_LEVELS = ["Fresher (0 years)", "Less than 1 year", "1–2 years", "2–5 years", "5+ years"] as const;
export const TRAINING_MODES = ["Online (live classes)", "Offline (classroom)", "Hybrid"] as const;
export const HEARD_FROM = [
  "Google search",
  "LinkedIn",
  "Instagram",
  "YouTube",
  "WhatsApp",
  "Friend / referral",
  "College / university",
  "Other",
] as const;
export const BUDGETS = [
  "Under ₹50,000",
  "₹50,000 – ₹1,50,000",
  "₹1,50,000 – ₹5,00,000",
  "₹5,00,000+",
  "Not sure yet",
] as const;
export const TIMELINES = ["As soon as possible", "1–2 months", "3–6 months", "6+ months", "Flexible"] as const;

export const RESUME_MAX_BYTES = 5 * 1024 * 1024;
export const RESUME_EXTENSIONS = ["pdf", "doc", "docx"] as const;

const phone = z
  .string()
  .trim()
  .regex(/^\+?[0-9 ]+$/, "Use digits only (a leading + is allowed)")
  .refine((v) => {
    const digits = v.replace(/[^0-9]/g, "").length;
    return digits >= 10 && digits <= 15 && v.length <= 16;
  }, "Enter a valid phone number (10–15 digits)");

const optionalUrl = z
  .string()
  .trim()
  .max(300)
  .optional()
  .transform((v) => (v ? v : undefined))
  .refine((v) => !v || /^https?:\/\/\S+\.\S+/i.test(v), "Enter a full URL starting with https://");

const name = z.string().trim().min(2, "Please enter your full name").max(120);
const email = z.string().trim().toLowerCase().email("Enter a valid email address").max(255);
const required = (label: string) => z.string().trim().min(1, `Please select ${label}`);

export const applicationSchema = z.object({
  full_name: name,
  email,
  mobile: phone,
  whatsapp: phone,
  qualification: required("your qualification").max(120),
  job_status: required("your current status").max(60),
  experience: required("your experience").max(60),
  course_slug: required("a course"),
  training_mode: required("a training mode").max(60),
  linkedin_url: optionalUrl.refine(
    (v) => !v || /linkedin\.com/i.test(v),
    "Enter a LinkedIn profile URL",
  ),
  heard_from: required("an option").max(80),
  referral_name: z
    .string()
    .trim()
    .max(120)
    .optional()
    .transform((v) => (v ? v : undefined)),
});
export type ApplicationInput = z.input<typeof applicationSchema>;

export const inquirySchema = z.object({
  full_name: name,
  company_name: z.string().trim().min(1, "Enter your company name (or 'Individual')").max(160),
  email,
  phone,
  project_type: required("a project type").max(120),
  description: z
    .string()
    .trim()
    .min(20, "Tell us a little more (at least 20 characters)")
    .max(5000),
  budget: required("a budget range").max(60),
  timeline: required("a timeline").max(60),
  reference_website: optionalUrl,
});
export type InquiryInput = z.input<typeof inquirySchema>;

export const contactSchema = z.object({
  full_name: name,
  email,
  phone: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v ? v : undefined))
    .pipe(phone.optional()),
  inquiry_type: z.enum(["academy", "business", "general"]),
  message: z.string().trim().min(10, "Message should be at least 10 characters").max(3000),
});
export type ContactInput = z.input<typeof contactSchema>;

/** Returns an error message, or null when the resume file is acceptable. */
export function validateResume(file: { name: string; size: number } | null | undefined): string | null {
  if (!file) return "Please upload your resume";
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!(RESUME_EXTENSIONS as readonly string[]).includes(ext)) return "Resume must be a PDF, DOC or DOCX file";
  if (file.size > RESUME_MAX_BYTES) return "Resume must be 5 MB or smaller";
  if (file.size === 0) return "The selected file is empty";
  return null;
}

export function safeFileName(original: string) {
  const ext = original.split(".").pop()?.toLowerCase() ?? "";
  const base = original
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-zA-Z0-9-_]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60)
    .replace(/^-|-$/g, "");
  return `${base || "resume"}.${ext}`;
}

/** Postgres unique-violation: the same submission was already saved (double click / retry). */
export function isDuplicateSubmission(error: { code?: string } | null | undefined) {
  return error?.code === "23505";
}
