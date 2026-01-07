import { cn } from "@/lib/helpers";
import { Body1 } from "@kpf/ui";

type StepListProps = {
  steps?: string[];
  title?: string;
  className?: string;
};

export function StepList({ steps, title = "Gjennomføring", className }: StepListProps) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className={cn("mb-8", className)}>
      <h3 className="text-lg font-semibold mb-4">
        {title}
      </h3>
      <ol className="space-y-4">
        {steps.map((step, index) => (
          <li key={index} className="flex gap-4">
            <span 
              className={cn(
                "flex-shrink-0 w-8 h-8 rounded-full",
                "bg-[var(--current-theme-color-800)] ",
                "text-white font-bold text-sm",
                "flex items-center justify-center",
                "shadow-sm"
              )}
            >
              {index + 1}
            </span>
            <div className="flex-1 pt-1">
              <Body1 className="">{step}</Body1>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
