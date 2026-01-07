import { Heading4, Body1 } from "@kpf/ui";
import { cn } from "@/lib/helpers";

type QuoteProps = {
  text: string;
  author?: string;
  className?: string;
};

export function Quote({ text, author, className }: QuoteProps) {
  return (
    <blockquote 
      className={cn(
        "relative my-8 py-6 px-8",
        "bg-[var(--current-theme-color-200)]/50",
        "rounded-lg",
        "shadow-[var(--depth-image-100)]",
        className
      )}
    >
      {/* Quote SVG decoration */}
      <svg
        className="absolute left-4 top-4 opacity-30"
        width="46"
        height="46"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M19.029 7.536A18.609 18.609 0 00.959 26.603v2.383a9.472 9.472 0 109.47-9.47 8.84 8.84 0 00-2.137.268.48.48 0 01-.531-.706 13.095 13.095 0 0111.268-6.75 2.396 2.396 0 100-4.792zM42.646 12.328a2.396 2.396 0 100-4.792 18.611 18.611 0 00-18.07 19.067v2.383a9.472 9.472 0 109.472-9.47 8.836 8.836 0 00-2.14.268.478.478 0 01-.53-.706 13.094 13.094 0 0111.268-6.75z"
          fill="var(--current-theme-color-500)"
        />
      </svg>
      
      <div className="relative z-10 pl-6">
        <Heading4 className="font-medium italic leading-relaxed">
          &ldquo;{text}&rdquo;
        </Heading4>
        {author && (
          <Body1 className="mt-4 text-[var(--current-theme-color-800)]">
            — {author}
          </Body1>
        )}
      </div>
      
      {/* Bottom accent line */}
      <div 
        className="absolute bottom-0 left-8 right-8 h-1 rounded-full opacity-50"
        style={{
          background: "linear-gradient(90deg, var(--current-theme-color-400), transparent)"
        }}
      />
    </blockquote>
  );
}

// Smaller inline quote variant
export function InlineQuote({ text, className }: { text: string; className?: string }) {
  return (
    <span 
      className={cn(
        "inline-block px-4 py-2 mx-1",
        "bg-[var(--current-theme-color-200)]/70",
        "rounded ",
        "italic",
        className
      )}
    >
      &ldquo;{text}&rdquo;
    </span>
  );
}
