import Link from "next/link";
import { cn } from "@/lib/helpers";
import { Icon } from "./Icon";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav 
      aria-label="Brødsmulesti"
      className={cn(
        "animate-fade-in mb-4 md:mb-5",
        className
      )}
    >
      <ol className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <Icon 
                  icon="chevronRight" 
                  size={12} 
                  className="mx-1.5 text-[var(--current-theme-color-900)] opacity-50 flex-shrink-0" 
                />
              )}
              
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={cn(
                    "text-xs sm:text-sm font-medium opacity-60 text-[var(--current-theme-color-400)]",
                    "hover:text-[var(--current-theme-color-900)]",
                    "transition-colors duration-200 ease-out",
                    "break-words"
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <Link 
                  href={item.href || ""}
                  className={cn(
                    "text-xs block sm:text-sm font-bold text-[var(--current-theme-color-800)]",
                    "break-words"
                  )}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
