"use client";

import { useState, useEffect } from "react";
import { HandbokaSidebar } from "./HandbokaSidebar";
import { Icon } from "@kpf/ui";
import { cn } from "@/lib/helpers";

type NavItem = {
  _id: string;
  title: string;
  slug: { current: string };
};

type MobileSidebarDrawerProps = {
  sections?: NavItem[];
  activities?: NavItem[];
  games?: NavItem[];
  currentPath?: string;
  title?: string;
  children?: React.ReactNode;
};

export function MobileSidebarDrawer({ 
  sections = [], 
  activities = [], 
  games = [],
  title,
  children
}: MobileSidebarDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/50 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={cn(
            "absolute left-0 top-0 bottom-0 w-80 bg-[var(--background-color)] shadow-xl transform transition-transform duration-300 overflow-y-auto",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 flex items-center justify-between border-b border-[var(--current-theme-color-300)]">
            <h2 className="font-bold">{title || "Håndboka"}</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-[var(--current-theme-color-200)] rounded"
              aria-label="Lukk meny"
            >
              <Icon icon="close" size={24} />
            </button>
          </div>
          <div className="p-4">
            {children ? children : (
              <HandbokaSidebar 
                sections={sections}
                activities={activities}
                games={games}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
