import slugifyRaw from "slugify";

export const slugify = (url: string) => slugifyRaw(url, { lower: true });

export const cn = (...classes: (string | undefined | false | null)[]) =>
  classes.filter(Boolean).join(" ");

// Page color theming
export type ThemeColor = {
  name: string;
  value: number;
};

export const getPageColor = (pathname: string, themeColor?: string): ThemeColor => {
  // If themeColor is provided (from Sanity), use it
  if (themeColor) {
    const [name, value] = themeColor.split("-");
    return { name, value: parseInt(value) || 400 };
  }

  // Fallback to pathname-based theming
  const page = pathname.split("/")[1] || "frontpage";

  const colorMap: Record<string, ThemeColor> = {
    frontpage: { name: "krikkand", value: 400 },
    trenerhanda: { name: "krikkand", value: 400 },
    handboka: { name: "mose", value: 400 },
  };

  return colorMap[page] || { name: "skifer", value: 100 };
};

// Extract YouTube video ID from various URL formats
export const getYouTubeId = (url: string): string | null => {
  if (!url) return null;
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
};

