"use client";

import { Input as BaseInput } from "@base-ui-components/react/input";
import { Icon } from "./Icon";
import { cn } from "@/lib/helpers";

type FlytInputProps = {
  label?: string;
  icon?: "search" | string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

export function Input({
  label,
  icon,
  placeholder,
  value,
  onChange,
  className,
}: FlytInputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <div className="relative">
        <BaseInput
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={cn(
            "w-full px-4 py-2 border-0 rounded bg-white text-[var(--text-color)] shadow-[var(--depth-image-400)]",
            "focus:outline-none",
            icon && "pr-10",
            className
          )}
        />
        {icon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <Icon icon={icon} size={18} stroke="var(--current-theme-color-800)" />
          </div>
        )}
      </div>
    </div>
  );
}
