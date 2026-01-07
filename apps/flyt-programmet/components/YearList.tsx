import { slugify, cn } from "@/lib/helpers";
import Link from "next/link";

type Props = {
  otherYears: string[];
  kommuneName: string;
};

export function YearList({ otherYears, kommuneName }: Props) {
  return (
    <ul className="m-0 p-0 list-none">
      {otherYears.map((year, index) => (
        <li key={"year-list-" + index} className={cn("list-none", index === 0 ? "mt-4" : "mt-2")}>
          <Link
            href={`/${slugify(kommuneName)}/${year.replace("/", "-")}`}
            className="no-underline"
          >
            {year}
          </Link>
        </li>
      ))}
    </ul>
  );
}

