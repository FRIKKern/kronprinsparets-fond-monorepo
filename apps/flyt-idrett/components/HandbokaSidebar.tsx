"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/helpers";
import { Icon } from "./Icon";
import styles from "./HandbokaSidebar.module.css";

type NavItem = {
  _id: string;
  title: string;
  slug: { current: string };
  iconName?: string;
  sectionType?: string;
};

type HandbokaSidebarProps = {
  sections?: NavItem[];
  activities?: NavItem[];
  games?: NavItem[];
};

// Map section slugs to their URL paths
function getSectionHref(slug: string): string {
  const directRoutes: Record<string, string> = {
    "filmer": "/handboka/filmer",
    "styrkebasert-tenkesett": "/handboka/styrkebasert-tenkesett",
    "anerkjennende-kommunikasjon": "/handboka/anerkjennende-kommunikasjon",
    "aktiviteter": "/handboka/aktiviteter",
    "lekebank": "/handboka/lekebank",
    "foreldre": "/handboka/foreldre",
    "sporsmal-og-svar": "/handboka/sporsmal-og-svar",
  };
  
  return directRoutes[slug] || `/handboka/${slug}`;
}

function CollapsibleSection({ 
  title, 
  iconName,
  href,
  children,
  isActiveSection,
}: { 
  title: string;
  iconName?: string;
  href: string;
  children: React.ReactNode;
  isActiveSection: boolean;
}) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/") || pathname.startsWith(href + "?");
  // Initialize state based on isActiveSection
  const [isOpen, setIsOpen] = useState(isActiveSection);
  const prevIsActiveSectionRef = useRef(isActiveSection);

  // Update state when isActiveSection changes - only update if prop actually changed
  useEffect(() => {
    if (isActiveSection && prevIsActiveSectionRef.current !== isActiveSection) {
      prevIsActiveSectionRef.current = isActiveSection;
      // Schedule state update for next tick to avoid synchronous setState
      Promise.resolve().then(() => {
        setIsOpen(true);
      });
    }
  }, [isActiveSection]);

  return (
    <div className="mb-1">
      <div className="flex items-center">
        <Link
          href={href}
          className={cn(
            styles.navItem,
            "flex-1",
            isActive && styles.navItemActive
          )}
        >
          {iconName && (
            <Icon icon={iconName} size={14} className="mr-2 inline-block opacity-70" />
          )}
          {title}
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-[var(--current-theme-color-100)] rounded-lg transition-colors"
          aria-label={isOpen ? "Lukk undermeny" : "Åpne undermeny"}
        >
          <Icon 
            icon="chevronDown" 
            size={14} 
            className={cn(
              "transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </button>
      </div>
      <div 
        className={cn(
          styles.collapsible,
          isOpen ? styles.expanded : styles.collapsed
        )}
      >
        <div className="ml-4 mt-1 space-y-0.5">
          {children}
        </div>
      </div>
    </div>
  );
}

function SidebarNavItem({ 
  item, 
  pathname,
}: { 
  item: NavItem; 
  pathname: string;
}) {
  const href = getSectionHref(item.slug.current);
  const isActive = pathname === href || pathname.startsWith(href + "/") || pathname.startsWith(href + "?");

  return (
    <Link
      href={href}
      className={cn(
        styles.navItem,
        isActive && styles.navItemActive
      )}
    >
      {item.iconName && (
        <Icon icon={item.iconName} size={14} className="mr-2 inline-block opacity-70" />
      )}
      {item.title}
    </Link>
  );
}

export function HandbokaSidebar({ 
  sections = [], 
  activities = [], 
  games = [] 
}: HandbokaSidebarProps) {
  const pathname = usePathname();
  
  // Check if we're in aktiviteter or lekebank sections
  const isInAktiviteter = pathname.startsWith("/handboka/aktiviteter");
  const isInLekebank = pathname.startsWith("/handboka/lekebank");

  return (
    <aside className="w-64 flex-shrink-0 hidden md:block">
      <div className={cn(styles.sidebar, styles.sidebarSticky)}>
        {/* Overview link */}
        <Link
          href="/handboka"
          className={cn(
            "block mb-4 font-semibold hover:text-[var(--current-theme-color-900)] transition-colors",
            pathname === "/handboka" && "text-[var(--current-theme-color-900)]"
          )}
        >
          Håndboka
        </Link>
        
        <nav className="space-y-1">
          {sections?.map((item) => {
            // Special handling for Aktiviteter - show all activities
            if (item.slug.current === "aktiviteter") {
              return (
                <CollapsibleSection
                  key={item._id}
                  title={item.title}
                  iconName={item.iconName}
                  href="/handboka/aktiviteter"
                  isActiveSection={isInAktiviteter}
                >
                  {activities.map((activity) => {
                    const activityHref = `/handboka/aktiviteter/${activity.slug.current}`;
                    const isActivityActive = pathname === activityHref;
                    return (
                      <Link
                        key={activity._id}
                        href={activityHref}
                        className={cn(
                          styles.navItem,
                          styles.childItem,
                          isActivityActive && styles.navItemActive
                        )}
                      >
                        {activity.title}
                      </Link>
                    );
                  })}
                </CollapsibleSection>
              );
            }
            
            // Special handling for Lekebank - show all games
            if (item.slug.current === "lekebank") {
              return (
                <CollapsibleSection
                  key={item._id}
                  title={item.title}
                  iconName={item.iconName}
                  href="/handboka/lekebank"
                  isActiveSection={isInLekebank}
                >
                  {games.map((game) => {
                    const gameHref = `/handboka/lekebank/${game.slug.current}`;
                    const isGameActive = pathname === gameHref;
                    return (
                      <Link
                        key={game._id}
                        href={gameHref}
                        className={cn(
                          styles.navItem,
                          styles.childItem,
                          isGameActive && styles.navItemActive
                        )}
                      >
                        {game.title}
                      </Link>
                    );
                  })}
                </CollapsibleSection>
              );
            }
            
            // Regular section
            return (
              <SidebarNavItem 
                key={item._id} 
                item={item} 
                pathname={pathname}
              />
            );
          })}
          
          <div className={styles.sectionDivider} />
          
          {/* Cross-link to Trenerhanda */}
          <div className={styles.sectionTitle}>
            <Icon icon="book" size={14} />
            Praktiske tips
          </div>
          
          <Link
            href="/trenerhanda"
            className={cn(styles.navItem, "flex items-center gap-2")}
          >
            Gå til Trenerhånda
            <Icon icon="arrowRight" size={14} />
          </Link>
        </nav>
      </div>
    </aside>
  );
}
