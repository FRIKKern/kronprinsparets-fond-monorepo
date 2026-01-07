"use client";

import Link from "next/link";
import { cn } from "@/lib/helpers";

type FlytButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
  size?: "sm" | "md" | "lg";
  href?: string;
  submit?: boolean;
  className?: string;
  onClick?: () => void;
};

const variantStyles = {
  primary: cn(
    "bg-white/20 text-black",
    "shadow-[var(--shadow-card)]",
    "hover:bg-[var(--current-theme-color-800)]",
    "hover:shadow-[var(--shadow-card-hover)]",
    "active:bg-[var(--current-theme-color-900)]"
  ),
  secondary: cn(
    "bg-white/95 backdrop-blur-sm ",
    "shadow-[var(--shadow-card)]",
    "border border-[var(--current-theme-color-300)]",
    "hover:bg-[var(--current-theme-color-50)]",
    "hover:border-[var(--current-theme-color-400)]",
    "hover:shadow-[var(--shadow-card-hover)]",
    "active:bg-[var(--current-theme-color-100)]"
  ),
  tertiary: cn(
    "bg-transparent ",
    "hover:text-[var(--current-theme-color-900)]",
    "hover:bg-[var(--current-theme-color-100)]/50"
  ),
};

const sizeStyles = {
  sm: "py-2 px-4 text-sm gap-1.5",
  md: "py-2.5 px-5 text-sm gap-2",
  lg: "py-3 px-6 text-base gap-2",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  submit,
  className,
  onClick,
}: FlytButtonProps) {
  const buttonClasses = cn(
    // Base styles
    "inline-flex items-center justify-center",
    "font-medium tracking-wide",
    "cursor-pointer border-0 rounded-lg",
    // Transitions
    "transition-all duration-200 ease-out",
    "hover:scale-[1.02]",
    "active:scale-[0.98]",
    // Icon spacing
    "[&_svg]:transition-transform [&_svg]:duration-200",
    "[&:hover_svg]:translate-x-0.5",
    // Variant and size
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (href) {
    if (href.startsWith("http")) {
      return (
        <a href={href} className={buttonClasses}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={buttonClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={submit ? "submit" : "button"}
      className={buttonClasses}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
