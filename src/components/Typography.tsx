import { cn } from "@/lib/helpers";

type TypographyProps = {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
};

export function Heading1({ children, className, align }: TypographyProps) {
  return (
    <h1
      className={cn(
        "text-[3rem] font-normal leading-[1.2em] m-0",
        align === "left" && "text-left",
        align === "center" && "text-center",
        align === "right" && "text-right",
        className
      )}
    >
      {children}
    </h1>
  );
}

export function Heading2({ children, className, align }: TypographyProps) {
  return (
    <h2
      className={cn(
        "text-[2.5rem] font-normal leading-[1.2em] m-0",
        align === "left" && "text-left",
        align === "center" && "text-center",
        align === "right" && "text-right",
        className
      )}
    >
      {children}
    </h2>
  );
}

export function Heading3({ children, className, align }: TypographyProps) {
  return (
    <h3
      className={cn(
        "text-[2.25rem] font-bold leading-[1.2em] m-0",
        align === "left" && "text-left",
        align === "center" && "text-center",
        align === "right" && "text-right",
        className
      )}
    >
      {children}
    </h3>
  );
}

export function Heading4({ children, className, align }: TypographyProps) {
  return (
    <h4
      className={cn(
        "text-[2rem] font-normal leading-[1.2em] m-0",
        align === "left" && "text-left",
        align === "center" && "text-center",
        align === "right" && "text-right",
        className
      )}
    >
      {children}
    </h4>
  );
}

export function Heading5({ children, className, align }: TypographyProps) {
  return (
    <h5
      className={cn(
        "text-[1.5rem] font-bold leading-[1.2em] m-0",
        align === "left" && "text-left",
        align === "center" && "text-center",
        align === "right" && "text-right",
        className
      )}
    >
      {children}
    </h5>
  );
}

export function Heading6({ children, className, align }: TypographyProps) {
  return (
    <h6
      className={cn(
        "text-[1.25rem] font-bold leading-[1.2em] m-0",
        align === "left" && "text-left",
        align === "center" && "text-center",
        align === "right" && "text-right",
        className
      )}
    >
      {children}
    </h6>
  );
}

export function Subtitle1({ children, className, align }: TypographyProps) {
  return (
    <h5
      className={cn(
        "text-[1.5rem] font-medium leading-[1.6em] m-0",
        align === "left" && "text-left",
        align === "center" && "text-center",
        align === "right" && "text-right",
        className
      )}
    >
      {children}
    </h5>
  );
}

export function Subtitle2({ children, className, align }: TypographyProps) {
  return (
    <h6
      className={cn(
        "text-[1.25rem] font-medium leading-[1.6em] m-0",
        align === "left" && "text-left",
        align === "center" && "text-center",
        align === "right" && "text-right",
        className
      )}
    >
      {children}
    </h6>
  );
}

export function Body1({ children, className, align }: TypographyProps) {
  return (
    <p
      className={cn(
        "text-[1.125rem] leading-[1.6em] m-0",
        align === "left" && "text-left",
        align === "center" && "text-center",
        align === "right" && "text-right",
        className
      )}
    >
      {children}
    </p>
  );
}

export function Body2({ children, className, align }: TypographyProps) {
  return (
    <p
      className={cn(
        "text-[0.875rem] leading-[1.6em] m-0",
        align === "left" && "text-left",
        align === "center" && "text-center",
        align === "right" && "text-right",
        className
      )}
    >
      {children}
    </p>
  );
}

export function Caption({ children, className, align }: TypographyProps) {
  return (
    <p
      className={cn(
        "text-[0.75rem] leading-[1.6em] m-0",
        align === "left" && "text-left",
        align === "center" && "text-center",
        align === "right" && "text-right",
        className
      )}
    >
      {children}
    </p>
  );
}

