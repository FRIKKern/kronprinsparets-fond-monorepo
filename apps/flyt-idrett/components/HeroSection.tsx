"use client";

import { cn } from "@/lib/helpers";

type HeroSectionProps = {
  children: React.ReactNode;
  className?: string;
  showDecorations?: boolean;
  centered?: boolean;
};

export function HeroSection({ 
  children, 
  className,
  showDecorations = false,
  centered = true,
}: HeroSectionProps) {
  return (
    <section 
      className={cn(
        "relative py-16 md:py-20 lg:py-24",
        centered && "text-center",
        className
      )}
    >
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}

// Sub-components for structured hero content
export function HeroTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h1 
      className={cn(
        "text-4xl md:text-5xl lg:text-6xl font-bold",
        "text-[var(--current-theme-color-900)]",
        "tracking-tight",
        "animate-fade-in-up",
        className
      )}
    >
      {children}
    </h1>
  );
}

export function HeroSubtitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p 
      className={cn(
        "mt-5 text-lg md:text-xl lg:text-2xl",
        "",
        "max-w-2xl mx-auto",
        "leading-relaxed",
        "animate-fade-in-up animate-stagger-1",
        className
      )}
    >
      {children}
    </p>
  );
}

export function HeroDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div 
      className={cn(
        "mt-5 text-base md:text-lg",
        "",
        "max-w-3xl mx-auto",
        "leading-relaxed",
        "animate-fade-in-up animate-stagger-2",
        "[&_p]:mb-0",
        className
      )}
    >
      {children}
    </div>
  );
}

export function HeroActions({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div 
      className={cn(
        "mt-10 flex flex-wrap gap-4 justify-center",
        "animate-fade-in-up animate-stagger-3",
        className
      )}
    >
      {children}
    </div>
  );
}

export function HeroStats({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div 
      className={cn(
        "mt-12 flex flex-wrap gap-8 md:gap-12 justify-center",
        "animate-fade-in-up animate-stagger-4",
        className
      )}
    >
      {children}
    </div>
  );
}

export function HeroStat({ 
  value, 
  label, 
  className 
}: { 
  value: string; 
  label: string; 
  className?: string;
}) {
  return (
    <div className={cn("text-center", className)}>
      <div className="text-3xl md:text-4xl font-bold text-[var(--current-theme-color-900)]">
        {value}
      </div>
      <div className="mt-1 text-sm ">
        {label}
      </div>
    </div>
  );
}
