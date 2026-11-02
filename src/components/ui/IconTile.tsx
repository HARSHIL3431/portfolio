import { cn } from "@/lib/utils";

/**
 * IconTile — circular frosted container for line-art glyphs.
 */
export function IconTile({
  children,
  size = 48,
  className,
}: {
  children: React.ReactNode;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("icon-tile shrink-0", className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}