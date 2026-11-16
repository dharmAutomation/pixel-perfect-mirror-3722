import { describe, expect, it } from "vitest";
import { applicationSchema, contactSchema, inquirySchema, isDuplicateSubmission, validateResume } from "./validation";

const baseApp = {
  full_name: "Asha Verma",
  email: "asha@example.com",
  mobile: "+91 98765 43210",
  whatsapp: "9876543210",
  qualification: "B.E. / B.Tech",
  job_status: "Student",
  experience: "Fresher (0 years)",
  course_slug: "full-stack-development",
  training_mode: "Online (live classes)",
  heard_from: "LinkedIn",
};

describe("course application rules", () => {
  it("accepts a complete application", () => {
    expect(applicationSchema.safeParse(baseApp).success).toBe(true);
  });
  it("rejects an invalid email", () => {
    expect(applicationSchema.safeParse({ ...baseApp, email: "asha@" }).success).toBe(false);
  });
  it("rejects a phone number with fewer than 10 digits", () => {
    expect(applicationSchema.safeParse({ ...baseApp, mobile: "98765" }).success).toBe(false);
  });
  it("rejects a phone number containing letters", () => {
    expect(applicationSchema.safeParse({ ...baseApp, whatsapp: "98765abc10" }).success).toBe(false);
  });
  it("requires a course to be selected", () => {
    expect(applicationSchema.safeParse({ ...baseApp, course_slug: "" }).success).toBe(false);
  });
  it("rejects a non-LinkedIn profile URL", () => {
    expect(applicationSchema.safeParse({ ...baseApp, linkedin_url: "https://example.com/me" }).success).toBe(false);
  });
});

describe("resume upload rules", () => {
  it("allows PDF, DOC and DOCX", () => {
    expect(validateResume({ name: "cv.pdf", size: 1000 })).toBeNull();
    expect(validateResume({ name: "cv.DOC", size: 1000 })).toBeNull();
    expect(validateResume({ name: "cv.docx", size: 1000 })).toBeNull();
  });
  it("rejects other file types", () => {
    expect(validateResume({ name: "cv.png", size: 1000 })).not.toBeNull();
  });
  it("rejects files over 5 MB", () => {
    expect(validateResume({ name: "cv.pdf", size: 5 * 1024 * 1024 + 1 })).not.toBeNull();
  });
  it("requires a resume", () => {
    expect(validateResume(null)).not.toBeNull();
  });
});

describe("project inquiry rules", () => {
  const base = {
    full_name: "Ravi K",
    company_name: "Acme",
    email: "ravi@acme.in",
    phone: "9876543210",
    project_type: "Website Development",
    description: "We need a new corporate website with a blog.",
    budget: "Not sure yet",
    timeline: "Flexible",
  };
  it("accepts a valid inquiry", () => {
    expect(inquirySchema.safeParse(base).success).toBe(true);
  });
  it("requires a description of at least 20 characters", () => {
    expect(inquirySchema.safeParse({ ...base, description: "Short" }).success).toBe(false);
  });
});

describe("contact form rules", () => {
  it("allows the phone to be left empty", () => {
    expect(
      contactSchema.safeParse({ full_name: "Ana B", email: "a@b.co", phone: "", inquiry_type: "general", message: "Hello there team" }).success,
    ).toBe(true);
  });
});

describe("duplicate submissions", () => {
  it("treats a unique-violation as an already-saved submission", () => {
    expect(isDuplicateSubmission({ code: "23505" })).toBe(true);
    expect(isDuplicateSubmission({ code: "42501" })).toBe(false);
  });
});
