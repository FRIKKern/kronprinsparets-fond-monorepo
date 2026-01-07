"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heading6 } from "@kpf/ui";
import { cn } from "@/lib/helpers";
import { Icon } from "./Icon";
import styles from "./HandbokaSidebar.module.css";

type Lesson = {
  _id: string;
  title: string;
  subtitle?: string;
  slug: { current: string };
};

type TrenerhandaSidebarProps = {
  lessons: Lesson[];
};

export function TrenerhandaSidebar({ lessons }: TrenerhandaSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 hidden md:block">
      <div className={cn(styles.sidebar, styles.sidebarSticky)}>
        <Heading6 className="mb-4 ">
          Trenerhånda
        </Heading6>
        
        <nav className="space-y-1">
          {/* Overview link */}
          <Link
            href="/trenerhanda"
            className={cn(
              styles.navItem,
              pathname === "/trenerhanda" && styles.navItemActive
            )}
          >
            <Icon icon="book" size={14} className="mr-2 inline-block" />
            Oversikt
          </Link>
          
          <div className={styles.sectionDivider} />
          
          {/* Section title */}
          <div className={styles.sectionTitle}>
            <Icon icon="play" size={14} />
            Leksjoner
          </div>
          
          {/* Lesson links */}
          {lessons.map((lesson) => {
            const href = `/trenerhanda/${lesson.slug.current}`;
            const isActive = pathname === href;
            
            return (
              <Link
                key={lesson._id}
                href={href}
                className={cn(
                  styles.navItem,
                  isActive && styles.navItemActive
                )}
              >
                {lesson.title}
              </Link>
            );
          })}
          
          <div className={styles.sectionDivider} />
          
          {/* Cross-link to Handboka */}
          <div className={styles.sectionTitle}>
            <Icon icon="lightbulb" size={14} />
            Mer kunnskap
          </div>
          
          <Link
            href="/handboka"
            className={cn(styles.navItem, "flex items-center justify-between gap-2")}
          >
            <span>Gå til Håndboka</span>
            <Icon icon="arrowRight" size={14} className="flex-shrink-0" />
          </Link>
        </nav>
      </div>
    </aside>
  );
}

