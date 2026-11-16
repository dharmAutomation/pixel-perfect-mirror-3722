import type { Company } from "@/lib/site-content";

export function CompanyShowcase({ companies, mediaUrl }: { companies: Company[]; mediaUrl: (p?: string | null) => string | undefined }) {
  if (companies.length === 0) return null;
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {companies.map((c) => {
          const logo = mediaUrl(c.logo_path);
          return (
            <div
              key={c.id}
              className="lift flex h-24 items-center justify-center rounded-2xl border border-border bg-card px-4 shadow-card"
              title={c.name}
            >
              {logo ? (
                <img src={logo} alt={c.name} loading="lazy" className="max-h-10 max-w-full object-contain" />
              ) : (
                <span className="text-center font-display text-lg font-bold tracking-tight text-secondary-foreground">{c.name}</span>
              )}
            </div>
          );
        })}
      </div>
      <p className="mt-6 text-center text-xs text-muted-foreground">
        Company names are shown as target career opportunities for our learners. They do not indicate an official partnership,
        endorsement or guaranteed referral.
      </p>
    </div>
  );
}
