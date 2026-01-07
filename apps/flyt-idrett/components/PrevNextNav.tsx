import Link from "next/link";
import { cn } from "@/lib/helpers";
import { Icon } from "./Icon";

type PrevNextNavProps = {
  prevHref?: string;
  prevLabel?: string;
  nextHref?: string;
  nextLabel?: string;
  backHref?: string;
  backLabel?: string;
  className?: string;
};

export function PrevNextNav({
  prevHref,
  prevLabel,
  nextHref,
  nextLabel,
  backHref,
  backLabel,
  className,
}: PrevNextNavProps) {
  return (
    <nav 
      className={cn(
        "mt-12 pt-8 border-t border-[var(--current-theme-color-300)]",
        "animate-fade-in-up",
        className
      )}
      style={{ animationDelay: "0.5s" }}
    >
      <div className="flex  justify-between items-stretch md:items-center gap-4">
        {/* Previous */}
        {prevHref ? (
          <Link
            href={prevHref}
            className={cn(
              "group flex items-center gap-3 p-4 rounded-lg",
              "bg-[var(--current-theme-color-200)]/50",
              "hover:bg-[var(--current-theme-color-200)]",
              "transition-all duration-200",
              "flex-1 md:max-w-[45%]"
            )}
          >
            <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--current-theme-color-300)] flex items-center justify-center transition-transform duration-200 group-hover:-translate-x-1">
              <Icon icon="arrowRight" size={18} className="rotate-180 " />
            </span>
            <div className="min-w-0">
              <span className="block text-xs text-[var(--current-theme-color-700)] uppercase tracking-wide">Forrige</span>
              <span className="block text-sm font-medium truncate">
                {prevLabel || "Forrige leksjon"}
              </span>
            </div>
          </Link>
        ) : (
          <div className="flex-1 md:max-w-[45%]" />
        )}

        {/* Back to overview (center) */}
        {/* {backHref && (
          <Link
            href={backHref}
            className="hidden md:flex items-center justify-center px-4 py-2 rounded-full bg-[var(--current-theme-color-200)]  text-sm font-medium hover:bg-[var(--current-theme-color-300)] transition-colors"
          >
            {backLabel || "Tilbake"}
          </Link>
        )} */}

        {/* Next */}
        {nextHref ? (
          <Link
            href={nextHref}
            className={cn(
              "group flex items-center gap-3 p-4 rounded-lg",
              "bg-[var(--current-theme-color-200)]/50",
              "hover:bg-[var(--current-theme-color-200)]",
              "transition-all duration-200",
              "flex-1 md:max-w-[45%]",
              "flex-row-reverse text-right"
            )}
          >
            <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--current-theme-color-300)] flex items-center justify-center transition-transform duration-200 group-hover:translate-x-1">
              <Icon icon="arrowRight" size={18} className="" />
            </span>
            <div className="min-w-0">
              <span className="block text-xs text-[var(--current-theme-color-700)] uppercase tracking-wide">Neste</span>
              <span className="block text-sm font-medium truncate">
                {nextLabel || "Neste leksjon"}
              </span>
            </div>
          </Link>
        ) : (
          <div className="flex-1 md:max-w-[45%]" />
        )}
      </div>

      {/* Mobile back button */}
      {backHref && (
        <div className="mt-4 md:hidden text-center">
          <Link
            href={backHref}
            className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-[var(--current-theme-color-200)]  text-sm font-medium"
          >
            {backLabel || "Tilbake til oversikten"}
          </Link>
        </div>
      )}
    </nav>
  );
}
