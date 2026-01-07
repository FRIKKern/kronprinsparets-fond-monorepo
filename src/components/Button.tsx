"use client";

import { Button as BaseButton } from "@base-ui-components/react/button";
import Link from "next/link";
import { cn } from "@/lib/helpers";

type FlytButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
  href?: string;
  submit?: boolean;
  className?: string;
  onClick?: () => void;
};

const variantStyles = {
  primary:
    "bg-[var(--current-theme-color-400)] text-white shadow-[var(--depth-button-200)] hover:scale-[1.01] active:scale-[0.99]",
  secondary:
    "bg-white text-[var(--text-color)] shadow-[var(--depth-button-200)] hover:scale-[1.01] active:scale-[0.99]",
  tertiary: "bg-transparent text-current",
};

export function Button({
  children,
  variant = "primary",
  href,
  submit,
  className,
  onClick,
}: FlytButtonProps) {
  const buttonClasses = cn(
    "inline-flex items-center py-2 px-4 text-[0.875rem] font-medium tracking-[0.08em] cursor-pointer border-0 rounded transition-transform duration-200 [&_svg]:ml-2",
    variantStyles[variant],
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
    <BaseButton
      type={submit ? "submit" : "button"}
      className={buttonClasses}
      onClick={onClick}
    >
      {children}
    </BaseButton>
  );
}
