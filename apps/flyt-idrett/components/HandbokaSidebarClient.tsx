"use client";

import { usePathname } from "next/navigation";
import { HandbokaSidebar } from "./HandbokaSidebar";
import { MobileSidebarDrawer } from "./MobileSidebarDrawer";

type NavItem = {
  _id: string;
  title: string;
  slug: { current: string };
};

type HandbokaSidebarClientProps = {
  sections?: NavItem[];
  activities?: NavItem[];
  games?: NavItem[];
};

export function HandbokaSidebarClient({ 
  sections = [], 
  activities = [], 
  games = [] 
}: HandbokaSidebarClientProps) {
  const pathname = usePathname();

  return (
    <>
      <div className="hidden md:block">
        <HandbokaSidebar 
          sections={sections} 
          activities={activities}
          games={games}
        />
      </div>
      <MobileSidebarDrawer 
        sections={sections}
        activities={activities}
        games={games}
      />
    </>
  );
}
