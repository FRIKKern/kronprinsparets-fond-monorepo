import Link from "next/link";
import { cn } from "@/lib/helpers";
import { Icon } from "./Icon";
import { getYouTubeId } from "@/lib/helpers";

type VideoCardProps = {
  id: string;
  title: string;
  description?: string;
  videoUrl?: string;
  category?: string;
  index?: number;
};

export function VideoCard({ id, title, description, videoUrl = "", category, index = 0 }: VideoCardProps) {
  const youtubeId = videoUrl ? getYouTubeId(videoUrl) : null;
  const thumbnailUrl = youtubeId 
    ? `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`
    : null;

  return (
    <Link
      href={`/handboka/filmer/${id}`}
      className={cn(
        "group relative block rounded-xl overflow-hidden",
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
      {/* Thumbnail */}
      <div className="relative aspect-video bg-[var(--current-theme-color-200)] overflow-hidden">
        {thumbnailUrl ? (
          <img 
            src={thumbnailUrl} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--current-theme-color-200)] to-[var(--current-theme-color-300)]">
            <Icon icon="play" size={40} className="text-[var(--current-theme-color-800)]" />
          </div>
        )}
        
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all duration-300">
          <div className="w-14 h-14 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
            <Icon icon="play" size={22} className="ml-0.5" />
          </div>
        </div>
        
        {/* Category badge */}
        {category && (
          <span className="absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm shadow-sm">
            {category}
          </span>
        )}
      </div>
      
      {/* Content */}
      <div className="p-5">
        <h5 className="text-base font-semibold text-[var(--current-theme-color-900)] line-clamp-1 tracking-tight">
          {title}
        </h5>
        {description && (
          <p className="mt-1.5 text-sm  line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}
