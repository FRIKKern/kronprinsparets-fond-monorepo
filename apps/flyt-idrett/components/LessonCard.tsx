import Link from "next/link";
import { SanityImage } from "@kpf/ui";
import { cn } from "@/lib/helpers";
import { Icon } from "./Icon";

type LessonCardProps = {
  title: string;
  subtitle?: string;
  icon?: any;
  href: string;
  index?: number;
};

export function LessonCard({ title, subtitle, icon, href, index = 0 }: LessonCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative block p-6 rounded-xl overflow-hidden",
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
        {icon && (
          <div className="mb-4 w-11 h-11 rounded-xl bg-[var(--current-theme-color-100)] p-2.5 transition-transform duration-300 group-hover:scale-105">
            <SanityImage image={icon} width={44} className="w-full h-full object-contain" />
          </div>
        )}
        
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h5 className="text-base font-semibold text-[var(--current-theme-color-900)] mb-1 tracking-tight">
              {title}
            </h5>
            {subtitle && (
              <p className="text-sm  line-clamp-2 leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
          
          <span className="flex-shrink-0 transition-all duration-300 group-hover:translate-x-1.5">
            <Icon 
              icon="arrowRight" 
              size={18} 
              className="text-[var(--current-theme-color-700)] transition-colors duration-300 group-hover:" 
            />
          </span>
        </div>
      </div>
      
      {/* Elegant left border accent */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--current-theme-color-400)] to-[var(--current-theme-color-500)] opacity-70 group-hover:opacity-100 transition-opacity duration-300"
      />
    </Link>
  );
}
