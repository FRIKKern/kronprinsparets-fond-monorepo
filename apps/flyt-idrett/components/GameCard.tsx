import Link from "next/link";
import { cn } from "@/lib/helpers";
import { Icon } from "./Icon";

type GameCardProps = {
  title: string;
  description?: any;
  href: string;
  index?: number;
};

export function GameCard({ title, description, href, index = 0 }: GameCardProps) {
  // Extract text from description if it's block content
  const descriptionText = typeof description === "string" 
    ? description 
    : Array.isArray(description) && description[0]?.children?.[0]?.text
      ? description[0].children[0].text
      : null;

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
      {/* Decorative play icon */}
      <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
        <Icon icon="play" size={32} className="" />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-4">
          <h5 className="flex-1 text-base font-semibold text-[var(--current-theme-color-900)] tracking-tight">
            {title}
          </h5>
          <span className="transition-all duration-300 group-hover:translate-x-1.5">
            <Icon 
              icon="arrowRight" 
              size={18} 
              className="text-[var(--current-theme-color-700)] transition-colors duration-300 group-hover:" 
            />
          </span>
        </div>
        
        {descriptionText && (
          <p className="mt-2.5 text-sm  line-clamp-2 leading-relaxed">
            {descriptionText}
          </p>
        )}
      </div>
      
      {/* Elegant left border accent */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--current-theme-color-400)] to-[var(--current-theme-color-500)] opacity-70 group-hover:opacity-100 transition-opacity duration-300"
      />
    </Link>
  );
}
