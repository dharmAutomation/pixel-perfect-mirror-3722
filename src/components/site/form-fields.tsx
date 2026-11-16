import { forwardRef, type ReactNode, type SelectHTMLAttributes } from "react";
import { CheckCircle2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function Field({
  id,
  label,
  required,
  optional,
  error,
  hint,
  children,
  className,
}: {
  id: string;
  label: string;
  required?: boolean | undefined;
  optional?: boolean | undefined;
  error?: string | undefined;
  hint?: string | undefined;
  children: ReactNode;
  className?: string | undefined;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={id} className="text-sm font-semibold text-foreground">
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
        {optional && <span className="ml-1.5 text-xs font-normal text-muted-foreground">(optional)</span>}
      </Label>
      {children}
      {error ? (
        <p className="text-xs font-medium text-destructive" role="alert">{error}</p>
      ) : hint ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

export const NativeSelect = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement> & { options: readonly string[] | { value: string; label: string }[]; placeholder?: string }>(
  function NativeSelect({ options, placeholder = "Select…", className, ...props }, ref) {
    return (
      <select
        ref={ref}
        className={cn(
          "flex h-11 w-full rounded-xl border border-input bg-background px-3 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-[invalid=true]:border-destructive",
          className,
        )}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((o) =>
          typeof o === "string" ? (
            <option key={o} value={o}>{o}</option>
          ) : (
            <option key={o.value} value={o.value}>{o.label}</option>
          ),
        )}
      </select>
    );
  },
);

export const inputCls = "h-11 rounded-xl aria-[invalid=true]:border-destructive";

export function FormCard({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("rounded-[1.75rem] border border-border bg-card p-6 shadow-elevated sm:p-10", className)}>{children}</div>;
}

export function SuccessPanel({ title, children, actions }: { title: string; children: ReactNode; actions?: ReactNode }) {
  return (
    <FormCard className="text-center">
      <span className="mx-auto inline-flex size-16 items-center justify-center rounded-full bg-success/15 text-success">
        <CheckCircle2 className="size-9" />
      </span>
      <h2 className="mt-5 text-2xl font-bold">{title}</h2>
      <div className="mx-auto mt-3 max-w-md text-muted-foreground">{children}</div>
      {actions && <div className="mt-8 flex flex-wrap justify-center gap-3">{actions}</div>}
    </FormCard>
  );
}
