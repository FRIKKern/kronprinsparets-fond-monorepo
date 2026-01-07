"use client";

import { cn } from "@/lib/helpers";

type DecorativeShapesProps = {
  variant?: "hero" | "section" | "minimal";
  className?: string;
};

export function DecorativeShapes({ variant = "hero", className }: DecorativeShapesProps) {
  // Minimal, subtle decorations - no distracting animations or heavy gradients
  if (variant === "hero") {
    return (
      <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
        {/* Subtle corner accent - top right */}
        <div 
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-10"
          style={{
            backgroundColor: "var(--current-theme-color-400)",
          }}
        />
        
        {/* Subtle corner accent - bottom left */}
        <div 
          className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full opacity-8"
          style={{
            backgroundColor: "var(--current-theme-color-300)",
          }}
        />
      </div>
    );
  }

  if (variant === "section") {
    return (
      <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
        {/* Single subtle accent */}
        <div 
          className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10"
          style={{
            backgroundColor: "var(--current-theme-color-400)",
          }}
        />
      </div>
    );
  }

  // Minimal variant - almost invisible
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <div 
        className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-5"
        style={{
          backgroundColor: "var(--current-theme-color-400)",
        }}
      />
    </div>
  );
}
