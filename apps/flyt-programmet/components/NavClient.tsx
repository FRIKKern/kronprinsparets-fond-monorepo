"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { cn } from "@/lib/helpers";
import styles from "./NavClient.module.css";

type NavItem = { href: string; name: string };

export function NavClient({
  navigationItems,
}: {
  navigationItems: NavItem[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={cn(
        "absolute top-0 left-0 w-full px-[var(--page-horizontal-padding)]",
        "flex justify-between items-center h-[var(--nav-height)] z-[100]",
        "bg-[var(--background-color)] text-[var(--text-color)]",
        "transition-colors duration-[400ms]",
        isOpen && "fixed"
      )}
    >
      <Link href="/">
        <Image 
          src="/flyt-logo.png" 
          alt="FLYT" 
          height={25} 
          width={100}
          className={styles.logo}
        />
      </Link>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hidden max-[850px]:block cursor-pointer bg-transparent border-none"
        aria-label="Åpne menyen"
      >
        <Icon icon={isOpen ? "close" : "hamburger"} />
      </button>

      <ul
        className={cn(
          "m-0 list-none",
          "min-[851px]:flex",
          "max-[850px]:absolute max-[850px]:top-[var(--nav-height)] max-[850px]:left-0",
          "max-[850px]:w-screen max-[850px]:h-[calc(100vh-var(--nav-height))]",
          "max-[850px]:bg-[var(--background-color)] max-[850px]:pt-12",
          !isOpen && "max-[850px]:hidden"
        )}
      >
        {navigationItems.map((item, index) => (
          <li key={item.href || `nav-item-${index}`} className={cn("min-[851px]:inline-block", styles.navItem)}>
            <Button variant="tertiary" href={item.href}>
              {item.name}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

