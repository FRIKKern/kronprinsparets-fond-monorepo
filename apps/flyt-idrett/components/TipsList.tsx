import { cn } from "@/lib/helpers";
import { Icon } from "./Icon";
import { Body1 } from "@kpf/ui";

type TipsListProps = {
  tips?: string[];
  title?: string;
  className?: string;
};

export function TipsList({ tips, title = "Tips til trener", className }: TipsListProps) {
  if (!tips || tips.length === 0) return null;

  return (
    <div 
      className={cn(
        "mb-8 p-6 rounded-xl",
        "bg-[var(--current-theme-color-200)]",
        "shadow-[var(--depth-button-100)]",
        className
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-[var(--current-theme-color-300)] flex items-center justify-center">
          <Icon icon="star" size={16} className="" />
        </div>
        <h3 className="text-lg font-semibold ">
          {title}
        </h3>
      </div>
      
      <ul className="space-y-3">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="flex-shrink-0 w-1.5 h-1.5 mt-2.5 rounded-full bg-[var(--current-theme-color-500)]" />
            <Body1 className="">{tip}</Body1>
          </li>
        ))}
      </ul>
    </div>
  );
}
