import Link from "next/link";
import { cn } from "@/lib/helpers";
import { Icon } from "./Icon";

type CrossLinkCardProps = {
  title: string;
  href: string;
  description?: string;
  icon?: string;
  className?: string;
};

export function CrossLinkCard({
  title,
  href,
  description,
  icon = "book",
  className,
}: CrossLinkCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-4 p-5 rounded-xl",
        "bg-white/95 backdrop-blur-sm",
        "shadow-[var(--shadow-card)]",
        "hover:shadow-[var(--shadow-card-hover)]",
        "hover:-translate-y-0.5",
        "transition-all duration-300 ease-out",
        "no-underline",
        "border border-[var(--current-theme-color-200)]/50",
        className
      )}
    >
      {/* Icon */}
      <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[var(--current-theme-color-100)] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
        <Icon icon={icon} size={22} strokeWidth={1.5} className="" />
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <h6 className="text-sm font-semibold text-[var(--current-theme-color-900)]">
          {title}
        </h6>
        {description && (
          <p className="text-sm  line-clamp-1">
            {description}
          </p>
        )}
      </div>
      
      {/* Arrow */}
      <span className="flex-shrink-0 transition-all duration-300 group-hover:translate-x-1.5">
        <Icon icon="arrowRight" size={16} className="text-[var(--current-theme-color-700)] transition-colors duration-300 group-hover:" />
      </span>
    </Link>
  );
}
