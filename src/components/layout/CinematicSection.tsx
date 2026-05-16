import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function CinematicSection({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full min-h-screen py-[var(--spacing-cinematic-md)] flex flex-col justify-center",
        className
      )}
    >
      {children}
    </section>
  );
}
