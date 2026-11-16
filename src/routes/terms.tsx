import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/sections";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms and Conditions — ZEBRYL" },
      { name: "description", content: "Terms and conditions for using the ZEBRYL website and services." },
      { property: "og:title", content: "Terms and Conditions — ZEBRYL" },
      { property: "og:description", content: "Terms for using the ZEBRYL website and services." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Legal" title="Terms and Conditions" />
      <article className="container-page max-w-3xl space-y-6 py-16 text-muted-foreground [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground">
        <p>By using this website you agree to these terms.</p>
        <h2>Training programmes</h2>
        <p>Course content, schedules, duration and fees are confirmed individually at enrolment and may change. Career support such as interview preparation and referral assistance helps you pursue opportunities but does not guarantee employment or a referral at any specific company.</p>
        <h2>Company names</h2>
        <p>Company names shown on this website are presented as target career opportunities. They do not imply an official partnership or endorsement unless explicitly stated.</p>
        <h2>Software services</h2>
        <p>Scope, timelines, pricing and deliverables for development projects are agreed in a separate proposal or contract.</p>
        <h2>Content</h2>
        <p>All website content is provided for general information. You may not copy or reuse it without permission.</p>
        <h2>Contact</h2>
        <p>Questions about these terms can be sent through our Contact page.</p>
      </article>
    </>
  ),
});
