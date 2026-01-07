import { Nav } from "./Nav";
import { Footer } from "@kpf/ui";
import { cn } from "@/lib/helpers";

type LayoutProps = {
  children: React.ReactNode;
  standardPadding?: boolean;
  maxWidth?: boolean;
  themeColor: { name: string; value: number };
};

export function Layout({
  children,
  standardPadding,
  maxWidth,
  themeColor,
}: LayoutProps) {
  // Generate CSS custom properties for theme
  const themeStyle = {
    "--background-color": `var(--color-${themeColor.name}-${themeColor.value})`,
    "--text-color": `var(--color-${themeColor.name}-900)`,
    ...Object.fromEntries(
      Array.from({ length: 8 }, (_, i) => [
        `--current-theme-color-${(i + 1) * 100}`,
        `var(--color-${themeColor.name}-${(i + 1) * 100})`,
      ])
    ),
  } as React.CSSProperties;

  return (
    <div
      className="relative min-h-screen transition-colors duration-[400ms] will-change-[color,background-color]"
      style={{
        ...themeStyle,
        backgroundColor: `var(--background-color)`,
      }}
    >
      <Nav />
      <main
        className={cn(
          "min-h-screen",
          standardPadding
            ? "px-[var(--page-horizontal-padding)] pt-[calc(var(--nav-height)+5rem)] pb-[calc(var(--footer-height)+5rem)]"
            : "pt-[var(--nav-height)] pb-[var(--footer-height)]",
          maxWidth && "max-w-[var(--page-max-width)] mx-auto"
        )}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}

