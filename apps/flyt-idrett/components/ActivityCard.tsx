import Link from "next/link";
import { cn } from "@/lib/helpers";
import { Icon } from "./Icon";

type ActivityCardProps = {
  title: string;
  shortDescription?: string;
  duration?: string;
  purpose?: string;
  category: string;
  href: string;
  index?: number;
};

const categoryColors: Record<string, string> = {
  samarbeid: "bg-[var(--color-krikkand-100)] text-[var(--color-krikkand-800)] border-[var(--color-krikkand-300)]",
  vennskap: "bg-[var(--color-mose-100)] text-[var(--color-mose-800)] border-[var(--color-mose-300)]",
  selvfolelse: "bg-[var(--color-halm-100)] text-[var(--color-halm-800)] border-[var(--color-halm-300)]",
  kommunikasjon: "bg-[var(--color-bark-100)] text-[var(--color-bark-800)] border-[var(--color-bark-300)]",
};

const categoryIcons: Record<string, string> = {
  samarbeid: "users",
  vennskap: "heart",
  selvfolelse: "star",
  kommunikasjon: "lightbulb",
};

export function ActivityCard({
  title,
  shortDescription,
  duration,
  purpose,
  category,
  href,
  index = 0,
}: ActivityCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative block p-7 rounded-2xl overflow-hidden",
        "bg-white/95 backdrop-blur-sm",
        "shadow-[var(--shadow-card)]",
        "hover:shadow-[var(--shadow-card-hover)]",
        "hover:-translate-y-1",
        "transition-all duration-300 ease-out",
        "no-underline",
        "border border-[var(--current-theme-color-200)]/50",
        "animate-fade-in-up"
      )}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="relative z-10">
        {/* Header with title and category badge */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <h5 className="flex-1 text-lg font-semibold text-[var(--current-theme-color-900)] tracking-tight leading-snug">
            {title}
          </h5>
          <span className={cn(
            "flex-shrink-0 inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border",
            categoryColors[category] || "bg-[var(--current-theme-color-100)] border-[var(--current-theme-color-300)]"
          )}>
            <Icon icon={categoryIcons[category] || "star"} size={14} strokeWidth={1.5} />
            <span className="capitalize">{category}</span>
          </span>
        </div>
        
        {/* Description */}
        {shortDescription && (
          <p className="text-sm text-gray-700 mb-5 line-clamp-2 leading-relaxed">
            {shortDescription}
          </p>
        )}
        
        {/* Metadata and arrow */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--current-theme-color-200)]/60">
          <div className="flex gap-5 text-sm text-gray-700">
            {duration && (
              <span className="flex items-center gap-2">
                <Icon icon="clock" size={16} strokeWidth={1.5} className="text-[var(--current-theme-color-700)]" />
                <span>{duration}</span>
              </span>
            )}
            {purpose && (
              <span className="flex items-center gap-2 max-w-[180px]">
                <Icon icon="target" size={16} strokeWidth={1.5} className="text-[var(--current-theme-color-700)]" />
                <span className="truncate">{purpose}</span>
              </span>
            )}
          </div>
          
          <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[var(--current-theme-color-100)] transition-all duration-300 group-hover:bg-[var(--current-theme-color-200)] group-hover:translate-x-1">
            <Icon 
              icon="arrowRight" 
              size={18} 
              strokeWidth={1.5}
              className="text-[var(--current-theme-color-700)]" 
            />
          </span>
        </div>
      </div>
      
      {/* Elegant left border accent */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-1.5 rounded-r-full bg-gradient-to-b from-[var(--current-theme-color-400)] to-[var(--current-theme-color-600)] opacity-60 group-hover:opacity-100 transition-opacity duration-300"
      />
    </Link>
  );
}
