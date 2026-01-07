"use client";

import { useState } from "react";
import { getYouTubeId } from "@/lib/helpers";
import { cn } from "@/lib/helpers";
import { Icon } from "./Icon";

type VideoPlayerProps = {
  url?: string;
  title?: string;
  autoplay?: boolean;
  className?: string;
};

export function VideoPlayer({ url, title, autoplay = false, className }: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(autoplay);

  if (!url) return null;

  const videoId = getYouTubeId(url);
  if (!videoId) return null;

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div 
      className={cn(
        "relative w-full aspect-video mb-10 rounded-2xl overflow-hidden",
        "shadow-[var(--shadow-card-hover)]",
        "bg-[var(--current-theme-color-200)]",
        className
      )}
    >
      {!isPlaying ? (
        // Thumbnail with play button
        <button
          onClick={handlePlay}
          className="absolute inset-0 w-full h-full cursor-pointer group"
          aria-label={`Spill av ${title || 'video'}`}
        >
          {/* Thumbnail image */}
          <img 
            src={thumbnailUrl}
            alt={title || "Video thumbnail"}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          />
          
          {/* Loading skeleton */}
          {isLoading && (
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--current-theme-color-200)] to-[var(--current-theme-color-300)]" />
          )}
          
          {/* Subtle dark overlay for play button visibility */}
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/15 transition-colors duration-300" />
          
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className={cn(
                "w-20 h-20 rounded-full",
                "bg-white/95 backdrop-blur-sm shadow-lg",
                "flex items-center justify-center",
                "transition-all duration-300",
                "group-hover:scale-110 group-hover:shadow-xl"
              )}
            >
              <Icon 
                icon="play" 
                size={32} 
                className="ml-1" 
              />
            </div>
          </div>
          
          {/* Title overlay */}
          {title && (
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-white text-lg font-medium line-clamp-1">{title}</p>
            </div>
          )}
        </button>
      ) : (
        // Embedded video
        <>
          {/* Loading state for iframe */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[var(--current-theme-color-200)] to-[var(--current-theme-color-300)]">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center animate-pulse">
                <Icon icon="play" size={24} className="text-[var(--current-theme-color-800)] ml-0.5" />
              </div>
              <span className="text-sm ">Laster video...</span>
            </div>
          </div>
          
          <iframe
            src={embedUrl}
            title={title || "Video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full z-10"
            onLoad={() => setIsLoading(false)}
          />
        </>
      )}
    </div>
  );
}

// Compact video player for smaller spaces
export function VideoPlayerCompact({ url, title, className }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  
  if (!url) return null;

  const videoId = getYouTubeId(url);
  if (!videoId) return null;

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

  return (
    <div 
      className={cn(
        "relative aspect-video rounded-xl overflow-hidden",
        "shadow-[var(--shadow-card)]",
        "bg-[var(--current-theme-color-200)]",
        className
      )}
    >
      {!isPlaying ? (
        <button
          onClick={() => setIsPlaying(true)}
          className="absolute inset-0 w-full h-full cursor-pointer group"
          aria-label={`Spill av ${title || 'video'}`}
        >
          <img 
            src={thumbnailUrl}
            alt={title || "Video thumbnail"}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/15 transition-colors duration-300" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white/95 backdrop-blur-sm shadow-md flex items-center justify-center group-hover:scale-110 transition-all duration-300">
              <Icon icon="play" size={20} className="ml-0.5" />
            </div>
          </div>
        </button>
      ) : (
        <iframe
          src={embedUrl}
          title={title || "Video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      )}
    </div>
  );
}
