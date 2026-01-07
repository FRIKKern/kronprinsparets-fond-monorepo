"use client";

import { useState } from "react";
import { cn } from "@/lib/helpers";
import { Icon } from "./Icon";
import { PdfDownload } from "./PdfDownload";
import { BlockContent } from "@kpf/ui";

type PdfFile = {
  asset?: {
    _ref: string;
    _type: string;
    extension?: string;
  };
};

type AccordionItem = {
  _id: string;
  question: string;
  answer: unknown; // Block content
  pdfFile?: PdfFile | null;
};

type AccordionProps = {
  items: AccordionItem[];
  className?: string;
};

export function Accordion({ items, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item, index) => (
        <AccordionItemComponent
          key={item._id}
          item={item}
          isOpen={openId === item._id}
          onToggle={() => toggle(item._id)}
          index={index}
        />
      ))}
    </div>
  );
}

function AccordionItemComponent({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <div 
      className={cn(
        "rounded-2xl overflow-hidden",
        "bg-white/95 backdrop-blur-sm",
        "shadow-[var(--shadow-card)]",
        "border border-[var(--current-theme-color-200)]/50",
        isOpen && "shadow-[var(--shadow-card-hover)]",
        "transition-all duration-300 ease-out",
        "animate-fade-in-up"
      )}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <button
        onClick={onToggle}
        className={cn(
          "w-full flex items-center justify-between gap-4 p-6",
          "text-left cursor-pointer",
          "hover:bg-[var(--current-theme-color-100)]/50",
          "transition-colors duration-200",
          isOpen && "bg-[var(--current-theme-color-100)]/30"
        )}
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold text-[var(--current-theme-color-900)] tracking-tight">
          {item.question}
        </span>
        <span 
          className={cn(
            "flex-shrink-0 w-10 h-10 rounded-xl",
            "bg-[var(--current-theme-color-200)]",
            "flex items-center justify-center",
            "transition-all duration-300 ease-out",
            isOpen && "rotate-180 bg-[var(--current-theme-color-300)]"
          )}
        >
          <Icon icon="chevronDown" size={20} strokeWidth={2} className="" />
        </span>
      </button>
      
      <div 
        className={cn(
          "grid transition-all duration-300 ease-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-6">
            <div className="pt-4 border-t border-[var(--current-theme-color-200)]">
              <div className=" leading-relaxed mb-4">
                <BlockContent blocks={item.answer} />
              </div>
              {item.pdfFile && (
                <div className="mt-4">
                  <PdfDownload 
                    pdfFile={item.pdfFile}
                    title="Last ned PDF"
                    description="Dokumentasjon for dette spørsmålet"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple single accordion for use in forms etc
export function SimpleAccordion({ 
  title, 
  children,
  defaultOpen = false,
  className,
}: { 
  title: string; 
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn(
      "rounded-xl overflow-hidden",
      "bg-white/95 backdrop-blur-sm",
      "border border-[var(--current-theme-color-200)]/50",
      "shadow-[var(--shadow-card)]",
      className
    )}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3 p-5 text-left hover:bg-[var(--current-theme-color-100)]/50 transition-colors duration-200"
      >
        <span className="font-medium text-[var(--current-theme-color-900)]">{title}</span>
        <Icon 
          icon="chevronDown" 
          size={18} 
          className={cn(
            "text-[var(--current-theme-color-800)] transition-transform duration-300",
            isOpen && "rotate-180"
          )} 
        />
      </button>
      <div 
        className={cn(
          "grid transition-all duration-300 ease-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
