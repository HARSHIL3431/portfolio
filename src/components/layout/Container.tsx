import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full px-6 md:px-12 xl:px-24 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
}
