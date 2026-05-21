import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function NarrativeSection({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "narrative-section relative w-full py-[var(--spacing-cinematic-lg)] flex flex-col justify-center border-t border-white/5",
        className
      )}
    >
      {children}
    </section>
  );
}
