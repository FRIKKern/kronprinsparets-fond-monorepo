import { cn } from "@/lib/helpers";
import { Icon } from "./Icon";

type MetadataChipsProps = {
  duration?: string;
  purpose?: string;
  equipment?: string[];
  className?: string;
};

export function MetadataChips({ 
  duration, 
  purpose, 
  equipment,
  className,
}: MetadataChipsProps) {
  if (!duration && !purpose && (!equipment || equipment.length === 0)) {
    return null;
  }

  return (
    <div className={cn("flex flex-wrap gap-3 mb-8", className)}>
      {duration && (
        <Chip icon="clock" label="Tid" value={duration} color="krikkand" />
      )}
      {purpose && (
        <Chip icon="target" label="Hensikt" value={purpose} color="mose" />
      )}
      {equipment && equipment.length > 0 && (
        <Chip 
          icon="package" 
          label="Utstyr" 
          value={equipment.join(", ")} 
          color="halm" 
        />
      )}
    </div>
  );
}

function Chip({ 
  icon, 
  label, 
  value, 
  color 
}: { 
  icon: string; 
  label: string; 
  value: string;
  color: string;
}) {
  return (
    <div 
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full",
        "bg-[var(--current-theme-color-200)]",
        "shadow-sm"
      )}
    >
      <Icon icon={icon} size={18} className="flex-shrink-0" />
      <div>
        <span className="block text-[10px] uppercase tracking-wide text-[var(--current-theme-color-700)] font-medium">
          {label}
        </span>
        <span className="text-sm font-medium ">
          {value}
        </span>
      </div>
    </div>
  );
}
