import Link from "next/link";
import { SanityImage } from "@kpf/ui";
import { cn } from "@/lib/helpers";
import { Icon } from "./Icon";

type SectionCardProps = {
  title: string;
  tagline?: string;
  description?: string;
  icon?: any;
  themeColor?: string;
  href: string;
};

export function SectionCard({
  title,
  tagline,
  description,
  icon,
  themeColor,
  href,
}: SectionCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative block p-8 rounded-2xl overflow-hidden",
        "bg-white/95 backdrop-blur-sm",
        "shadow-[var(--shadow-card)]",
        "hover:shadow-[var(--shadow-card-hover)]",
        "hover:-translate-y-1",
        "transition-all duration-300 ease-out",
        "no-underline",
        "border border-[var(--current-theme-color-200)]/50"
      )}
    >
      <div className="relative z-10">
        {icon && (
          <div className="mb-6 w-14 h-14 rounded-xl bg-[var(--current-theme-color-100)] p-3 transition-transform duration-300 group-hover:scale-105">
            <SanityImage image={icon} width={56} className="w-full h-full object-contain" />
          </div>
        )}
        
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h4 className="text-xl font-semibold mb-1.5 text-[var(--current-theme-color-900)] tracking-tight">
              {title}
            </h4>
            {tagline && (
              <p className="text-base font-medium">
                {tagline}
              </p>
            )}
            {description && (
              <p className="mt-3 text-sm  leading-relaxed">
                {description}
              </p>
            )}
          </div>
          
          <span className="flex-shrink-0 mt-1 transition-all duration-300 group-hover:translate-x-1.5 group-hover:">
            <Icon 
              icon="arrowRight" 
              size={20} 
              className="text-[var(--current-theme-color-700)] transition-colors duration-300 group-hover:" 
            />
          </span>
        </div>
      </div>
      
      {/* Elegant left border accent with gradient */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--current-theme-color-400)] to-[var(--current-theme-color-500)] opacity-80 group-hover:opacity-100 transition-opacity duration-300"
      />
      
      {/* Subtle hover glow */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-[var(--current-theme-color-100)]/0 to-[var(--current-theme-color-200)]/0 group-hover:from-[var(--current-theme-color-100)]/30 group-hover:to-[var(--current-theme-color-200)]/20 transition-all duration-500 pointer-events-none"
      />
    </Link>
  );
}
