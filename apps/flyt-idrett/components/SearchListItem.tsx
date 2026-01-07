import Link from "next/link";
import { Icon } from "@kpf/ui";
import { cn } from "@/lib/helpers";

type Props = {
  kommune: {
    name: string;
    groupUrl: string | null;
  };
  index?: number;
  selectedIndex?: number;
  inList?: boolean;
};

export function SearchListItem({
  kommune,
  index,
  selectedIndex,
  inList,
}: Props) {
  return (
    <li className="list-none">
      <Link
        href={kommune.groupUrl || "/har-ikke-flyt-enda"}
        className={cn(
          "relative text-left flex items-center w-full no-underline cursor-pointer",
          inList ? "py-4 px-4" : "py-2",
          inList && "hover:bg-[var(--current-theme-color-100)]",
          inList && selectedIndex === index && "bg-[var(--current-theme-color-100)]",
          "group"
        )}
      >
        <span>{kommune.name}</span>
        <Icon
          icon="arrowRight"
          className={cn(
            "absolute right-4 transition-transform duration-200",
            "group-hover:translate-x-[-4px]",
            selectedIndex === index && "translate-x-[-4px]"
          )}
        />
      </Link>
    </li>
  );
}

