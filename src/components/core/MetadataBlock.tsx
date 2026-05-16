import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function MetadataBlock({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "font-mono text-[10px] tracking-widest uppercase text-text-metadata leading-loose",
        className
      )}
    >
      {children}
    </div>
  );
}
