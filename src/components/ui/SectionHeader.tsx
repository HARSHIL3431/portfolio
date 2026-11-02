import { cn } from "@/lib/utils";

/**
 * SectionHeader — AuthKit section opening.
 * eyebrow → large heading (weight 500) → supporting statement.
 */
export function SectionHeader({
  eyebrow,
  title,
  statement,
  align = "center",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  statement?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  const isCenter = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        isCenter ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-[rgba(186,215,247,0.12)]" />
        <span className="eyebrow whitespace-nowrap">{eyebrow}</span>
        <span className="h-px w-12 bg-gradient-to-l from-transparent to-[rgba(186,215,247,0.12)]" />
      </div>
      <h2
        className="font-heading font-medium tracking-[-0.02em] text-ice-highlight"
        style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", lineHeight: 1.16 }}
      >
        {title}
      </h2>
      {statement && (
        <p
          className={cn(
            "font-sans text-base leading-7 text-moon-mist max-w-xl",
            isCenter && "mx-auto"
          )}
        >
          {statement}
        </p>
      )}
    </div>
  );
}