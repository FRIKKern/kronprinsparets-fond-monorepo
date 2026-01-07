import { cn } from "@/lib/helpers";
import { Icon } from "./Icon";

type ReflectionBoxProps = {
  question?: string;
  className?: string;
};

export function ReflectionBox({ question, className }: ReflectionBoxProps) {
  if (!question) return null;

  return (
    <div 
      className={cn(
        "mb-8 p-6 rounded-xl",
        "bg-gradient-to-br from-[var(--current-theme-color-200)] to-[var(--current-theme-color-100)]",
        "border-l-4 border-[var(--current-theme-color-500)]",
        "shadow-[var(--depth-button-100)]",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--current-theme-color-300)] flex items-center justify-center">
          <Icon icon="lightbulb" size={20} className="" />
        </div>
        <div>
          <span className="block text-xs uppercase tracking-wide text-[var(--current-theme-color-700)] font-semibold mb-2">
            Refleksjonsspørsmål
          </span>
          <p className="text-lg font-medium italic">
            &ldquo;{question}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
