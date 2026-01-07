import Link from "next/link";
import { Icon } from "./Icon";
import { Body1, Heading5 } from "./Typography";

type Props = {
  title: string;
  description: string;
  slug: {
    current: string;
  };
};

export function TheoryThumbnail({ title, description, slug }: Props) {
  return (
    <Link
      href={`/teori/${slug.current}`}
      className="block p-8 bg-[var(--current-theme-color-200)] shadow-[var(--depth-image-200)] no-underline transition-[background-color] duration-200 hover:bg-[var(--current-theme-color-100)] group"
    >
      <Heading5 className="flex items-center justify-between">
        <span>{title}</span>
        <span className="transition-transform duration-200 group-hover:translate-x-[5px]">
          <Icon icon="arrowRight" />
        </span>
      </Heading5>
      <Body1>{description}</Body1>
    </Link>
  );
}

