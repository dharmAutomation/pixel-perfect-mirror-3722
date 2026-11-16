import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/sections";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — ZEBRYL" },
      { name: "description", content: "How ZEBRYL collects, uses and protects the information you share with us." },
      { property: "og:title", content: "Privacy Policy — ZEBRYL" },
      { property: "og:description", content: "How ZEBRYL handles your personal information." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <article className="container-page max-w-3xl space-y-6 py-16 text-muted-foreground [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground">
        <p>This policy explains how ZEBRYL (“we”, “us”) handles information you submit through this website.</p>
        <h2>Information we collect</h2>
        <p>When you apply for a course, request a consultation or contact us, we collect the details you enter in the form — such as your name, email address, phone and WhatsApp numbers, educational and professional background, project details and, for course applications, your resume.</p>
        <h2>How we use it</h2>
        <p>We use this information only to respond to your enquiry, evaluate your application, schedule demos or consultations, and provide the services you request. We do not sell your personal information.</p>
        <h2>Storage and security</h2>
        <p>Submissions and resumes are stored securely and can only be accessed by authorised ZEBRYL administrators.</p>
        <h2>Your choices</h2>
        <p>You can ask us to update or delete your information at any time by contacting us through the Contact page.</p>
        <h2>Changes</h2>
        <p>We may update this policy from time to time. The latest version will always be available on this page.</p>
      </article>
    </>
  ),
});
